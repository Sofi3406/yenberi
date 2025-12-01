import React from 'react';

// SLMA Co-founders Data
const slmaCoFounders = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'CEO & Medical Director',
    expertise: 'Emergency Medicine & AI Healthcare',
    currentActivity: 'Overseeing clinical validation of SLMA\'s diagnostic algorithms',
    background: '15+ years in emergency medicine, former Chief Resident at Mayo Clinic, PhD in Biomedical Informatics',
    slmaContribution: 'Led the development of SLMA\'s core medical reasoning engine',
    funFact: 'Has treated patients on 3 different continents',
    availability: 'busy'
  },
  {
    name: 'Raj Patel',
    role: 'CTO & AI Lead',
    expertise: 'Machine Learning & Healthcare Systems',
    currentActivity: 'Optimizing SLMA\'s neural networks for faster triage predictions',
    background: 'Former Google Health AI team lead, MS in Computer Science from MIT',
    slmaContribution: 'Architected SLMA\'s real-time symptom analysis platform',
    funFact: 'Built his first medical database at age 16 for his father\'s clinic',
    availability: 'available'
  },
  {
    name: 'Dr. Elena Rodriguez',
    role: 'Chief Medical Officer',
    expertise: 'Public Health & Preventive Medicine',
    currentActivity: 'Expanding SLMA\'s protocols for rural healthcare accessibility',
    background: 'WHO consultant, former Public Health Director for Latin America region',
    slmaContribution: 'Developed SLMA\'s community health integration framework',
    funFact: 'Speaks 5 languages fluently',
    availability: 'in-meeting'
  },
  {
    name: 'Marcus Johnson',
    role: 'COO & Head of Partnerships',
    expertise: 'Healthcare Operations & Business Strategy',
    currentActivity: 'Finalizing SLMA\'s partnership with major hospital networks',
    background: 'Ex-McKinsey healthcare practice, MBA from Harvard Business School',
    slmaContribution: 'Scaled SLMA from pilot to 50+ healthcare facilities',
    funFact: 'Marathon runner who organizes charity runs for medical equipment',
    availability: 'traveling'
  }
];

// Helper functions
const getAvailabilityText = (status) => {
  switch(status) {
    case 'available': return 'Available for Consult';
    case 'busy': return 'In Clinical Review';
    case 'in-meeting': return 'In Strategy Session';
    case 'traveling': return 'Visiting Partners';
    default: return 'Unavailable';
  }
};

const getAvailabilityClass = (status) => {
  switch(status) {
    case 'available': return 'slma-availability slma-availability-available';
    case 'busy': return 'slma-availability slma-availability-busy';
    case 'in-meeting': return 'slma-availability slma-availability-in-meeting';
    case 'traveling': return 'slma-availability slma-availability-traveling';
    default: return 'slma-availability';
  }
};

export default function SLMACoFoundersPage() {
  return (
    <div className="slma-cofounders-page">
      <div className="slma-container">
        {/* Header */}
        <div className="slma-header">
          <div className="slma-logo-container">
            <div className="slma-logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="slma-title">SLMA <span>Leadership</span></h1>
          </div>
          
          <p className="slma-subtitle">
            The pioneering team behind <span>Smart Learning Medical Assistant</span>, 
            revolutionizing emergency triage and medical decision support through AI.
          </p>
          
          {/* Stats Grid */}
          <div className="slma-stats-grid">
            <div className="slma-stat-card">
              <div className="slma-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="slma-stat-value">500K+</div>
              <div className="slma-stat-label">Lives Impacted</div>
            </div>
            
            <div className="slma-stat-card">
              <div className="slma-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <div className="slma-stat-value">98.7%</div>
              <div className="slma-stat-label">Accuracy Rate</div>
            </div>
            
            <div className="slma-stat-card">
              <div className="slma-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="slma-stat-value">&lt; 30s</div>
              <div className="slma-stat-label">Response Time</div>
            </div>
            
            <div className="slma-stat-card">
              <div className="slma-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="slma-stat-value">75+</div>
              <div className="slma-stat-label">Healthcare Partners</div>
            </div>
            
            <div className="slma-stat-card">
              <div className="slma-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </div>
              <div className="slma-stat-value">12</div>
              <div className="slma-stat-label">Countries Served</div>
            </div>
            
            <div className="slma-stat-card">
              <div className="slma-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="slma-stat-value">2,500+</div>
              <div className="slma-stat-label">Medical Protocols</div>
            </div>
          </div>
        </div>

        {/* Co-founders Grid */}
        <div className="slma-cofounders-grid">
          {slmaCoFounders.map((founder, index) => (
            <div key={index} className="slma-founder-card">
              <div className="slma-medical-banner">
                <div className="slma-founder-header">
                  <div>
                    <h2 className="slma-founder-name">{founder.name}</h2>
                    <p className="slma-founder-role">{founder.role}</p>
                  </div>
                  <div className={getAvailabilityClass(founder.availability)}>
                    {getAvailabilityText(founder.availability)}
                  </div>
                </div>
              </div>
              
              <div className="slma-card-content">
                <div className="slma-expertise-badge">{founder.expertise}</div>
                
                <div className="slma-activity">
                  <h3 className="slma-activity-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Current SLMA Focus
                  </h3>
                  <p className="slma-activity-text">{founder.currentActivity}</p>
                </div>
                
                <div className="slma-background-section">
                  <h3 className="slma-section-title">Medical & Professional Background</h3>
                  <p className="slma-background-text">{founder.background}</p>
                </div>
                
                <div className="slma-contribution">
                  <h3 className="slma-contribution-title">Key SLMA Contribution</h3>
                  <p className="slma-contribution-text">{founder.slmaContribution}</p>
                </div>
                
                <div className="slma-fun-fact">
                  <div className="slma-fun-fact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="slma-fun-fact-content">
                    <h3>Beyond Medicine</h3>
                    <p className="slma-fun-fact-text">{founder.funFact}</p>
                  </div>
                </div>
                
                <div className="slma-action-buttons">
                  <button className="slma-primary-button">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Schedule Clinical Review
                  </button>
                  <button className="slma-secondary-button">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="slma-mission">
          <div className="slma-mission-content">
            <div className="slma-mission-inner">
              <div className="slma-mission-header">
                <div className="slma-mission-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="slma-mission-title">The SLMA Mission</h2>
              </div>
              
              <div className="slma-mission-grid">
                <div>
                  <p className="slma-mission-text">
                    We founded SLMA to bridge the gap between emergency medical needs and 
                    immediate expert guidance. Our AI-powered platform provides real-time 
                    diagnostic support, reducing critical decision time from hours to seconds.
                  </p>
                  <div className="slma-principles">
                    <h3 className="slma-principles-title">Core Principles</h3>
                    <ul className="slma-principles-list">
                      <li>
                        <div className="slma-principles-bullet"></div>
                        Evidence-based medical protocols
                      </li>
                      <li>
                        <div className="slma-principles-bullet"></div>
                        HIPAA-compliant data security
                      </li>
                      <li>
                        <div className="slma-principles-bullet"></div>
                        Continuous learning from global medical cases
                      </li>
                      <li>
                        <div className="slma-principles-bullet"></div>
                        Accessible in low-resource settings
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <div className="slma-join-mission">
                    <h3 className="slma-join-title">Join Our Mission</h3>
                    <p className="slma-join-text">
                      We're expanding our medical advisory board and partnering with 
                      healthcare institutions worldwide.
                    </p>
                    <div className="slma-join-buttons">
                      <button className="slma-join-primary">Partner with SLMA</button>
                      <button className="slma-join-secondary">Medical Professional Inquiry</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}