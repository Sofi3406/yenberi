export default function AboutSiltePage() {
  return (
    <div className="about-silte-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">About Silte People</h1>
          <p className="hero-subtitle">Preserving the rich heritage and culture of the Silte community</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container">
        <div className="content-grid">
          {/* Left Column - Main Content */}
          <div className="main-content">
            {/* Introduction */}
            <section className="content-section">
              <h2 className="section-title">Who Are the Silte People?</h2>
              <p className="paragraph">
                The Silte people are an ethnic group native to the Silte Zone in the Southern Nations, 
                Nationalities, and Peoples' Region (SNNPR) of Ethiopia. They are part of the larger 
                Gurage cluster but maintain distinct cultural, linguistic, and historical identities.
              </p>
              
              <div className="highlight-box">
                <p className="highlight-text">
                  The name "Silte" comes from the traditional administrative system where the community 
                  was organized into seven clans or houses, each with its own unique role and responsibility.
                </p>
              </div>
            </section>

            {/* History */}
            <section className="content-section">
              <h2 className="section-title">Historical Background</h2>
              
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-year">Pre-19th Century</div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">Early Settlement</h3>
                    <p>
                      The Silte people historically inhabited the fertile highlands of what is now 
                      the Silte Zone, known for its agricultural productivity and strategic location 
                      along trade routes.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-year">19th Century</div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">Resistance and Autonomy</h3>
                    <p>
                      During the expansion of the Ethiopian Empire under Emperor Menelik II, 
                      the Silte people fiercely defended their territory and autonomy, 
                      maintaining much of their traditional governance structures.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-year">1974</div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">Administrative Recognition</h3>
                    <p>
                      Following the Ethiopian Revolution, the Silte Zone was officially established 
                      as part of administrative reforms that recognized ethnic and linguistic diversity.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-year">2001</div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">Constitutional Recognition</h3>
                    <p>
                      The Silte people gained constitutional recognition as a distinct ethnic group, 
                      separate from the larger Gurage classification, affirming their unique identity.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Culture */}
            <section className="content-section">
              <h2 className="section-title">Cultural Heritage</h2>
              
              <div className="culture-grid">
                <div className="culture-card">
                  <div className="culture-icon">🗣️</div>
                  <h3 className="culture-title">Language</h3>
                  <p className="culture-description">
                    The Silte language (Silt'e) is part of the Semitic branch of Afro-Asiatic languages, 
                    with unique phonological and grammatical features distinct from neighboring languages.
                  </p>
                </div>

                <div className="culture-card">
                  <div className="culture-icon">🎭</div>
                  <h3 className="culture-title">Traditional Arts</h3>
                  <p className="culture-description">
                    Rich tradition of music, dance (like the "Shilta"), weaving, pottery, and 
                    metalworking that reflect the community's creativity and craftsmanship.
                  </p>
                </div>

                <div className="culture-card">
                  <div className="culture-icon">🍲</div>
                  <h3 className="culture-title">Cuisine</h3>
                  <p className="culture-description">
                    Known for dishes like "Kotcho" (false banana bread), "Kitfo" (minced raw meat), 
                    and various fermented foods that are central to social gatherings.
                  </p>
                </div>

                <div className="culture-card">
                  <div className="culture-icon">🏛️</div>
                  <h3 className="culture-title">Architecture</h3>
                  <p className="culture-description">
                    Traditional round houses (tukuls) with conical thatched roofs, and modern 
                    adaptations that maintain cultural aesthetics while using contemporary materials.
                  </p>
                </div>
              </div>
            </section>

            {/* Geography */}
            <section className="content-section">
              <h2 className="section-title">Geography & Demographics</h2>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">~1.2 Million</div>
                  <div className="stat-label">Total Population</div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-number">9 Woredas</div>
                  <div className="stat-label">Administrative Districts</div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-number">2,500 km²</div>
                  <div className="stat-label">Total Area</div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-number">1,800-2,800m</div>
                  <div className="stat-label">Elevation Range</div>
                </div>
              </div>

              <p className="paragraph">
                The Silte Zone is characterized by diverse topography including highland plateaus, 
                valleys, and mountainous areas. The climate varies from temperate in the highlands 
                to subtropical in lower elevations, supporting diverse agricultural activities.
              </p>
            </section>

            {/* Economy */}
            <section className="content-section">
              <h2 className="section-title">Economy & Livelihood</h2>
              
              <div className="economy-list">
                <div className="economy-item">
                  <h3 className="economy-title">Agriculture</h3>
                  <p>
                    Primary economic activity with cultivation of enset (false banana), coffee, 
                    teff, maize, and various vegetables. Enset is particularly important as a 
                    drought-resistant staple crop.
                  </p>
                </div>

                <div className="economy-item">
                  <h3 className="economy-title">Trade & Commerce</h3>
                  <p>
                    Strategic location along major transport routes has made Silte people 
                    renowned traders, with significant diaspora communities involved in 
                    national and international commerce.
                  </p>
                </div>

                <div className="economy-item">
                  <h3 className="economy-title">Handicrafts</h3>
                  <p>
                    Traditional weaving (especially of cotton and wool), pottery, basketry, 
                    and metalwork provide additional income and preserve cultural traditions.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="sidebar">
            {/* Quick Facts */}
            <div className="sidebar-card">
              <h3 className="sidebar-title">Quick Facts</h3>
              <ul className="facts-list">
                <li className="fact-item">
                  <span className="fact-label">Region:</span>
                  <span className="fact-value">SNNPR, Ethiopia</span>
                </li>
                <li className="fact-item">
                  <span className="fact-label">Capital:</span>
                  <span className="fact-value">Worabe</span>
                </li>
                <li className="fact-item">
                  <span className="fact-label">Language:</span>
                  <span className="fact-value">Silt'e (እንግሊዝኛ)</span>
                </li>
                <li className="fact-item">
                  <span className="fact-label">Religion:</span>
                  <span className="fact-value">Islam, Christianity</span>
                </li>
                <li className="fact-item">
                  <span className="fact-label">Time Zone:</span>
                  <span className="fact-value">EAT (UTC+3)</span>
                </li>
                <li className="fact-item">
                  <span className="fact-label">Major Cities:</span>
                  <span className="fact-value">Worabe, Sankura, Alicho</span>
                </li>
              </ul>
            </div>

            {/* Woredas List */}
            <div className="sidebar-card">
              <h3 className="sidebar-title">Silte Woredas</h3>
              <ul className="woredas-list">
                <li className="woreda-item">Worabe (Capital)</li>
                <li className="woreda-item">Hulbarag</li>
                <li className="woreda-item">Sankura</li>
                <li className="woreda-item">Alicho</li>
                <li className="woreda-item">Silti</li>
                <li className="woreda-item">Dalocha</li>
                <li className="woreda-item">Lanforo</li>
                <li className="woreda-item">East Azernet Berbere</li>
                <li className="woreda-item">West Azernet Berbere</li>
              </ul>
            </div>

            {/* Cultural Symbols */}
            <div className="sidebar-card">
              <h3 className="sidebar-title">Cultural Symbols</h3>
              <div className="symbols-grid">
                <div className="symbol-item">
                  <div className="symbol-icon">⚫</div>
                  <div className="symbol-name">Enset Tree</div>
                </div>
                <div className="symbol-item">
                  <div className="symbol-icon">⚫</div>
                  <div className="symbol-name">Coffee Plant</div>
                </div>
                <div className="symbol-item">
                  <div className="symbol-icon">⚫</div>
                  <div className="symbol-name">Traditional Weaving</div>
                </div>
                <div className="symbol-item">
                  <div className="symbol-icon">⚫</div>
                  <div className="symbol-name">Round House (Tukul)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container text-center">
          <h2 className="cta-title">Preserve Our Heritage</h2>
          <p className="cta-description">
            Join the Silte Ləmat Mehber in our mission to document, preserve, and celebrate 
            the rich cultural heritage of the Silte people for future generations.
          </p>
          <div className="cta-buttons">
            <a href="/membership" className="btn btn-primary">Become a Member</a>
            <a href="/donate" className="btn btn-outline">Support Our Work</a>
          </div>
        </div>
      </section>
    </div>
  );
}