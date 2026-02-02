"use client";

import { 
  FaFileContract, 
  FaUserShield, 
  FaBalanceScale, 
  FaExclamationTriangle, 
  FaLock, 
  FaGlobe,
  FaCheckCircle,
  FaArrowUp,
  FaRegCopy,
  FaPrint,
  FaDownload,
  FaBook,
  FaHandshake,
  FaShieldAlt,
  FaFileInvoiceDollar,
  FaUserTimes
} from 'react-icons/fa';

export default function TermsPage() {
  const sections = [
    {
      icon: FaFileContract,
      title: "Acceptance of Terms",
      content: "By accessing or using the SLMA platform (website, services, and applications), you agree to these Terms. If you do not agree, do not use the platform.",
      points: [
        "These terms constitute a legally binding agreement",
        "Updates to terms will be posted on this page",
        "Continued use constitutes acceptance of revised terms"
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50"
    },
    {
      icon: FaUserShield,
      title: "Accounts & Eligibility",
      content: "You must provide accurate information and maintain only one account. Access to member features requires admin verification.",
      points: [
        "Accounts are personal and non‑transferable",
        "Keep your login credentials secure",
        "Admins may suspend accounts that violate these terms",
        "We may request verification documents where required"
      ],
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50"
    },
    {
      icon: FaGlobe,
      title: "Use of Services",
      content: "The SLMA platform provides membership management, events, donations, galleries, and community updates.",
      points: [
        "Use the platform only for lawful, respectful purposes",
        "Do not disrupt or abuse services or infrastructure",
        "Do not upload harmful or misleading content",
        "Respect community guidelines and local laws"
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50"
    },
    {
      icon: FaBalanceScale,
      title: "Content & Intellectual Property",
      content: "SLMA content (logos, text, designs) is protected. User‑generated content remains yours, but you grant SLMA rights to display it on the platform.",
      points: [
        "Do not copy SLMA branding without permission",
        "Do not upload copyrighted material without rights",
        "SLMA may remove content that violates these terms",
        "You are responsible for content you submit"
      ],
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50"
    },
    {
      icon: FaLock,
      title: "Privacy & Data Protection",
      content: "We collect and use personal data to provide services (registration, verification, payments, and events).",
      points: [
        "Personal data is used only for platform operations",
        "You can request updates to your profile information",
        "Uploaded documents are used for verification",
        "See the Privacy Policy for details"
      ],
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50"
    },
    {
      icon: FaExclamationTriangle,
      title: "Payments & Verification",
      content: "Paid memberships require receipt upload and admin verification before activation.",
      points: [
        "Receipts must be clear and valid",
        "Verification may take time depending on workload",
        "Rejected receipts require re‑submission",
        "Membership activation occurs after verification"
      ],
      color: "from-rose-500 to-red-500",
      bgColor: "bg-gradient-to-br from-rose-50 to-red-50"
    },
    {
      icon: FaBook,
      title: "Uploads & Documents",
      content: "Some features require document uploads (e.g., national ID, payment receipt).",
      points: [
        "Do not upload false or altered documents",
        "Uploads must comply with file type/size limits",
        "Keep personal data accurate and up to date",
        "Admins can request re‑uploads if needed"
      ],
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50"
    },
    {
      icon: FaFileInvoiceDollar,
      title: "Donations",
      content: "Donations are used for SLMA community projects. Receipt uploads may be required for verification.",
      points: [
        "Donations are generally non‑refundable",
        "Provide accurate donor details",
        "Receipts and verification statuses may be displayed",
        "Contact support for donation issues"
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50"
    },
    {
      icon: FaUserTimes,
      title: "Account Suspension",
      content: "SLMA may suspend or terminate access for violations, fraud, or misuse.",
      points: [
        "We may remove access to protect users and the platform",
        "You may request account deletion",
        "Certain records may be retained for legal reasons",
        "Suspension decisions are final unless appealed"
      ],
      color: "from-gray-600 to-gray-700",
      bgColor: "bg-gradient-to-br from-gray-50 to-gray-100"
    },
    {
      icon: FaShieldAlt,
      title: "Limitation of Liability",
      content: "Services are provided 'as is' without warranties. SLMA is not liable for indirect damages.",
      points: [
        "Service availability is not guaranteed",
        "You use the platform at your own risk",
        "We are not responsible for third‑party links",
        "Liability is limited to the extent allowed by law"
      ],
      color: "from-slate-600 to-gray-600",
      bgColor: "bg-gradient-to-br from-slate-50 to-gray-50"
    },
    {
      icon: FaHandshake,
      title: "Modifications",
      content: "SLMA may update these terms at any time. Continued use means you accept updates.",
      points: [
        "Changes posted on this page",
        "Major changes notified via email",
        "Review terms periodically",
        "Effective date indicated for each version"
      ],
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50"
    }
  ]

  const contactInfo = {
    title: "Contact Information",
    content: "For questions about these terms or your account, contact SLMA support.",
    points: [
      "Email: membership@siltecommunity.org",
      "Phone: +251 93 067 0088",
      "Address: Worabe, Silte Zone, Ethiopia",
      "Response within 2-5 business days"
    ],
    color: "from-blue-600 to-indigo-600",
    bgColor: "bg-gradient-to-br from-blue-100 to-indigo-100"
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyToClipboard = () => {
    const text = document.querySelector('main')?.innerText || '';
    navigator.clipboard.writeText(text)
      .then(() => alert('Terms copied to clipboard!'))
      .catch(err => console.error('Copy failed:', err));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert('PDF download feature would be implemented here');
    // In a real implementation, this would generate/download a PDF
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-emerald-50/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-600/10 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-emerald-600/10 to-transparent -z-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
      
      {/* Floating action buttons */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
        <button
          onClick={handleScrollToTop}
          className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-5 h-5 group-hover:animate-bounce" />
        </button>
        
        <button
          onClick={handleCopyToClipboard}
          className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
          aria-label="Copy terms"
        >
          <FaRegCopy className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>
        
        <button
          onClick={handlePrint}
          className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
          aria-label="Print terms"
        >
          <FaPrint className="w-5 h-5" />
        </button>
      </div>

      {/* Header Section - Changed to dark text */}
      <div className="relative bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 border-b border-gray-200 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-grid-gray-200/50 bg-[size:20px_20px]"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200/30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 border border-gray-200">
              <FaCheckCircle className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-gray-800">Legal Document</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-gray-900">
              Terms of <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Service</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              SLMA Platform Terms & Conditions • Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-800 border border-gray-200">Effective Immediately</span>
              <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-800 border border-gray-200">Community Guidelines</span>
              <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-800 border border-gray-200">Legal Binding</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-20">
        {/* Important Notice Card */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="p-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-lg">
                <FaExclamationTriangle className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Important Notice</h3>
                <p className="text-gray-800 mb-4 text-lg leading-relaxed">
                  Please read these Terms carefully before using the SLMA platform. They explain your rights, responsibilities, and how membership verification and payments work.
                </p>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-amber-900 font-semibold flex items-center gap-2">
                    <FaCheckCircle className="w-4 h-4" />
                    By using SLMA services or creating an account, you agree to these terms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <div 
                key={index} 
                className="group relative"
              >
                {/* Card */}
                <div className={`${section.bgColor} rounded-2xl p-8 shadow-lg border border-gray-100 h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}>
                  {/* Corner accent */}
                  <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${section.color} rounded-bl-2xl rounded-tr-2xl opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                  
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`inline-flex p-3 bg-gradient-to-br ${section.color} rounded-xl shadow-lg`}>
                      <section.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  
                  {/* Content */}
                  <p className="text-gray-800 mb-6 leading-relaxed">
                    {section.content}
                  </p>
                  
                  {/* Points */}
                  {section.points && section.points.length > 0 && (
                    <div className="space-y-3">
                      {section.points.map((point, pointIndex) => (
                        <div 
                          key={pointIndex} 
                          className="flex items-start gap-3 p-3 bg-white/70 rounded-lg hover:bg-white transition-colors"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${section.color} mt-2 flex-shrink-0`} />
                          <span className="text-gray-800">{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Information Section */}
          <div className="mt-16">
            <div className={`${contactInfo.bgColor} rounded-2xl p-8 shadow-xl border border-gray-200`}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <FaHandshake className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
                  <p className="text-gray-700">Get in touch with our support team</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-800 mb-6 leading-relaxed">
                    {contactInfo.content}
                  </p>
                </div>
                <div className="space-y-4">
                  {contactInfo.points.map((point, pointIndex) => (
                    <div 
                      key={pointIndex} 
                      className="flex items-center gap-3 p-4 bg-white/90 rounded-xl hover:bg-white transition-colors border border-gray-200"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                      <span className="text-gray-900 font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Final Acceptance Section */}
          <div className="mt-16 p-12 bg-gradient-to-br from-gray-100 to-blue-100 rounded-3xl text-gray-900 shadow-2xl border border-gray-300">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex p-4 bg-white/80 backdrop-blur-sm rounded-2xl mb-8 border border-gray-200">
                <FaCheckCircle className="w-12 h-12 text-emerald-600" />
              </div>
              
              <h3 className="text-3xl font-bold mb-6 text-gray-900">
                Agreement Confirmation
              </h3>
              
              <p className="text-lg text-gray-800 mb-8 leading-relaxed">
                By continuing to use our services, you acknowledge that you have read, understood, 
                and agree to all terms and conditions outlined on this page. These terms are designed 
                to protect both SLMA and our community members while promoting our shared mission 
                of service and development.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200">
                  <div className="text-emerald-700 font-bold text-sm mb-2">MEMBER PROTECTION</div>
                  <p className="text-sm text-gray-700">Secure and transparent terms for all users</p>
                </div>
                <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200">
                  <div className="text-blue-700 font-bold text-sm mb-2">COMMUNITY FOCUS</div>
                  <p className="text-sm text-gray-700">Terms designed for our community's growth</p>
                </div>
                <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200">
                  <div className="text-amber-700 font-bold text-sm mb-2">LEGAL CLARITY</div>
                  <p className="text-sm text-gray-700">Clear and comprehensive guidelines</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

  

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        
        .bg-grid-gray-200\/50 {
          background-image: 
            linear-gradient(to right, rgba(209, 213, 219, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(209, 213, 219, 0.5) 1px, transparent 1px);
        }
        
        .card-glow {
          box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            inset 0 0 20px rgba(255, 255, 255, 0.1);
        }
        
        .gradient-border {
          position: relative;
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(135deg, #3b82f6, #10b981) border-box;
          border: 2px solid transparent;
        }
        
        /* Print styles */
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