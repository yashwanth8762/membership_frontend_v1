import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../reducers/user";
import Footer from "../components/Footer";

const DonatePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (user.language === undefined) {
      dispatch(setLanguage(false));
    }
  }, [dispatch, user.language]);

  const isEnglish = !!user.language;
  const toggleLanguage = () => {
    dispatch(setLanguage(!user.language));
  };

  // Local form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    address: "",
    donationAmount: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Simple submit handler (just alert for demo)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement form validation and API calls
    alert(
      (isEnglish ? "Thank you for your donation, " : "ನಿಮ್ಮ ದಾನಕ್ಕೆ ಧನ್ಯವಾದಗಳು, ") +
        `${formData.firstName} ${formData.lastName}`
    );
    // Reset form after submit
    setFormData({
      firstName: "",
      lastName: "",
      mobile: "",
      address: "",
      donationAmount: "",
      message: "",
    });
  };

  return (
    <>
      <section>
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center min-h-[80vh]">
          {/* Back Button - Top Left */}
          <button
            className="mb-8 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition-all duration-300 self-start flex items-center gap-3 cursor-pointer"
            onClick={() => {
              window.history.back();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z"
                clipRule="evenodd"
              />
            </svg>
            {isEnglish ? "Back" : "ಹಿಂದೆ"}
          </button>

          {/* Language Toggle - Top Right */}
          <div className="flex items-center space-x-2 mb-8 self-end w-full max-w-md">
            <span
              className={`text-sm font-medium ${
                !isEnglish ? "text-gray-900" : "text-gray-500"
              }`}
            >
              ಕನ್ನಡ
            </span>
            <button
              onClick={toggleLanguage}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ backgroundColor: isEnglish ? "#3b82f6" : "#6b7280" }}
              aria-label="Toggle language"
            >
              <span className="sr-only">Toggle language</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isEnglish ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                isEnglish ? "text-gray-900" : "text-gray-500"
              }`}
            >
              English
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-center mb-10">
            {isEnglish ? "Make a Donation" : "ದೇಣಿಗೆ ನೀಡಿ"}
          </h1>

          {/* Donation Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8 space-y-6 mb-20"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-1 font-semibold text-gray-700"
                >
                  {isEnglish ? "First Name" : "ಮೊದಲ ಹೆಸರು"} *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={isEnglish ? "Enter first name" : "ಹೆಸರು ನಮೂದಿಸಿ"}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-1 font-semibold text-gray-700"
                >
                  {isEnglish ? "Last Name" : "ಕೊನೆಯ ಹೆಸರು"} *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={isEnglish ? "Enter last name" : "ಹೆಸರು ನಮೂದಿಸಿ"}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block mb-1 font-semibold text-gray-700"
              >
                {isEnglish ? "Mobile Number" : "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ"} *
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                pattern="[0-9]{10}"
                required
                value={formData.mobile}
                onChange={handleChange}
                placeholder={isEnglish ? "Enter 10-digit mobile number" : "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ"}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={10}
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block mb-1 font-semibold text-gray-700"
              >
                {isEnglish ? "Address" : "ವಿಳಾಸ"} *
              </label>
              <textarea
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder={isEnglish ? "Enter your address" : "ನಿಮ್ಮ ವಿಳಾಸ ನಮೂದಿಸಿ"}
                rows={3}
                className="w-full px-4 py-2 border rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="donationAmount"
                className="block mb-1 font-semibold text-gray-700"
              >
                {isEnglish ? "Donation Amount (₹)" : "ದೇಣಿಗೆ ಮೊತ್ತ (₹)"} *
              </label>
              <input
                id="donationAmount"
                name="donationAmount"
                type="number"
                min="1"
                required
                value={formData.donationAmount}
                onChange={handleChange}
                placeholder={isEnglish ? "Enter amount" : "ಮೊತ್ತ ನಮೂದಿಸಿ"}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-1 font-semibold text-gray-700"
              >
                {isEnglish ? "Message (Optional)" : "ಸಂದೇಶ (ಐಚ್ಛಿಕ)"}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={isEnglish ? "Leave a message (optional)" : "ಸಂದೇಶ ಬರೆಹಿಸಿ (ಐಚ್ಛಿಕ)"}
                rows={3}
                className="w-full px-4 py-2 border rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-md shadow hover:bg-blue-700 transition-colors duration-300"
            >
              {isEnglish ? "Donate Now" : "ಇದೀಗ ದಾನಮಾಡಿ"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DonatePage;
