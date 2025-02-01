from fastapi import APIRouter, HTTPException, File, UploadFile
import pandas as pd
from io import StringIO
from app.services.sentiment_analysis import predict_from_csv

router = APIRouter()

@router.post("/predict/csv")
async def predict_csv(file: UploadFile = File(...)):
    """API endpoint to predict sentiment from a CSV file."""
    try:
        contents = await file.read()
        df = pd.read_csv(StringIO(contents.decode("utf-8")))
        predictions = predict_from_csv(df)
        return {"message": "Sentiment analysis completed", "predictions": predictions.to_dict(orient="records")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
