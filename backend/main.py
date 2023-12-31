import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import chat, upload, mongo

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


app = FastAPI(
    title="Health Insurance Chatbot API",
    description="API for Health Insurance Chatbot",
    version="0.1.0",
    openapi_url="/openapi.json",
    docs_url="/",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/chat")
app.include_router(upload.router, prefix="/upload")
app.include_router(mongo.router, prefix="/mongo_db")