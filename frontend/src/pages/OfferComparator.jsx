import React, { useState } from "react";
import api from "../services/api";
import OfferForm from "../components/OfferForm";
import OfferResult from "../components/OfferResult";
import "../styles/OfferComparator.css";
function OfferComparator() {
    const createInitialOffer = () => ({
        ctc: "",
        joiningBonus: 0,
        esops: 0,
        growth: "",
        companyRating: "",
        city: "",
        selectedBenefits: []
    });
    const [offerA, setOfferA] = useState(
        createInitialOffer()
    );
    const [offerB, setOfferB] = useState(
        createInitialOffer()
    );
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const calculateBenefitScore = (offer) => {
        return Math.min(
            offer.selectedBenefits.length * 2,
            10
        );
    };
    const compareOffers = async () => {
        if (
            Number(offerA.ctc) <= 0 ||
            Number(offerB.ctc) <= 0
        ) {
            setError("Please enter valid CTC values.");
            return;
        }
        try {
            setError("");
            const data = {
                offerA: {
                    ctc: Number(offerA.ctc),
                    joiningBonus: Number(offerA.joiningBonus) || 0,
                    esops: Number(offerA.esops) || 0,
                    benefitScore: calculateBenefitScore(offerA),
                    growth: Number(offerA.growth),
                    companyRating: Number(offerA.companyRating),
                    city: offerA.city
                },
                offerB: {
                    ctc: Number(offerB.ctc),
                    joiningBonus: Number(offerB.joiningBonus) || 0,
                    esops: Number(offerB.esops) || 0,
                    benefitScore: calculateBenefitScore(offerB),
                    growth: Number(offerB.growth),
                    companyRating: Number(offerB.companyRating),
                    city: offerB.city
                }
            };
            const response = await api.post(
                "/compare-offers",
                data
            );
            setResult(response.data);
        } catch (error) {
            console.error(error);
            setError(
                "Unable to connect to FastAPI backend."
            );
        }
    };
    return (
        <div className="offer-page">
            <h1>Offer Comparator</h1>
            <div className="offers-container">
                <OfferForm
                    title="Offer A"
                    offer={offerA}
                    setOffer={setOfferA}
                />
                <OfferForm
                    title="Offer B"
                    offer={offerB}
                    setOffer={setOfferB}
                />
            </div>
            <button
                className="compare-button"
                onClick={compareOffers}
            >
                Compare Offers
            </button>
            {error && (
                <p className="offer-error">
                    {error}
                </p>
            )}
            <OfferResult
                result={result}
            />
        </div>
    );
}
export default OfferComparator;