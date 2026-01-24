"use client";

import { FaShieldAlt, FaDatabase, FaUserCheck, FaLock, FaEye, FaTrashAlt, FaCookie, FaUserFriends, FaPhoneAlt, FaExclamationTriangle } from 'react-icons/fa'

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: FaShieldAlt,
      title: "Our Commitment to Your Privacy",
      content: "SLMA is committed to protecting your privacy and personal information in accordance with Islamic ethical principles and applicable data protection laws. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.",
      points: [
        "We follow Islamic principles of honesty, trust, and confidentiality",
        "Your personal information is treated with the utmost respect",
        "We implement security measures to protect your data",
        "Transparency in how we handle your information"
      ]
    },
    {
      icon: FaDatabase,
      title: "Information We Collect",
      content: "We collect information that you voluntarily provide to us when you register as a volunteer, participate in our programs, or interact with our services.",
      points: [
        "Personal identification: Name, email, phone number, address",
        "Demographic information: Age, gender, educational background",
        "Volunteer preferences and availability",
        "Communication records and feedback",
        "Event participation history"
      ],
      note: "We collect only information necessary for providing our services"
    },
    {
      icon: FaUserCheck,
      title: "How We Use Your Information",
      content: "Your information helps us provide better services and improve our community programs while respecting your privacy.",
      points: [
        "To process volunteer registrations and manage participation",
        "To communicate about events, updates, and opportunities",
        "To personalize your experience and preferences",
        "To improve our services and community programs",
        "To comply with legal obligations and ensure safety"
      ]
    },
    {
      icon: FaLock,
      title: "Data Protection & Security",
      content: "We implement appropriate technical and organizational security measures to protect your personal information.",
      points: [
        "Encryption of sensitive data during transmission",
        "Secure storage with access controls",
        "Regular security audits and updates",
        "Training for staff on data protection",
        "Incident response procedures"
      ]
    },
    {
      icon: FaEye,
      title: "Information Sharing & Disclosure",
      content: "We do not sell, trade, or rent your personal information to third parties. We may share information only in specific circumstances.",
      points: [
        "With your explicit consent",
        "With service providers who assist our operations",
        "When required by law or legal process",
        "To protect rights, property, or safety",
        "During organizational transfers or mergers"
      ],
      note: "All third parties must comply with our privacy standards"
    },
    {
      icon: FaCookie,
      title: "Cookies & Tracking Technologies",
      content: "Our website uses cookies and similar technologies to enhance user experience and analyze website traffic.",
      points: [
        "Essential cookies for website functionality",
        "Analytics cookies to understand usage patterns",
        "Preference cookies to remember your settings",
        "You can control cookies through browser settings"
      ]
    },
    {
      icon: FaUserFriends,
      title: "Third-Party Services",
      content: "We may use third-party services that have their own privacy policies. We encourage you to review their policies.",
      points: [
        "Payment processors for donations",
        "Email service providers",
        "Cloud storage and hosting services",
        "Analytics and survey tools"
      ]
    },
    {
      icon: FaTrashAlt,
      title: "Data Retention & Deletion",
      content: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy.",
      points: [
        "Volunteer data: Retained while active, archived after 2 years of inactivity",
        "Financial records: Retained for 7 years for legal compliance",
        "Event records: Retained for community history",
        "Right to request deletion of personal data"
      ]
    },
    {
      title: "Your Rights & Choices",
      content: "You have rights regarding your personal information, including access, correction, and deletion.",
      points: [
        "Right to access your personal information",
        "Right to correct inaccurate data",
        "Right to request deletion of your data",
        "Right to withdraw consent",
        "Right to data portability",
        "Right to object to processing"
      ]
    },
    {
      title: "Children's Privacy",
      content: "We do not knowingly collect personal information from children under 13 without parental consent.",
      points: [
        "Special programs for youth require parental consent",
        "Limited data collection for minors",
        "Parental access and control over children's data",
        "Education programs may collect minimal academic information"
      ]
    },
    {
      title: "International Data Transfers",
      content: "As a community organization with global reach, your information may be transferred to and processed in countries outside your residence.",
      points: [
        "Transfers only to countries with adequate protection",
        "Standard contractual clauses for data protection",
        "Notification of international transfers",
        "Right to know where your data is processed"
      ]
    },
    {
      title: "Updates to This Policy",
      content: "We may update this Privacy Policy periodically. We will notify you of significant changes.",
      points: [
        "Review date indicated at the top of this page",
        "Notification of major changes via email",
        "Continued use after changes constitutes acceptance",
        "Archive of previous versions available upon request"
      ]
    },
    {
      icon: FaPhoneAlt,
      title: "Contact Information",
      content: "If you have questions about this Privacy Policy or our data practices, please contact our Data Protection Officer.",
      points: [
        "Email: privacy@slma-community.org",
        "Phone: +251 930 670 088",
        "Address: Data Protection Officer, SLMA Headquarters",
        "Response within 7-10 business days"
      ]
    }
  ]

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/20 to-purple-50/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              
            </div>
            
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Privacy Promise */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-blue-200">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-xl">
                  <FaShieldAlt className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Privacy Promise</h2>
                <p className="text-gray-700 mb-4">
                  At SLMA, we believe privacy is not just a legal requirement but an Islamic ethical obligation. We are committed to protecting your personal information with the same care and respect we extend to our community members.
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
                  <FaExclamationTriangle className="w-4 h-4" />
                  <span>Your trust is our most valuable asset</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="mb-10 bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4 mb-6">
                {section.icon && (
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                    <section.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                )}
                <h2 className="text-2xl font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                {section.content}
              </p>
              
              {section.points && section.points.length > 0 && (
                <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl p-6 border border-gray-200">
                  <ul className="space-y-3">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {section.note && (
                <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <span className="font-semibold">Note: </span>
                    {section.note}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Data Protection Principles */}
          <div className="mt-16 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Islamic Ethical Framework for Data Protection
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: "Amanah (Trust)",
                  description: "Your data is entrusted to us, and we handle it with integrity and responsibility."
                },
                {
                  title: "Ihsan (Excellence)",
                  description: "We strive for excellence in protecting your privacy and securing your information."
                },
                {
                  title: "Adl (Justice)",
                  description: "We treat your data fairly and use it only for legitimate, disclosed purposes."
                }
              ].map((principle, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-indigo-700 mb-3">{principle.title}</h4>
                  <p className="text-sm text-gray-600">{principle.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-indigo-300">
              <div className="text-center">
                <p className="text-gray-700 mb-6">
                  This Privacy Policy reflects our commitment to protecting your personal information while serving our community with Islamic values.
                </p>
                <button 
                  onClick={handleScrollToTop}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Back to Top
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </main>
  )
}