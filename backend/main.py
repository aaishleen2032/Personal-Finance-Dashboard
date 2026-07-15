from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.ctc import router as ctc_router
from routers.tax import router as tax_router
from routers.emi import router as emi_router

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

@app.get("/")
def home():
    return {
        "message": "Finance Dashboard Backend Running"
    }