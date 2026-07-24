import React from "react";
function OfferForm({ offer, setOffer, title }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setOffer({
            ...offer,
            [name]: value
        });
    };
    const benefits = [
        {
            id: "health",
            label: "Health Insurance",
            score: 2
        },
        {
            id: "life",
            label: "Life Insurance",
            score: 2
        },
        {
            id: "flexible",
            label: "Flexible Work",
            score: 2
        },
        {
            id: "leave",
            label: "Paid Leave",
            score: 2
        },
        {
            id: "learning",
            label: "Learning Budget",
            score: 2
        }
    ];
    const handleBenefitChange = (benefitId) => {
        let selectedBenefits = offer.selectedBenefits;
        if (selectedBenefits.includes(benefitId)) {
            selectedBenefits = selectedBenefits.filter(
                id => id !== benefitId
            );
        } else {
            selectedBenefits = [
                ...selectedBenefits,
                benefitId
            ];
        }
        setOffer({
            ...offer,
            selectedBenefits
        });
    };
    return (
        <div className="offer-form">
            <h2>{title}</h2>
            <div className="form-group">
                <label>CTC</label>
                <input
                    type="number"
                    name="ctc"
                    value={offer.ctc}
                    onChange={handleChange}
                    placeholder="Enter CTC"
                />
            </div>
            <div className="form-group">
                <label>Joining Bonus</label>
                <input
                    type="number"
                    name="joiningBonus"
                    value={offer.joiningBonus}
                    onChange={handleChange}
                    placeholder="Enter joining bonus"
                />
            </div>
            <div className="form-group">
                <label>ESOPs Value</label>
                <input
                    type="number"
                    name="esops"
                    value={offer.esops}
                    onChange={handleChange}
                    placeholder="Enter ESOP value"
                />
            </div>
            <div className="form-group">
                <label>Growth Potential</label>
                <select
                    name="growth"
                    value={offer.growth}
                    onChange={handleChange}
                >
                    <option value="">
                        Select Growth Rating
                    </option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                        value => (
                            <option
                                key={value}
                                value={value}
                            >
                                {value}/10
                            </option>
                        )
                    )}
                </select>
            </div>
            <div className="form-group">
                <label>Company Rating</label>
                <select
                    name="companyRating"
                    value={offer.companyRating}
                    onChange={handleChange}
                >
                    <option value="">
                        Select Company Rating
                    </option>
                    {[1, 2, 3, 4, 5].map(
                        value => (
                            <option
                                key={value}
                                value={value}
                            >
                                {value}/5
                            </option>
                        )
                    )}
                </select>
            </div>
            <div className="form-group">
                <label>City</label>
                <select
                    name="city"
                    value={offer.city}
                    onChange={handleChange}
                >
                    <option value="">
                        Select City
                    </option>
                    <option value="Remote">
                        Remote
                    </option>
                    <option value="Hyderabad">
                        Hyderabad
                    </option>
                    <option value="Pune">
                        Pune
                    </option>
                    <option value="Delhi">
                        Delhi
                    </option>
                    <option value="Noida">
                        Noida
                    </option>
                    <option value="Chennai">
                        Chennai
                    </option>
                    <option value="Bangalore">
                        Bangalore
                    </option>
                    <option value="Mumbai">
                        Mumbai
                    </option>
                </select>
            </div>
            <div className="benefits-section">
                <label>Benefits</label>
                {benefits.map(
                    benefit => (
                        <div
                            className="benefit-option"
                            key={benefit.id}
                        >
                            <input
                                type="checkbox"
                                checked={
                                    offer.selectedBenefits.includes(
                                    benefit.id
                                    )
                                }
                                onChange={() =>
                                    handleBenefitChange(
                                      benefit.id
                                    )
                                }
                            />
                            <span>
                                {benefit.label} (+{benefit.score})
                            </span>
                        </div>
                    )
                )}
            </div>

        </div>
    );
}
export default OfferForm;