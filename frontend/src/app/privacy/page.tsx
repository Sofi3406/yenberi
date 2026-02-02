"use client";

import { 
  FaShieldAlt, 
  FaDatabase, 
  FaUserCheck, 
  FaLock, 
  FaEye, 
  FaTrashAlt, 
  FaCookie, 
  FaUserFriends, 
  FaPhoneAlt, 
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowUp,
  FaRegCopy,
  FaPrint,
  FaDownload
} from 'react-icons/fa'

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: FaShieldAlt,
      title: "Our Commitment to Your Privacy",
      content: "SLMA is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information on the SLMA platform.",
      points: [
        "We treat your personal information with respect and confidentiality",
        "Your personal information is treated with the utmost respect",
        "We implement security measures to protect your data",
        "Transparency in how we handle your information"
      ],
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50"
    },
    {
      icon: FaDatabase,
      title: "Information We Collect",
      content: "We collect information you provide when you register, upload documents, make payments, or use platform features.",
      points: [
        "Account details: name, email, phone, woreda",
        "Profile data: language, profession, residency (optional)",
        "Verification documents: national ID uploads",
        "Payment details: membership plan and receipt uploads",
        "Usage data: login time, activities, and event participation"
      ],
      note: "We collect only information necessary for providing our services",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50"
    },
    {
      icon: FaUserCheck,
      title: "How We Use Your Information",
      content: "We use your information to operate the platform, verify membership, and deliver services.",
      points: [
        "To create and manage your account",
        "To verify identity and membership payments",
        "To communicate updates, events, and notifications",
        "To improve platform features and security",
        "To comply with legal obligations"
      ],
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50"
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
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50"
    },
    {
      icon: FaEye,
      title: "Information Sharing & Disclosure",
      content: "We do not sell your personal information. We share data only when necessary to operate the platform or comply with law.",
      points: [
        "With your explicit consent",
        "With service providers who help run the platform",
        "When required by law or legal process",
        "To protect rights, property, or safety",
        "During organizational transfers or mergers"
      ],
      note: "All third parties must comply with our privacy standards",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50"
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
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50"
    },
    {
      icon: FaUserFriends,
      title: "Third-Party Services",
      content: "We may use third-party services (email, hosting, analytics) that have their own privacy policies.",
      points: [
        "Email service providers",
        "Cloud hosting and storage",
        "Analytics tools (limited usage data)",
        "Payment processing for donations"
      ],
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50"
    },
    {
      icon: FaTrashAlt,
      title: "Data Retention & Deletion",
      content: "We retain data only as long as needed for verification, legal compliance, and platform operations.",
      points: [
        "Account data: retained while account is active",
        "Verification documents: retained for compliance",
        "Payment records: retained for auditing and legal reasons",
        "You may request account deletion"
      ],
      color: "from-gray-600 to-gray-700",
      bgColor: "bg-gradient-to-br from-gray-50 to-gray-100"
    },
    {
      title: "Your Rights & Choices",
      content: "You have rights regarding your personal information, including access, correction, and deletion where applicable.",
      points: [
        "Right to access your personal information",
        "Right to correct inaccurate data",
        "Right to request deletion of your data",
        "Right to withdraw consent",
        "Right to data portability",
        "Right to object to processing"
      ],
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50"
    },
    {
      title: "Children's Privacy",
      content: "We do not knowingly collect personal information from children under 13 without parental consent.",
      points: [
        "Special programs for youth require parental consent",
        "Limited data collection for minors",
        "Parental access and control over children's data",
        "Education programs may collect minimal academic information"
      ],
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50"
    },
    {
      title: "International Data Transfers",
      content: "Your information may be processed on servers located outside your region depending on hosting providers.",
      points: [
        "Transfers only to countries with adequate protection",
        "Standard contractual clauses for data protection",
        "Notification of international transfers",
        "Right to know where your data is processed"
      ],
      color: "from-slate-600 to-gray-600",
      bgColor: "bg-gradient-to-br from-slate-50 to-gray-50"
    },
    {
      title: "Updates to This Policy",
      content: "We may update this Privacy Policy periodically. We will notify you of significant changes.",
      points: [
        "Review date indicated at the top of this page",
        "Notification of major changes via email",
        "Continued use after changes constitutes acceptance",
        "Archive of previous versions available upon request"
      ],
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-gradient-to-br from-indigo-50 to-purple-50"
    },
    {
      icon: FaPhoneAlt,
      title: "Contact Information",
      content: "If you have questions about this Privacy Policy or your data, contact SLMA support.",
      points: [
        "Email: membership@siltecommunity.org",
        "Phone: +251 93 067 0088",
        "Address: Worabe, Silte Zone, Ethiopia",
        "Response within 2-5 business days"
      ],
      color: "from-blue-600 to-indigo-600",
      bgColor: "bg-gradient-to-br from-blue-100 to-indigo-100"
    }
  ]

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyToClipboard = () => {
    const text = document.querySelector('main')?.innerText || '';
    navigator.clipboard.writeText(text)
      .then(() => alert('Privacy Policy copied to clipboard!'))
      .catch(err => console.error('Copy failed:', err));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert('PDF download feature would be implemented here');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-emerald-50/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-600/10 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-purple-600/10 to-transparent -z-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
      
      {/* Floating action buttons */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
        <button
          onClick={handleScrollToTop}
          className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-5 h-5 group-hover:animate-bounce" />
        </button>
        
        <button
          onClick={handleCopyToClipboard}
          className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
          aria-label="Copy policy"
        >
          <FaRegCopy className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>
        
        <button
          onClick={handlePrint}
          className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
          aria-label="Print policy"
        >
          <FaPrint className="w-5 h-5" />
        </button>
      </div>

      {/* Header Section - Changed to dark text */}
      <div className="relative bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 border-b border-gray-200 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-grid-gray-200/50 bg-[size:20px_20px]"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-200/30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 border border-gray-200">
              <FaShieldAlt className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-gray-800">Privacy & Data Protection</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-gray-900">
              Privacy <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              How SLMA collects, uses, and protects your personal information
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-800 border border-gray-200">GDPR Compliant</span>
              <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-800 border border-gray-200">Data Protection</span>
              <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-800 border border-gray-200">Your Privacy Rights</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-20">
        {/* Privacy Promise Card */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-xl">
                  <FaShieldAlt className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Privacy Promise</h2>
                <p className="text-gray-800 mb-4">
                  We are committed to protecting your personal information and using it only for platform operations such as registration, verification, and communication.
                </p>
                <div className="flex items-center gap-2 text-sm text-indigo-700 font-semibold">
                  <FaExclamationTriangle className="w-4 h-4" />
                  <span>Your trust is our most valuable asset</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <div key={index} className="group relative">
                {/* Card */}
                <div className={`${section.bgColor} rounded-2xl p-8 shadow-lg border border-gray-100 h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}>
                  {/* Corner accent */}
                  <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${section.color} rounded-bl-2xl rounded-tr-2xl opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                  
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-6">
                    {section.icon && (
                      <div className={`p-3 bg-gradient-to-br ${section.color} rounded-xl`}>
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-gray-900">
                      {section.title}
                    </h2>
                  </div>
                  
                  {/* Content */}
                  <p className="text-gray-800 mb-6 leading-relaxed">
                    {section.content}
                  </p>
                  
                  {/* Points */}
                  {section.points && section.points.length > 0 && (
                    <div className="space-y-3 mb-4">
                      {section.points.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-start gap-3 p-3 bg-white/70 rounded-lg hover:bg-white transition-colors">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${section.color} mt-2 flex-shrink-0`} />
                          <span className="text-gray-800">{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Note */}
                  {section.note && (
                    <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-sm text-amber-900">
                        <span className="font-semibold">Note: </span>
                        {section.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Ethical Framework Section */}
          <div className="mt-16 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Islamic Ethical Framework for Data Protection
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: "Amanah (Trust)",
                  description: "Your data is entrusted to us, and we handle it with integrity and responsibility.",
                  color: "from-indigo-500 to-blue-500"
                },
                {
                  title: "Ihsan (Excellence)",
                  description: "We strive for excellence in protecting your privacy and securing your information.",
                  color: "from-emerald-500 to-teal-500"
                },
                {
                  title: "Adl (Justice)",
                  description: "We treat your data fairly and use it only for legitimate, disclosed purposes.",
                  color: "from-amber-500 to-orange-500"
                }
              ].map((principle, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${principle.color} rounded-full mb-4 mx-auto`}>
                    <FaCheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3">{principle.title}</h4>
                  <p className="text-sm text-gray-700">{principle.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-indigo-300">
              <div className="text-center">
                <p className="text-gray-800 mb-6">
                  This Privacy Policy reflects our commitment to protecting your personal information while serving our community with Islamic values.
                </p>
                <button 
                  onClick={handleScrollToTop}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Back to Top
                  <FaArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Final Summary */}
          <div className="mt-16 p-12 bg-gradient-to-br from-gray-100 to-indigo-100 rounded-3xl text-gray-900 shadow-2xl border border-gray-300">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex p-4 bg-white/80 backdrop-blur-sm rounded-2xl mb-8 border border-gray-200">
                <FaShieldAlt className="w-12 h-12 text-indigo-600" />
              </div>
              
              <h3 className="text-3xl font-bold mb-6 text-gray-900">
                Your Privacy Matters
              </h3>
              
              <p className="text-lg text-gray-800 mb-8 leading-relaxed">
                We are committed to maintaining the highest standards of data protection and privacy. 
                Your information is handled with care, respect, and in compliance with all applicable laws and regulations.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200">
                  <div className="text-indigo-700 font-bold text-sm mb-2">TRANSPARENCY</div>
                  <p className="text-sm text-gray-700">Clear communication about how we use your data</p>
                </div>
                <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200">
                  <div className="text-emerald-700 font-bold text-sm mb-2">SECURITY</div>
                  <p className="text-sm text-gray-700">Robust measures to protect your information</p>
                </div>
              </div>
              
            
            </div>
          </div>
        </div>
      </div>

      
      {/* Custom Styles */}
      <style jsx>{`
        .bg-grid-gray-200\/50 {
          background-image: 
            linear-gradient(to right, rgba(209, 213, 219, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(209, 213, 219, 0.5) 1px, transparent 1px);
        }
        
        @media print {
          .no-print {
            display: none;
          }
          body {
            color: #000000 !important;
            background: #ffffff !important;
          }
        }
      `}</style>
    </main>
  )
}