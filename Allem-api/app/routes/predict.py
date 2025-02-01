from fastapi import APIRouter, HTTPException
from app.schemas.review import Review
from app.services.sentiment_analysis import predict_text

router = APIRouter()

@router.post("/predict")
def predict_sentiment(review: Review):
    """API endpoint to predict sentiment from text input."""
    try:
        sentiment = predict_text(review.review)
        return {"review": review.review, "sentiment": sentiment}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
