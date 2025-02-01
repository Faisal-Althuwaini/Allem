import joblib
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer

# Load model and vectorizer
try:
    model = joblib.load("app/models/sentiment_model.pkl")
    vectorizer = joblib.load("app/models/vectorizer.pkl")
    print("Model and vectorizer loaded successfully!")
except Exception as e:
    raise Exception(f"Error loading model or vectorizer: {str(e)}")

def predict_text(review_text: str) -> str:
    """Predict sentiment from a single review."""
    try:
        review_vectorized = vectorizer.transform([review_text])
        prediction = model.predict(review_vectorized)[0]
        return "positive" if prediction == 0 else "negative"
    except Exception as e:
        raise Exception(f"Prediction failed: {str(e)}")

def predict_from_csv(df: pd.DataFrame):
    """Predict sentiment from a CSV file containing a 'review' column."""
    try:
        if 'review' not in df.columns:
            raise ValueError("CSV must contain a 'review' column")

        reviews_vectorized = vectorizer.transform(df['review'])
        predictions = model.predict(reviews_vectorized)
        df['sentiment'] = ["ايجابي" if pred == 0 else "سلبي" for pred in predictions]
        return df
    except Exception as e:
        raise Exception(f"CSV processing failed: {str(e)}")
