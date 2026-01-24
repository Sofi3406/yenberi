"use client";

import { FaFileContract, FaUserShield, FaBalanceScale, FaExclamationTriangle, FaLock, FaGlobe } from 'react-icons/fa'

export default function TermsPage() {
  const sections = [
    {
      icon: FaFileContract,
      title: "Acceptance of Terms",
      content: "By accessing and using the SLMA  website, services, and platforms, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.",
      points: [
        "These terms constitute a legally binding agreement",
        "Updates to terms will be posted on this page",
        "Continued use constitutes acceptance of revised terms"
      ]
    },
    {
      icon: FaUserShield,
      title: "User Eligibility",
      content: "Our services are intended for post-Hayrenzi students and community members who share our mission of community development through Islamic values.",
      points: [
        "You must be at least 18 years old to register as a volunteer",
        "Users must provide accurate and complete information",
        "Accounts are personal and non-transferable",
        "We reserve the right to refuse service to anyone"
      ]
    },
    {
      icon: FaGlobe,
      title: "Use of Services",
      content: "SLMA provides community services including health outreach, educational programs, religious services, and community development initiatives.",
      points: [
        "Services must be used for lawful purposes only",
        "No disruption of service operations permitted",
        "Respect for all community members required",
        "Compliance with Islamic ethical standards expected"
      ]
    },
    {
      icon: FaBalanceScale,
      title: "Intellectual Property",
      content: "All content on this site, including text, graphics, logos, and software, is the property of SLMA or its content suppliers and protected by copyright laws.",
      points: [
        "Content may not be reproduced without permission",
        "SLMA name and logo are registered trademarks",
        "User-generated content remains user property",
        "By posting content, you grant SLMA usage rights"
      ]
    },
    {
      icon: FaLock,
      title: "Privacy & Data Protection",
      content: "Your privacy is important to us. We collect and use personal information in accordance with our Privacy Policy and Islamic ethical principles.",
      points: [
        "Personal data used only for intended purposes",
        "Data security measures implemented",
        "No sharing of personal information without consent",
        "Right to access and correct personal information"
      ]
    },
    {
      icon: FaExclamationTriangle,
      title: "Disclaimer & Limitations",
      content: "SLMA services are provided 'as is' without warranties of any kind. We are not liable for indirect or consequential damages.",
      points: [
        "Volunteer activities involve inherent risks",
        "SLMA not liable for third-party actions",
        "Service availability not guaranteed",
        "Maximum liability limited to service fees paid"
      ]
    },
    {
      title: "Volunteer Responsibilities",
      content: "As a volunteer, you commit to upholding SLMA's values and mission in all activities.",
      points: [
        "Act with honesty, integrity, and respect",
        "Maintain confidentiality where required",
        "Follow safety guidelines and instructions",
        "Represent SLMA positively in the community"
      ]
    },
    {
      title: "Donation Terms",
      content: "All donations to SLMA are used exclusively for community development projects in accordance with Islamic principles of charity.",
      points: [
        "Donations are generally non-refundable",
        "Receipts provided for tax purposes",
        "Funds allocated to specific projects as designated",
        "Transparency reports available upon request"
      ]
    },
    {
      title: "Termination",
      content: "SLMA reserves the right to terminate or suspend access to services for violation of these terms.",
      points: [
        "Violation of terms may result in immediate termination",
        "Users may terminate account at any time",
        "Termination does not affect existing obligations",
        "SLMA may preserve user data as required by law"
      ]
    },
    {
      title: "Governing Law",
      content: "These terms are governed by applicable laws while respecting Islamic ethical principles.",
      points: [
        "Disputes resolved through mediation first",
        "Islamic arbitration principles may apply",
        "Legal proceedings in jurisdiction of SLMA headquarters",
        "Compliance with local laws required"
      ]
    },
    {
      title: "Modifications",
      content: "SLMA may modify these terms at any time. Continued use after changes constitutes acceptance.",
      points: [
        "Changes posted on this page",
        "Major changes notified via email",
        "Review terms periodically",
        "Effective date indicated for each version"
      ]
    },
    {
      title: "Contact Information",
      content: "For questions about these terms, contact our legal team.",
      points: [
        "Email: legal@slma-community.org",
        "Address: SLMA Headquarters, Community Center, Addis Ababa",
        "Phone: +251 930 670 088",
        "Response within 5-7 business days"
      ]
    }
  ]

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-emerald-50/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-emerald-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
      
            
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Important Notice */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-6 rounded-r-lg shadow-lg">
            <div className="flex items-start gap-4">
              <FaExclamationTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Important Notice</h3>
                <p className="text-gray-700 mb-2">
                  Please read these Terms and Conditions carefully before using SLMA services. These terms govern your relationship with SLMA and outline your rights and responsibilities as a community member.
                </p>
                <p className="text-sm text-gray-600">
                  By accessing our website, registering as a volunteer, or participating in any SLMA activity, you agree to be bound by these terms.
                </p>
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
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                    <section.icon className="w-6 h-6 text-blue-600" />
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
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <ul className="space-y-3">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* Acceptance Section */}
          <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Acceptance of Terms
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="font-semibold text-gray-800">By Continuing to Use Our Services</span>
                </div>
                <p className="text-gray-700 text-sm pl-6">
                  You acknowledge that you have read, understood, and agree to all terms and conditions outlined on this page.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-amber-500 rounded-full" />
                  <span className="font-semibold text-gray-800">Need Clarification?</span>
                </div>
                <p className="text-gray-700 text-sm pl-6">
                  Contact our legal team before proceeding if you have any questions or concerns.
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-blue-300">
              <div className="text-center">
                <p className="text-gray-700 mb-6">
                  These terms are designed to protect both SLMA and our community members while promoting our shared mission of service and development.
                </p>
                <button 
                  onClick={handleScrollToTop}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
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