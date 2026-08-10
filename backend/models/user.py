from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    incomes = relationship("Income", back_populates="user")
    expenses = relationship("Expense", back_populates="user")
    investments = relationship("Investment", back_populates="user")
    loans = relationship("Loan", back_populates="user")