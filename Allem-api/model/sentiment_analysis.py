
import pandas as pd

filepath_train = './dataset/SAAA_train.csv' #Training Set: The largest split of the dataset, and the one without any ground truth ("gold") labels. We will generate labels for these data points with weak supervision.

filepath_test = './dataset/SAAA_test.csv' #Test Set: A small, standard held-out blind hand-labeled set for final evaluation of our classifier. This set should only be used for evaluation, not error analysis

df_train = pd.read_csv(filepath_train)
df_test = pd.read_csv(filepath_test)
df_test["label"] = df_test["label"].map({1 : 1.0, 0: 0.0})

df_train.head(5)

df_test.head(5)

Y_test = df_test.label.values
Y_test

df_train['label'].value_counts() # this dataset considerd unlabeled, since all entries have the label -1, indicating abstention or uncertnity.

"""# Weak Labelling

# Define Labels
"""

# For clarity, we define constants for sentiment labels: Negative = 0, Positive = 1
ABSTAIN = -1   #Uncertain comment = غير محدد
NEGATIVE = 1 #Negative comment = تعليق سلبي
POSITIVE = 0 #Postive comment = تعليق ايحابي

"""# Define labeling functions"""

from snorkel.labeling import labeling_function
from snorkel.labeling import PandasLFApplier # Data points are stored as Series in a DataFrame. The LFs are executed via a pandas.DataFrame.apply call, which is single-process and can be slow for large DataFrames.
from snorkel.labeling import LFAnalysis
from snorkel.analysis import get_label_buckets

from camel_tools.tokenizers.word import simple_word_tokenize
@labeling_function()
def keyword_sentiment(x): # keyword_sentiment: This labeling function assigns a sentiment label based on the presence of keywords in the text.
    negative_keywords = ['سيء', 'غير جيد', 'مزعج']
    positive_keywords = ['جيد', 'رائع', 'ممتاز']

    if any(word in simple_word_tokenize(x.text) for word in negative_keywords):
        return NEGATIVE
    elif any(word in simple_word_tokenize(x.text) for word in positive_keywords):
        return POSITIVE
    return ABSTAIN
keyword_sentiment.name = "keyword_sentiment"

# Writing an LF to gauge sentiment - that uses a third-party model
from snorkel.preprocess import preprocessor
from textblob import TextBlob
@preprocessor(memoize=True)
def textblob_sentiment(x): # textblob_sentiment: This preprocessor uses TextBlob to analyze the sentiment of the text: It calculates the polarity (positive or negative sentiment) and subjectivity (subjective or objective nature) of the text.
    scores = TextBlob(x.text)
    x.polarity = scores.sentiment.polarity
    x.subjectivity = scores.sentiment.subjectivity
    return x

@labeling_function(pre=[textblob_sentiment]) # The pre=[textblob_sentiment] argument indicates that the textblob_sentiment preprocessor should be applied before textblob_polarity is executed.
def textblob_polarity(x): # If the polarity is greater than 0.9, it assigns POSITIVE.
    return POSITIVE if x.polarity > 0.9 else ABSTAIN

@labeling_function(pre=[textblob_sentiment])
def textblob_subjectivity(x): #  If subjectivity is greater than or equal to 0.5, it assigns POSITIVE.
    return POSITIVE if x.subjectivity >= 0.5 else ABSTAIN

from snorkel.labeling import LabelingFunction

def keyword_lookup(x, keywords, label): # keyword_lookup is a helper function that checks if any of the keywords are present in the text x.text
    if any(word in x.text.lower() for word in keywords):
        return label
    return ABSTAIN

def make_keyword_lf(keywords, label=NEGATIVE):  # Default label is now NEGATIVE
    return LabelingFunction(
        name=f"keyword_{keywords[0]}",
        f=keyword_lookup,
        resources=dict(keywords=keywords, label=label),
    )

"""Spam comments expressing negative sentiment like disappointment or frustration."""
keyword_negative = make_keyword_lf(keywords=["سيء", "مزعج", "فاشل", "ممل", "كريه", "اكره"])

"""Negative comments expressing frustration or dislike."""
keyword_frustration = make_keyword_lf(keywords=["ضايق", "غضب", "قرف", "خايب", "غبي"])

"""Comments expressing dissatisfaction with a product or video."""
keyword_dissatisfaction = make_keyword_lf(keywords=["لن أشتري", "لا أنصح", "لم يعجبني", "سيئ", "غير جيد"])

"""Comments expressing regret or negative emotions."""
keyword_regret = make_keyword_lf(keywords=["ندم", "خسارة", "محرج", "اشعر بالحزن"])

"""Negative reviews or criticisms of content."""
keyword_criticize = make_keyword_lf(keywords=["انتقد", "مشكلة", "خطا", "سيء", "غير جيد"])

"""# Generate labels by Applying LFs"""

lfs = [
    keyword_sentiment,
    textblob_polarity,
    textblob_subjectivity,
    keyword_negative,
    keyword_frustration,
    keyword_dissatisfaction,
    keyword_regret,
    keyword_criticize
]

applier = PandasLFApplier(lfs=lfs) # lfs (List[LabelingFunction]) – LFs that this applier executes on examples
L_train = applier.apply(df=df_train)
L_test = applier.apply(df=df_test)

LFAnalysis(L=L_train, lfs=lfs).lf_summary()

# Our goal is now to convert the labels from our LFs into
# a single noise-aware probabilistic (or confidence-weighted)
# label per data point

from snorkel.labeling.model import MajorityLabelVoter

majority_model = MajorityLabelVoter() # The idea behind majority voting is that if a large number of labeling functions agree on a particular label, the model assigns that label to the data point. If there is no clear majority, the model may abstain or output a default label.
preds_train = majority_model.predict(L=L_train)

preds_train

# Our LFs have varying properties and should not be treated identically.
# LFs may be correlated, resulting in certain signals being overrepresented in a majority-vote-based model.
# To handle this, we use a more sophisticated Snorkel LabelModel to combine LF outputs.

# This model will ultimately produce a single set of noise-aware training labels,
# which are probabilistic or confidence-weighted labels

from snorkel.labeling.model import LabelModel

label_model = LabelModel(cardinality=2, verbose=True)
label_model.fit(L_train=L_train, n_epochs=500, log_freq=100, seed=123)

probs_train = label_model.predict_proba(L=L_train)

# Now calculate Majority Vote accuracy
majority_acc = majority_model.score(L=L_test, Y=Y_test, tie_break_policy="random")["accuracy"]
print(f"{'Majority Vote Accuracy:':<25} {majority_acc * 100:.1f}%")

# Calculate Label Model accuracy
label_model_acc = label_model.score(L=L_test, Y=Y_test, tie_break_policy="random")["accuracy"]
print(f"{'Label Model Accuracy:':<25} {label_model_acc * 100:.1f}%")

from snorkel.labeling import filter_unlabeled_dataframe

df_train_filtered, probs_train_filtered = filter_unlabeled_dataframe(
    X=df_train, y=probs_train, L=L_train
)

df_train_filtered.head(5)

from sklearn.feature_extraction.text import CountVectorizer

vectorizer = CountVectorizer(ngram_range=(1, 5))
X_train = vectorizer.fit_transform(df_train_filtered.text.tolist())
X_test = vectorizer.transform(df_test.text.tolist())

from snorkel.utils import probs_to_preds
preds_train_filtered = probs_to_preds(probs=probs_train_filtered)

from sklearn.linear_model import LogisticRegression

sklearn_model = LogisticRegression(C=1e3, solver="liblinear")
sklearn_model.fit(X=X_train, y=preds_train_filtered)

C = sklearn_model

print(f"Test Accuracy: {sklearn_model.score(X=X_test, y=Y_test) * 100:.1f}%")

# Example Arabic reviews for prediction
new_review = ['قناتي رائعة! هذه افضل قناة على الإطلاق', 'الفيديو كان سيئ جدا']

# Create DataFrame from the new reviews
df = pd.DataFrame(new_review, columns=['review'])

# Vectorize the new reviews using the same vectorizer used for training
df_vectorized = vectorizer.transform(df['review'])


results = sklearn_model.predict(df_vectorized)

for i, item in enumerate(results):
    if item == 0:
        print(f'Review#{i+1} is negative')  # 1 for negative sentiment
    else:
        print(f'Review#{i+1} is positive')  # 0 for positive sentiment

new_review


# After training the model
import joblib

# Save the trained model and vectorizer
joblib.dump(sklearn_model, "sentiment_model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("Model and vectorizer saved!")
