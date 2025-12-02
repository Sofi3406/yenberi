'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Target, 
  Calendar, 
  MapPin, 
  Heart, 
  TrendingUp,
  ChevronRight,
  BookOpen,
  Globe,
  Award,
  Zap,
  Filter,
  Eye,
  Download
} from 'lucide-react';

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const projectCategories = [
    { id: 'all', label: 'All Projects' },
    { id: 'culture', label: 'Cultural Preservation' },
    { id: 'education', label: 'Education' },
    { id: 'community', label: 'Community Development' },
    { id: 'youth', label: 'Youth Empowerment' },
    { id: 'heritage', label: 'Heritage Conservation' },
  ];

  const projects = [
    {
      id: 1,
      title: "Silte Language Digital Archive",
      description: "Creating a comprehensive digital archive of Silte language materials including audio recordings, texts, and educational resources for future generations.",
      category: "culture",
      status: "active",
      location: "Worabe, SNNPR",
      timeline: "2023-2025",
      participants: 45,
      progress: 65,
      impact: "Language preservation",
      imageColor: "bg-blue-100",
      icon: <BookOpen className="w-6 h-6 text-blue-600" />
    },
    {
      id: 2,
      title: "Youth Leadership Program",
      description: "Training program for young Silte community members to develop leadership skills and prepare for community service roles.",
      category: "youth",
      status: "active",
      location: "Multiple Woredas",
      timeline: "2024 Ongoing",
      participants: 120,
      progress: 40,
      impact: "Youth empowerment",
      imageColor: "bg-green-100",
      icon: <Target className="w-6 h-6 text-green-600" />
    },
    {
      id: 3,
      title: "Silte Heritage Museum",
      description: "Establishing a community museum to showcase Silte cultural artifacts, traditional clothing, and historical documents.",
      category: "heritage",
      status: "upcoming",
      location: "Worabe Town",
      timeline: "2025-2026",
      participants: 0,
      progress: 10,
      impact: "Cultural tourism",
      imageColor: "bg-purple-100",
      icon: <Award className="w-6 h-6 text-purple-600" />
    },
    {
      id: 4,
      title: "Agricultural Modernization",
      description: "Introducing modern farming techniques and sustainable agriculture practices to Silte farming communities.",
      category: "community",
      status: "completed",
      location: "Rural Woredas",
      timeline: "2022-2023",
      participants: 300,
      progress: 100,
      impact: "Economic growth",
      imageColor: "bg-amber-100",
      icon: <TrendingUp className="w-6 h-6 text-amber-600" />
    },
    {
      id: 5,
      title: "Digital Skills Training",
      description: "Providing digital literacy and technology skills training to community members, focusing on youth and women.",
      category: "education",
      status: "active",
      location: "Community Centers",
      timeline: "2024 Ongoing",
      participants: 85,
      progress: 75,
      impact: "Digital inclusion",
      imageColor: "bg-indigo-100",
      icon: <Zap className="w-6 h-6 text-indigo-600" />
    },
    {
      id: 6,
      title: "Diaspora Connection Program",
      description: "Building bridges between Silte communities in Ethiopia and diaspora members worldwide through digital platforms and events.",
      category: "community",
      status: "active",
      location: "Global",
      timeline: "2023-2024",
      participants: 500,
      progress: 90,
      impact: "Global networking",
      imageColor: "bg-cyan-100",
      icon: <Globe className="w-6 h-6 text-cyan-600" />
    },
  ];

  const featuredProject = {
    id: 7,
    title: "Silte Cultural Festival 2024",
    description: "Annual celebration of Silte culture featuring traditional music, dance, food, and art exhibitions. Bringing together communities from all woredas to celebrate our shared heritage.",
    category: "culture",
    status: "active",
    location: "Worabe Stadium",
    timeline: "December 15-17, 2024",
    participants: 1500,
    progress: 85,
    impact: "Cultural unity",
    budget: "ETB 750,000",
    sponsors: 12,
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800"
  };

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const participationSteps = [
    {
      title: "Browse Projects",
      description: "Explore our current initiatives and find projects that match your interests and skills."
    },
    {
      title: "Register Interest",
      description: "Fill out our volunteer interest form or contact the project coordinator directly."
    },
    {
      title: "Get Trained",
      description: "Participate in orientation and training sessions specific to your chosen project."
    },
    {
      title: "Make Impact",
      description: "Contribute to meaningful community work and see your impact grow."
    }
  ];

  return (
    <div className="projects-page">
      <div className="projects-container">
        {/* Header */}
        <div className="projects-header">
          <h1 className="projects-title">Community Projects & Initiatives</h1>
          <p className="projects-subtitle">
            Discover how SLMA is making a difference through cultural preservation, education, 
            and community development projects. Each initiative brings us closer to our vision 
            of a thriving Silte community.
          </p>
          <p className="projects-tagline">
            Building our future, one project at a time.
          </p>
        </div>

        {/* Project Filters */}
        <div className="project-filters">
          <Filter className="w-5 h-5" />
          {projectCategories.map(category => (
            <button
              key={category.id}
              className={`filter-button ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-status-container">
                <span className={`project-status status-${project.status}`}>
                  {project.status}
                </span>
              </div>
              
              <div className={`project-image-container ${project.imageColor}`}>
                <div className="flex items-center justify-center h-full">
                  {project.icon}
                </div>
                <div className="project-category">
                  {projectCategories.find(c => c.id === project.category)?.label}
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-stats">
                  <div className="stat-item">
                    <MapPin className="stat-icon" />
                    <span>{project.location}</span>
                  </div>
                  <div className="stat-item">
                    <Users className="stat-icon" />
                    <span>{project.participants} participants</span>
                  </div>
                  <div className="stat-item">
                    <Calendar className="stat-icon" />
                    <span>{project.timeline}</span>
                  </div>
                </div>

                <div className="project-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">{project.progress}% complete</div>
                </div>

                <div className="project-actions">
                  <Link href={`/projects/${project.id}`} className="project-button primary">
                    <Eye className="inline w-4 h-4 mr-1" />
                    View Details
                  </Link>
                  <button className="project-button secondary">
                    <Heart className="inline w-4 h-4 mr-1" />
                    Support
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Project */}
        <div className="featured-projects">
          <div className="featured-header">
            <h2 className="featured-title">Featured Project</h2>
            <p className="featured-subtitle">Our flagship initiative making significant impact</p>
          </div>

          <div className="featured-card">
            <div className="featured-content">
              <span className="featured-badge">Flagship Initiative</span>
              <h3 className="featured-project-title">{featuredProject.title}</h3>
              <p className="featured-description">{featuredProject.description}</p>
              
              <div className="featured-stats">
                <div className="featured-stat">
                  <div className="featured-stat-number">{featuredProject.participants}+</div>
                  <div className="featured-stat-label">Expected Attendees</div>
                </div>
                <div className="featured-stat">
                  <div className="featured-stat-number">{featuredProject.budget}</div>
                  <div className="featured-stat-label">Project Budget</div>
                </div>
                <div className="featured-stat">
                  <div className="featured-stat-number">{featuredProject.sponsors}</div>
                  <div className="featured-stat-label">Sponsors</div>
                </div>
              </div>

              <div className="project-actions">
                <Link href={`/projects/${featuredProject.id}`} className="project-button primary">
                  Learn More <ChevronRight className="inline w-4 h-4 ml-1" />
                </Link>
                <button className="project-button secondary">
                  <Download className="inline w-4 h-4 mr-1" />
                  Download Prospectus
                </button>
              </div>
            </div>
            
            <div 
              className="featured-image" 
              style={{ backgroundImage: `url(${featuredProject.imageUrl})` }}
            >
              <div className="featured-overlay">
                <div className="text-white">
                  <div className="text-sm opacity-80">{featuredProject.location}</div>
                  <div className="text-lg font-semibold">{featuredProject.timeline}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Participate */}
        <div className="participation-section">
          <div className="participation-header">
            <h2 className="participation-title">Get Involved</h2>
            <p className="participation-description">
              Join us in making a difference. Here's how you can contribute to our community projects
            </p>
          </div>

          <div className="participation-steps">
            {participationSteps.map((step, index) => (
              <div key={index} className="participation-step">
                <div className="step-number"></div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="projects-cta">
          <h2 className="cta-title">Ready to Make an Impact?</h2>
          <p className="cta-description">
            Whether you want to volunteer, donate, or propose a new project, 
            your contribution helps build a stronger Silte community.
          </p>
          
          <div className="cta-buttons">
            <Link href="/volunteer" className="cta-button primary">
              Become a Volunteer
            </Link>
            <Link href="/donate" className="cta-button secondary">
              Support Our Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}