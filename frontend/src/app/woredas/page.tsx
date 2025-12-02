'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Users, 
  Home, 
  Building, 
  Calendar, 
  Search, 
  ArrowRight,
  Globe,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  Heart
} from 'lucide-react';

export default function WoredasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const woredas = [
    { 
      name: 'Worabe', 
      slug: 'worabe', 
      description: 'Capital city and administrative center of Silte Zone',
      type: 'urban',
      population: '85,000',
      established: '2000',
      communities: 8,
      area: '250 km²'
    },
    { 
      name: 'Hulbarag', 
      slug: 'hulbarag', 
      description: 'Agricultural woreda known for coffee and cereal production',
      type: 'rural',
      population: '120,000',
      established: '1995',
      communities: 12,
      area: '480 km²'
    },
    { 
      name: 'Sankura', 
      slug: 'sankura', 
      description: 'Historic woreda with rich cultural heritage sites',
      type: 'rural',
      population: '95,000',
      established: '1992',
      communities: 10,
      area: '320 km²'
    },
    { 
      name: 'Alicho', 
      slug: 'alicho', 
      description: 'Developing woreda with growing infrastructure',
      type: 'mixed',
      population: '78,000',
      established: '2001',
      communities: 9,
      area: '290 km²'
    },
    { 
      name: 'Silti', 
      slug: 'silti', 
      description: 'Cultural heartland with traditional practices',
      type: 'rural',
      population: '110,000',
      established: '1993',
      communities: 11,
      area: '420 km²'
    },
    { 
      name: 'Dalocha', 
      slug: 'dalocha', 
      description: 'Market town and commercial hub',
      type: 'urban',
      population: '65,000',
      established: '1998',
      communities: 7,
      area: '180 km²'
    },
    { 
      name: 'Lanforo', 
      slug: 'lanforo', 
      description: 'Highland woreda with livestock farming',
      type: 'rural',
      population: '82,000',
      established: '1994',
      communities: 8,
      area: '350 km²'
    },
    { 
      name: 'East Azernet Berbere', 
      slug: 'east-azernet-berbere', 
      description: 'Border woreda with diverse ethnic communities',
      type: 'mixed',
      population: '105,000',
      established: '1996',
      communities: 13,
      area: '520 km²'
    },
    { 
      name: 'West Azernet Berbere', 
      slug: 'west-azernet-berbere', 
      description: 'Woreda with significant historical landmarks',
      type: 'rural',
      population: '92,000',
      established: '1997',
      communities: 10,
      area: '410 km²'
    },
  ];

  const zoneInfo = {
    name: "Silte Zone",
    established: "2000",
    population: "900,000+",
    area: "3,500 km²",
    woredasCount: 9,
    language: "Silt'e (ስልጥኘ)",
    capital: "Worabe",
    region: "Southern Nations, Nationalities, and Peoples' Region (SNNPR)"
  };

  const featuredWoreda = {
    name: "Worabe",
    description: "As the capital and largest city of Silte Zone, Worabe serves as the economic, cultural, and administrative center. It's home to government institutions, educational facilities, and vibrant markets.",
    stats: {
      growth: "8.5%",
      projects: 15,
      members: "2,500+"
    }
  };

  const filteredWoredas = woredas.filter(woreda => {
    const matchesSearch = woreda.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         woreda.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || woreda.type === selectedType;
    return matchesSearch && matchesType;
  });

  const woredaTypes = [
    { id: 'all', label: 'All Woredas' },
    { id: 'urban', label: 'Urban' },
    { id: 'rural', label: 'Rural' },
    { id: 'mixed', label: 'Mixed' }
  ];

  return (
    <div className="woredas-page">
      <div className="woredas-container">
        {/* Header */}
        <div className="woredas-header">
          <h1 className="woredas-title">Silte Woredas & Communities</h1>
          <p className="woredas-subtitle">
            Explore the diverse communities across all nine woredas of Silte Zone. 
            Each woreda has its unique character, culture, and contributions to our shared heritage.
          </p>
          <p className="woredas-tagline">
            United in diversity, rooted in culture.
          </p>
        </div>

        {/* Zone Map Preview */}
        <div className="zone-map">
          <h2 className="map-title">Silte Zone Overview</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <Globe className="map-placeholder-icon" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Silte Zone Map
              </h3>
              <p>Interactive map showing all woredas</p>
            </div>
          </div>
          <div className="map-stats">
            <div className="map-stat">
              <div className="stat-number">{zoneInfo.woredasCount}</div>
              <div className="stat-label">Woredas</div>
            </div>
            <div className="map-stat">
              <div className="stat-number">{zoneInfo.population}</div>
              <div className="stat-label">Population</div>
            </div>
            <div className="map-stat">
              <div className="stat-number">{zoneInfo.area}</div>
              <div className="stat-label">Total Area</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="woredas-search">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search woredas by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Woreda Type Filter */}
        <div className="woredas-filter">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {woredaTypes.map(type => (
              <button
                key={type.id}
                className={`filter-button ${selectedType === type.id ? 'active' : ''}`}
                onClick={() => setSelectedType(type.id)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Woredas Grid */}
        {filteredWoredas.length > 0 ? (
          <div className="woredas-grid">
            {filteredWoredas.map((woreda) => (
              <Link
                key={woreda.slug}
                href={`/woredas/${woreda.slug}`}
                className="woreda-card"
              >
                <div className="woreda-header">
                  <h3 className="woreda-name">{woreda.name}</h3>
                  <span className={`woreda-type type-${woreda.type}`}>
                    {woreda.type.charAt(0).toUpperCase() + woreda.type.slice(1)}
                  </span>
                </div>
                
                <p className="woreda-description">{woreda.description}</p>
                
                <div className="woreda-stats">
                  <div className="woreda-stat">
                    <Users className="stat-icon" />
                    <span>{woreda.population}</span>
                  </div>
                  <div className="woreda-stat">
                    <Home className="stat-icon" />
                    <span>{woreda.communities} communities</span>
                  </div>
                  <div className="woreda-stat">
                    <Building className="stat-icon" />
                    <span>{woreda.area}</span>
                  </div>
                </div>

                <div className="explore-link">
                  <span className="explore-text">Explore community</span>
                  <ArrowRight className="explore-arrow" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <Search className="no-results-icon" />
            <h3 className="no-results-title">No woredas found</h3>
            <p className="no-results-description">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
              }}
              className="cta-button secondary"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Featured Woreda */}
        <div className="featured-woredas">
          <div className="featured-header">
            <h2 className="featured-title">Featured Woreda</h2>
            <p className="featured-subtitle">Learn about our administrative and cultural center</p>
          </div>

          <div className="featured-card">
            <div className="featured-content">
              <h3>{featuredWoreda.name}</h3>
              <p>{featuredWoreda.description}</p>
              
              <div className="featured-stats">
                <div className="featured-stat">
                  <div className="featured-stat-number">{featuredWoreda.stats.growth}</div>
                  <div className="featured-stat-label">Annual Growth</div>
                </div>
                <div className="featured-stat">
                  <div className="featured-stat-number">{featuredWoreda.stats.projects}</div>
                  <div className="featured-stat-label">Active Projects</div>
                </div>
                <div className="featured-stat">
                  <div className="featured-stat-number">{featuredWoreda.stats.members}</div>
                  <div className="featured-stat-label">SLMA Members</div>
                </div>
              </div>

              <Link href="/woredas/worabe" className="cta-button primary" style={{ marginTop: '1rem' }}>
                Explore Worabe
              </Link>
            </div>
            
            <div className="featured-image">
              <Award className="featured-image-icon" />
            </div>
          </div>
        </div>

        {/* Zone Information */}
        <div className="zone-info">
          <div className="zone-info-header">
            <MapPin className="zone-info-icon" />
            <h2 className="zone-info-title">About Silte Zone</h2>
          </div>
          
          <div className="zone-info-content">
            <div className="info-item">
              <Target className="info-icon" />
              <div className="info-text">
                <h4>Location & Geography</h4>
                <p>Located in the SNNPR region, Silte Zone covers approximately {zoneInfo.area} with diverse landscapes from highlands to lowlands.</p>
              </div>
            </div>
            
            <div className="info-item">
              <Users className="info-icon" />
              <div className="info-text">
                <h4>Population & Culture</h4>
                <p>Home to over {zoneInfo.population} people who primarily speak {zoneInfo.language} and maintain rich cultural traditions.</p>
              </div>
            </div>
            
            <div className="info-item">
              <Building className="info-icon" />
              <div className="info-text">
                <h4>Administration</h4>
                <p>Established in {zoneInfo.established} with {zoneInfo.woredasCount} woredas. The zone capital is {zoneInfo.capital}.</p>
              </div>
            </div>
            
            <div className="info-item">
              <TrendingUp className="info-icon" />
              <div className="info-text">
                <h4>Development</h4>
                <p>Rapid development in agriculture, education, and infrastructure across all woredas with community-led initiatives.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="woredas-cta">
          <h2 className="cta-title">Connect with Your Community</h2>
          <p className="cta-description">
            Find your woreda community, connect with local members, and participate in 
            woreda-specific events and projects.
          </p>
          
          <div className="cta-buttons">
            <Link href="/membership" className="cta-button primary">
              Join Your Woreda Group
            </Link>
            <Link href="/events" className="cta-button secondary">
              View Woreda Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}