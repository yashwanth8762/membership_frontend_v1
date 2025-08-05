import React from 'react'
import Footer from '../components/Footer'

const RefundPolicyPage = () => {
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
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8 mt-8">Refund Policy</h1>
          <div className="w-full bg-white rounded-lg shadow-lg p-6 lg:p-10 mb-10">
            <p className="mb-6 text-lg text-gray-700">
              We appreciate your generosity and support of our organization. Please carefully review our Refund Policy before making a donation or becoming a member.
            </p>
            <h2 className="text-2xl font-semibold mb-4 mt-6">1. Donation Refunds</h2>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 mb-6">
              <li>
                <strong>General Policy:</strong> Donations are generally non-refundable as they represent voluntary contributions to support the mission.
              </li>
              <li>
                <strong>Exceptional Circumstances:</strong> Refund requests may be considered in exceptional cases such as:
                <ul className="list-disc ml-6 mt-2">
                  <li>Errors in making the donation (e.g., incorrect amount, unintended recipient).</li>
                  <li>Duplicate donations for the same cause.</li>
                  <li>Unauthorized use of a credit or debit card, according to Jamiat Ulama-i-Hind.</li>
                </ul>
              </li>
              <li>
                <strong>Refund Request Process:</strong>
                <ul className="list-disc ml-6 mt-2">
                  <li>Refund requests must be submitted in writing or via email to <span className="text-blue-600 underline">info@karnatakamadaramahasabha.org</span> within <span className="font-semibold">7 business days </span> days from the date of the donation.</li>
                  <li>Proof of the deduction of the donation amount and other supporting documents may be required.</li>
                  <li>If a tax exemption certificate has been issued and/or utilized, a refund may not be possible.</li>
                  <li>Refunds will be processed within <span className="font-semibold">7 </span> business days upon approval and credited back to the original payment method, states HelpAge India.</li>
                  <li>No cash refunds will be provided.</li>
                </ul>
              </li>
              <li>
                <strong>Non-Refundable Donations:</strong> Donations made towards specific projects, campaigns, or events explicitly stated as non-refundable are not eligible for a refund.
              </li>
              <li>
                <strong>Denial of Refund Requests:</strong> All decisions regarding refunds will be final and binding. If a refund request is denied, you may appeal the decision with additional supporting documents within <span className="font-semibold">7 business days </span> days.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4 mt-8">2. Membership Fee Refunds</h2>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700">
              <li>
                <strong>Membership Cancellation:</strong> If you cancel your membership, membership fees may be non-refundable or partially refundable depending on the specific membership terms.
              </li>
              <li>
                <strong>Refund Request Process:</strong> Contact us at <span className="text-blue-600 underline">info@karnatakamadaramahasabha.org</span> to inquire about membership fee refunds.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default RefundPolicyPage
