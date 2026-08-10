from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
class Loan(Base):
    __tablename__ = "loans"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    loan_type = Column(String, nullable=False)
    principal_amount = Column(Float, nullable=False)
    outstanding_amount = Column(Float, nullable=False)
    interest_rate = Column(Float, nullable=False)
    emi = Column(Float, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    user = relationship("User", back_populates="loans")