import React from 'react'
import Footer from '../components/Footer'

const TermsConditions = () => {
  return (
    <>
      <section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center min-h-[80vh]">
          {/* Back Button - Top Left */}
          <button
            className="mb-8 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition-all duration-300 self-start flex items-center gap-3 cursor-pointer"
            onClick={() => { window.location.href = '/'; }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8 mt-8">Terms &amp; Conditions (T&amp;C)</h1>
          <div className="w-full bg-white rounded-lg shadow-lg p-6 lg:p-10 mb-10">
            <p className="mb-6 text-lg text-gray-700">
              Welcome to <span className="font-semibold">[Your Website Name]</span>! These Terms &amp; Conditions (T&amp;C) govern your use of our website, donation services, and membership offerings. By accessing and using our website, you agree to be bound by these T&amp;C, as well as our Privacy Policy and Refund Policy.
            </p>
            <h2 className="text-2xl font-semibold mb-4 mt-6">1. Donation Services</h2>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 mb-6">
              <li>
                <strong>Nature of Donations:</strong> Donations made through the website are voluntary contributions to support the mission and are generally non-refundable. These contributions are not for the purchase of any goods or services.
              </li>
              <li>
                <strong>Accepted Payment Methods:</strong> Donations are accepted via secure online payment gateways, including credit cards, debit cards, net banking, and other methods specified during the donation process. You are responsible for ensuring you are lawfully authorized to use the chosen payment method.
              </li>
              <li>
                <strong>Transaction Processing:</strong> A third-party payment gateway is used to process donations. We are not responsible for any failures, malfunctions, or technical errors related to the payment gateway's operation. Successful payment processing is confirmed by receipt and not necessarily by a bank account deduction alone.
              </li>
              <li>
                <strong>Recurring Donations:</strong> These T&amp;C apply to each recurring donation if you set up a recurring donation. You authorize the payment service provider to debit your account on the designated schedule. Contact us to cancel a recurring donation.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4 mt-8">2. Membership</h2>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 mb-6">
              <li>
                <strong>Membership Eligibility:</strong> Membership is available to individuals who meet the eligibility criteria outlined on the website (e.g., age, residency).
              </li>
              <li>
                <strong>Membership Fees:</strong> Membership fees are payable as specified on the website.
              </li>
              <li>
                <strong>Membership Benefits:</strong> Details of membership benefits are outlined on the website.
              </li>
              <li>
                <strong>Membership Cancellation:</strong> You can cancel your membership at any time, however, membership fees may be non-refundable or partially refundable depending on the Refund Policy.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4 mt-8">3. Intellectual Property</h2>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 mb-6">
              <li>
                All website content (text, images, logos, etc.) is the property of <span className="font-semibold">Our Organization</span> and protected by intellectual property laws.
              </li>
              <li>
                Use of our content without express written permission is not permitted.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4 mt-8">4. Limitation of Liability</h2>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 mb-6">
              <li>
                Efforts are made to provide a secure and reliable website, but uninterrupted or error-free access is not guaranteed.
              </li>
              <li>
                We are not liable for any loss or damages arising from the use of the website or donation services.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4 mt-8">5. Governing Law and Jurisdiction</h2>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 mb-6">
              <li>
                These T&amp;C are governed by the laws of <span className="font-semibold">[Your Jurisdiction]</span>.
              </li>
              <li>
                Any disputes will be subject to the exclusive jurisdiction of the courts in <span className="font-semibold">[Your City, Your Jurisdiction]</span>.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4 mt-8">6. Changes to Terms &amp; Conditions</h2>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700">
              <li>
                The right to amend these T&amp;C at any time without prior notice by posting changes online is reserved.
              </li>
              <li>
                Review the T&amp;C periodically for updates is your responsibility.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default TermsConditions
