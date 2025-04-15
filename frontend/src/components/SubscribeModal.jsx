import React, { useState } from "react";
import PropTypes from "prop-types";

function SubscribeModal({ onClose, onSubscribe }) {
  const [billing, setBilling] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, cardNumber, expiry, cvv } = billing;

    if (!name) {
      newErrors.name = "You must enter a card holder name.";
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Expiry must be in MM/YY format.";
    }

    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = "CVV must be 3 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (!validateForm()) return;

    onSubscribe(billing); // Send valid billing info
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-bold text-center mb-2">
          🎉 Get Prime Access at just $19.99/Month
        </h2>
        <p className="text-sm text-center mb-4">
          Enter billing details to continue:
        </p>

        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Cardholder Name"
            value={billing.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={billing.cardNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm">{errors.cardNumber}</p>
          )}
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="expiry"
            placeholder="Expiry (MM/YY)"
            value={billing.expiry}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.expiry && (
            <p className="text-red-500 text-sm">{errors.expiry}</p>
          )}
        </div>

        <div className="mb-5">
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={billing.cvv}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePayment}
            className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-4 py-2 rounded-md font-semibold"
          >
            Confirm & Subscribe
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 cursor-pointer text-black px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

SubscribeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubscribe: PropTypes.func.isRequired,
};

export default SubscribeModal;
