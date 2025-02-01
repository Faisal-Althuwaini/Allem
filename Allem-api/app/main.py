from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import predict, csv_upload

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(predict.router)
app.include_router(csv_upload.router)

@app.get("/")
def root():
    return {"message": "Sentiment Analysis API is running!"}
