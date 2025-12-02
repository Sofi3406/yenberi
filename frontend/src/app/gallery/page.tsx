'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Filter, 
  Camera, 
  Video, 
  Image, 
  Users, 
  MapPin, 
  Calendar,
  Heart,
  MessageCircle,
  Upload,
  ChevronLeft,
  ChevronRight,
  Play,
  Eye,
  Download,
  Share2
} from 'lucide-react';

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryCategories = [
    { id: 'all', label: 'All Media' },
    { id: 'cultural', label: 'Cultural Events' },
    { id: 'community', label: 'Community Life' },
    { id: 'heritage', label: 'Heritage Sites' },
    { id: 'people', label: 'People & Portraits' },
    { id: 'landscape', label: 'Landscapes' },
  ];

  const mediaTypes = [
    {
      name: 'Photos',
      count: '1,245',
      icon: <Camera className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'Videos',
      count: '86',
      icon: <Video className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Albums',
      count: '24',
      icon: <Image className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      name: 'Collections',
      count: '12',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-amber-100 text-amber-600'
    }
  ];

  const galleryItems = [
    {
      id: 1,
      title: 'Cultural Festival 2024',
      description: 'Traditional music and dance performances',
      type: 'photo',
      category: 'cultural',
      likes: 245,
      comments: 42,
      views: 1250,
      date: 'Dec 15, 2024',
      location: 'Worabe Stadium',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=400'
    },
    {
      id: 2,
      title: 'Traditional Wedding',
      description: 'Silte wedding ceremony in Hulbarag',
      type: 'photo',
      category: 'cultural',
      likes: 189,
      comments: 28,
      views: 980,
      date: 'Nov 8, 2024',
      location: 'Hulbarag Woreda',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400'
    },
    {
      id: 3,
      title: 'Harvest Celebration',
      description: 'Community harvest festival in Sankura',
      type: 'video',
      category: 'community',
      likes: 312,
      comments: 56,
      views: 2100,
      date: 'Oct 20, 2024',
      location: 'Sankura Woreda',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400'
    },
    {
      id: 4,
      title: 'Silte Heritage Site',
      description: 'Ancient rock-hewn churches of Silte',
      type: 'photo',
      category: 'heritage',
      likes: 421,
      comments: 65,
      views: 1850,
      date: 'Sep 5, 2024',
      location: 'Alicho Woreda',
      image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=400'
    },
    {
      id: 5,
      title: 'Youth Sports Day',
      description: 'Traditional games and sports competition',
      type: 'album',
      category: 'community',
      likes: 178,
      comments: 34,
      views: 1100,
      date: 'Aug 12, 2024',
      location: 'Sports Field',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400'
    },
    {
      id: 6,
      title: 'Market Day',
      description: 'Vibrant local market in Dalocha',
      type: 'photo',
      category: 'people',
      likes: 256,
      comments: 41,
      views: 1350,
      date: 'Jul 18, 2024',
      location: 'Dalocha Market',
      image: 'https://images.unsplash.com/photo-1556909114-6b5a5b5b5b5b?auto=format&fit=crop&w=400'
    },
    {
      id: 7,
      title: 'Silte Mountains',
      description: 'Beautiful landscapes of Silte highlands',
      type: 'photo',
      category: 'landscape',
      likes: 389,
      comments: 52,
      views: 1650,
      date: 'Jun 22, 2024',
      location: 'Lanforo Highlands',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400'
    },
    {
      id: 8,
      title: 'Language Workshop',
      description: 'Teaching Silte language to children',
      type: 'video',
      category: 'cultural',
      likes: 234,
      comments: 38,
      views: 1250,
      date: 'May 15, 2024',
      location: 'Community Center',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400'
    },
  ];

  const videos = [
    {
      id: 1,
      title: 'Silte Cultural Festival Highlights',
      duration: '4:32',
      views: '2.5K',
      date: '2 weeks ago',
      thumbnail: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=400'
    },
    {
      id: 2,
      title: 'Traditional Silte Music',
      duration: '6:15',
      views: '1.8K',
      date: '1 month ago',
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400'
    },
    {
      id: 3,
      title: 'Silte Heritage Tour',
      duration: '8:42',
      views: '3.2K',
      date: '2 months ago',
      thumbnail: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=400'
    }
  ];

  const galleryStats = [
    { number: '1,245', label: 'Photos' },
    { number: '86', label: 'Videos' },
    { number: '24', label: 'Albums' },
    { number: '4,892', label: 'Total Views' }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const openLightbox = (item) => {
    setSelectedImage(item);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="gallery-page">
      <div className="gallery-container">
        {/* Header */}
        <div className="gallery-header">
          <h1 className="gallery-title">SLMA Gallery</h1>
          <p className="gallery-subtitle">
            Explore our collection of photos and videos capturing the rich culture, 
            vibrant community life, and beautiful landscapes of Silte people.
          </p>
          <p className="gallery-tagline">
            Preserving moments, celebrating heritage.
          </p>
        </div>

        {/* Gallery Stats */}
        <div className="gallery-stats">
          {galleryStats.map((stat, index) => (
            <div key={index} className="gallery-stat">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Media Categories */}
        <div className="gallery-categories">
          <h2 className="categories-title">Browse by Category</h2>
          <div className="categories-grid">
            {mediaTypes.map((type, index) => (
              <Link 
                key={index}
                href={`/gallery/${type.name.toLowerCase()}`}
                className="category-card"
              >
                <div className="category-icon">
                  {type.icon}
                </div>
                <h3 className="category-name">{type.name}</h3>
                <div className="category-count">{type.count}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Gallery */}
        <div className="featured-gallery">
          <div className="featured-header">
            <h2 className="featured-title">Featured Collection</h2>
            <p className="featured-subtitle">Cultural Festival 2024 - A celebration of Silte heritage</p>
          </div>

          <div className="featured-slider">
            <div 
              className="featured-image"
              style={{
                backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            <div className="featured-content">
              <span className="featured-badge">Featured Album</span>
              <h3 className="featured-item-title">Cultural Festival 2024</h3>
              <p className="featured-description">
                Experience the vibrant colors, music, and traditions of our annual cultural festival. 
                Photos from all nine woredas showcasing our shared heritage.
              </p>
              
              <div className="featured-stats">
                <div className="featured-stat">
                  <Calendar className="stat-icon" />
                  <span className="stat-value">Dec 15-17, 2024</span>
                </div>
                <div className="featured-stat">
                  <MapPin className="stat-icon" />
                  <span className="stat-value">Worabe Stadium</span>
                </div>
                <div className="featured-stat">
                  <Users className="stat-icon" />
                  <span className="stat-value">1,500+ Attendees</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="cta-button primary">
                  View Album
                </button>
                <button className="cta-button secondary" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                  Download Photos
                </button>
              </div>
            </div>

            <div className="slider-controls">
              <button className="slider-button">
                <ChevronLeft className="slider-icon" />
              </button>
              <button className="slider-button">
                <ChevronRight className="slider-icon" />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Filters */}
        <div className="gallery-filters">
          <Filter className="w-5 h-5" />
          {galleryCategories.map(category => (
            <button
              key={category.id}
              className={`filter-button ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="gallery-grid">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="gallery-item"
                onClick={() => openLightbox(item)}
              >
                <div className={`media-badge badge-${item.type}`}>
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </div>
                
                <div className="gallery-image-container">
                  <div 
                    className="gallery-image"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <h4 className="overlay-title">{item.title}</h4>
                      <p className="overlay-description">{item.description}</p>
                    </div>
                  </div>
                </div>

                <div className="image-overlay" style={{ opacity: 1, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                  <div className="overlay-content" style={{ transform: 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <div>
                        <h4 className="overlay-title">{item.title}</h4>
                        <p className="overlay-description">{item.description}</p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Heart className="w-3 h-3" />
                        <span>{item.likes}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MessageCircle className="w-3 h-3" />
                        <span>{item.comments}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Eye className="w-3 h-3" />
                        <span>{item.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-media">
            <Camera className="no-media-icon" />
            <h3 className="no-media-title">No Media Found</h3>
            <p className="no-media-description">
              Try selecting a different category or check back soon for new uploads.
            </p>
            <button 
              onClick={() => setActiveFilter('all')}
              className="cta-button secondary"
            >
              View All Media
            </button>
          </div>
        )}

        {/* Video Gallery */}
        <div className="video-gallery">
          <div className="video-header">
            <h2 className="video-title">Featured Videos</h2>
            <p className="video-subtitle">Watch highlights from our cultural events and community activities</p>
          </div>

          <div className="video-grid">
            {videos.map((video) => (
              <div key={video.id} className="video-item">
                <div className="video-container">
                  <div 
                    className="video-thumbnail"
                    style={{
                      backgroundImage: `url(${video.thumbnail})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <button className="play-button">
                    <Play className="play-icon" />
                  </button>
                </div>
                <div className="video-content">
                  <h4 className="video-title-small">{video.title}</h4>
                  <div className="video-meta">
                    <span>{video.duration}</span>
                    <span>{video.views} views</span>
                    <span>{video.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Section */}
        <div className="upload-section">
          <h2 className="upload-title">Share Your Memories</h2>
          <p className="upload-description">
            Have photos or videos from Silte community events? Share them with our community 
            and help preserve our collective memories for future generations.
          </p>
          
          <button className="upload-button">
            <Upload className="w-5 h-5" />
            Upload Media
          </button>
        </div>

        {/* CTA Section */}
        <div className="gallery-cta">
          <h2 className="cta-title">Explore More</h2>
          <p className="cta-description">
            Dive deeper into our collections and discover the stories behind each photo and video.
          </p>
          
          <div className="cta-buttons">
            <Link href="/gallery/collections" className="cta-button primary">
              View Collections
            </Link>
            <Link href="/events" className="cta-button secondary">
              Upcoming Photo Ops
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}