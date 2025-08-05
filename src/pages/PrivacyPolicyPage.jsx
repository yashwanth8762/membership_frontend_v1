import React from 'react'
import Footer from '../components/Footer'

const PrivacyPolicyPage = () => {
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
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8 mt-8">Privacy Policy</h1>
          <div className="w-full bg-white rounded-lg shadow-lg p-6 lg:p-10 mb-10">
            <p className="mb-6 text-lg text-gray-700">
              Your privacy is paramount. This Privacy Policy details how <span className="font-semibold">Our Organization </span> collects, uses, stores, and shares the personal and financial information gathered from you when you donate or become a member of our organization.
            </p>
            <h2 className="text-2xl font-semibold mb-4 mt-6">1. Information Collection and Usage</h2>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 mb-6">
              <li>
                <strong>Types of Information:</strong> Information provided, such as name, contact details (email, address, phone number), payment information (credit/debit card details), and donation/membership history is collected. Non-personal information like IP addresses and website usage data may also be collected.
              </li>
              <li>
                <strong>Purpose of Collection:</strong> The information is used to:
                <ul className="list-disc ml-6 mt-2">
                  <li>Process donations and memberships, and issue receipts or tax certificates.</li>
                  <li>Send communications related to your donations or membership, and provide updates on our activities.</li>
                  <li>Analyze donor behavior and tailor fundraising efforts.</li>
                  <li>Comply with legal and regulatory obligations, including tax laws.</li>
                </ul>
              </li>
              <li>
                <strong>Legal Basis:</strong> Personal data is processed based on explicit consent for communication and contract performance for donations and memberships.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4 mt-8">2. Data Sharing and Third Parties</h2>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 mb-6">
              <li>
                <strong>Payment Gateways:</strong> Third-party payment gateways (e.g., Razorpay) are used to securely process online donations. Review their Privacy Policies.
              </li>
              <li>
                <strong>Other Service Providers:</strong> Your data may be shared with other service providers who help us operate our website, send communications, or manage donor data.
              </li>
              <li>
                <strong>NGOs:</strong> If you donate to a specific project or NGO listed on our platform, your information may be shared with that NGO for legal and operational purposes.
              </li>
              <li>
                <strong>Limited Sharing:</strong> Your personal information will not be sold, rented, or traded with other organizations for marketing purposes.
              </li>
              <li>
                <strong>External Links:</strong> The website may contain links to external sites. We are not responsible for the content or privacy practices of these sites. Review their privacy policies before providing personal information.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4 mt-8">3. Data Security</h2>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 mb-6">
              <li>
                Robust security measures, including encryption and secure servers, are implemented to protect personal and financial information.
              </li>
              <li>
                Industry standards like PCI DSS are followed to protect payment data.
              </li>
              <li>
                The absolute security of your information cannot be guaranteed, but all reasonable steps are taken to prevent unauthorized access or breaches.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4 mt-8">4. User Rights and Choices</h2>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 mb-6">
              <li>
                <strong>Access and Correction:</strong> You have the right to access and correct your personal information.
              </li>
              <li>
                <strong>Withdraw Consent:</strong> You can withdraw consent for the use of your information for certain purposes (e.g., marketing communications).
              </li>
              <li>
                <strong>Data Deletion:</strong> You can request the deletion of your personal information, subject to legal and contractual obligations.
              </li>
              <li>
                <strong>Opt-Out:</strong> You can opt-out of receiving communications by contacting us or using the unsubscribe link in our emails.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4 mt-8">5. Data Retention</h2>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 mb-6">
              <li>
                Personal information is retained only as long as necessary to fulfill the purposes outlined in this policy or as required by law (e.g., tax records).
              </li>
              <li>
                Data will be securely deleted or anonymized when it is no longer needed.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4 mt-8">6. Changes to Privacy Policy</h2>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 mb-6">
              <li>
                This Privacy Policy may be updated periodically. You will be notified of any significant changes by posting the updated policy on the website or through other communication channels.
              </li>
              <li>
                It is your responsibility to review this policy periodically for updates.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4 mt-8">7. Contact Information</h2>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700">
              <li>
                If you have any questions or concerns about this Privacy Policy or your data, please contact us at <span className="text-blue-600 underline">info@karnatakamadaramahasabha.org</span>.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default PrivacyPolicyPage

