from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.ctc import router as ctc_router
from routers.tax import router as tax_router
from routers.emi import router as emi_router
from routers.offer import router as offer_router
from database import engine
from sqlalchemy import text

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(ctc_router)
app.include_router(tax_router)
app.include_router(emi_router)
app.include_router(offer_router)

@app.get("/")
def home():
    return {
        "message": "Finance Dashboard Backend Running"
    }
@app.get("/test-db")
def test_database():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {"message": "PostgreSQL connected successfully"}