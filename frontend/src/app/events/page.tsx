'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Music,
  BookOpen,
  Target,
  Trophy,
  Heart,
  Zap
} from 'lucide-react';

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const eventCategories = [
    { id: 'all', label: 'All Events' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'educational', label: 'Educational' },
    { id: 'community', label: 'Community' },
    { id: 'sports', label: 'Sports' },
    { id: 'youth', label: 'Youth' },
  ];

  const events = [
    {
      id: 1,
      title: 'Silte Cultural Festival 2024',
      description: 'Annual celebration featuring traditional music, dance, food, and art from all Silte woredas.',
      category: 'cultural',
      status: 'upcoming',
      date: 'December 15-17, 2024',
      time: '9:00 AM - 8:00 PM',
      location: 'Worabe Stadium',
      attendees: 1500,
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=400'
    },
    {
      id: 2,
      title: 'Language Preservation Workshop',
      description: 'Hands-on workshop for documenting and teaching Silte language to younger generations.',
      category: 'educational',
      status: 'upcoming',
      date: 'November 28, 2024',
      time: '2:00 PM - 5:00 PM',
      location: 'Community Center',
      attendees: 45,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400'
    },
    {
      id: 3,
      title: 'Youth Leadership Summit',
      description: 'Empowering young Silte leaders with skills, networking, and community project opportunities.',
      category: 'youth',
      status: 'ongoing',
      date: 'October 20-22, 2024',
      time: '8:30 AM - 6:00 PM',
      location: 'Conference Hall',
      attendees: 120,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400'
    },
    {
      id: 4,
      title: 'Traditional Sports Day',
      description: 'Competitive games featuring traditional Silte sports and team-building activities.',
      category: 'sports',
      status: 'completed',
      date: 'September 8, 2024',
      time: '10:00 AM - 4:00 PM',
      location: 'Sports Field',
      attendees: 300,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400'
    },
    {
      id: 5,
      title: 'Community Health Fair',
      description: 'Free health screenings, medical consultations, and wellness education for community members.',
      category: 'community',
      status: 'upcoming',
      date: 'January 12, 2025',
      time: '8:00 AM - 3:00 PM',
      location: 'Health Center',
      attendees: 200,
      image: 'https://images.unsplash.com/photo-1516549655669-df6654e435de?auto=format&fit=crop&w=400'
    },
    {
      id: 6,
      title: 'Heritage Photography Exhibition',
      description: 'Showcasing photographs that capture Silte culture, landscapes, and daily life.',
      category: 'cultural',
      status: 'upcoming',
      date: 'February 5-9, 2025',
      time: '10:00 AM - 6:00 PM',
      location: 'Art Gallery',
      attendees: 80,
      image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=400'
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      day: '15',
      month: 'DEC',
      title: 'Cultural Festival Opening',
      details: 'Worabe Stadium, 9:00 AM',
      category: 'cultural'
    },
    {
      id: 2,
      day: '20',
      month: 'DEC',
      title: 'Community Meeting',
      details: 'Community Center, 2:00 PM',
      category: 'community'
    },
    {
      id: 3,
      day: '28',
      month: 'DEC',
      title: 'Language Workshop',
      details: 'Education Center, 10:00 AM',
      category: 'educational'
    }
  ];

  const eventTypes = [
    {
      name: 'Cultural Events',
      count: '12',
      icon: <Music className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      name: 'Workshops',
      count: '8',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'Sports Events',
      count: '6',
      icon: <Trophy className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Community Service',
      count: '10',
      icon: <Heart className="w-6 h-6" />,
      color: 'bg-red-100 text-red-600'
    }
  ];

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.category === activeFilter);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate calendar days
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    const startDay = firstDay.getDay();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push({ day: null, hasEvent: false });
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const hasEvent = i % 5 === 0; // Simplified event indicator
      days.push({ day: i, hasEvent });
    }
    
    return days;
  };

  const calendarDays = getCalendarDays();
  const today = new Date();

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  return (
    <div className="events-page">
      <div className="events-container">
        {/* Header */}
        <div className="events-header">
          <h1 className="events-title">SLMA Events & Activities</h1>
          <p className="events-subtitle">
            Stay connected with cultural celebrations, educational workshops, community gatherings, 
            and sports events across all Silte woredas.
          </p>
          <p className="events-tagline">
            Building community through shared experiences.
          </p>
        </div>

        {/* Event Categories */}
        <div className="event-categories">
          <h2 className="categories-title">Event Categories</h2>
          <div className="categories-grid">
            {eventTypes.map((type, index) => (
              <Link 
                key={index}
                href={`/events/category/${type.name.toLowerCase().replace(' ', '-')}`}
                className="category-card"
              >
                <div className="category-icon">
                  {type.icon}
                </div>
                <h3 className="category-name">{type.name}</h3>
                <div className="category-count">{type.count} events</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Events Filters */}
        <div className="events-filters">
          <Filter className="w-5 h-5" />
          {eventCategories.map(category => (
            <button
              key={category.id}
              className={`filter-button ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-status-container">
                  <span className={`event-status status-${event.status}`}>
                    {event.status}
                  </span>
                </div>
                
                <div className="event-image-container">
                  <div 
                    className="event-image"
                    style={{
                      backgroundImage: `url(${event.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="event-category">
                    {eventCategories.find(c => c.id === event.category)?.label}
                  </div>
                </div>

                <div className="event-content">
                  <div className="event-date">{event.date}</div>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  
                  <div className="event-details">
                    <div className="event-detail">
                      <Clock className="detail-icon" />
                      <span>{event.time}</span>
                    </div>
                    <div className="event-detail">
                      <MapPin className="detail-icon" />
                      <span>{event.location}</span>
                    </div>
                    <div className="event-detail">
                      <Users className="detail-icon" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>

                  <div className="event-actions">
                    <Link href={`/events/${event.id}`} className="event-button primary">
                      View Details
                    </Link>
                    <button className="event-button secondary">
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-events">
            <Calendar className="no-events-icon" />
            <h3 className="no-events-title">No Events Found</h3>
            <p className="no-events-description">
              Try selecting a different category or check back soon for upcoming events.
            </p>
            <button 
              onClick={() => setActiveFilter('all')}
              className="cta-button secondary"
            >
              View All Events
            </button>
          </div>
        )}

        {/* Calendar View */}
        <div className="calendar-section">
          <div className="calendar-header">
            <h2 className="calendar-title">Event Calendar</h2>
            <div className="calendar-nav">
              <button onClick={prevMonth} className="calendar-button">
                <ChevronLeft className="calendar-button-icon" />
              </button>
              <div className="calendar-month">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </div>
              <button onClick={nextMonth} className="calendar-button">
                <ChevronRight className="calendar-button-icon" />
              </button>
            </div>
          </div>

          <div className="calendar-grid">
            {weekDays.map((day) => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}
            
            {calendarDays.map((dayInfo, index) => (
              <div 
                key={index}
                className={`calendar-day ${dayInfo.day === today.getDate() && currentMonth.getMonth() === today.getMonth() ? 'today' : ''} ${dayInfo.hasEvent ? 'event-day' : ''}`}
              >
                {dayInfo.day && (
                  <>
                    <div className="day-number">{dayInfo.day}</div>
                    {dayInfo.hasEvent && <div className="event-indicator"></div>}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="upcoming-events">
          <div className="upcoming-header">
            <h2 className="upcoming-title">Upcoming Highlights</h2>
            <p className="upcoming-subtitle">Don't miss these important community events</p>
          </div>

          <div className="upcoming-list">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="upcoming-item">
                <div className="upcoming-date">
                  <div className="upcoming-day">{event.day}</div>
                  <div className="upcoming-month">{event.month}</div>
                </div>
                <div className="upcoming-content">
                  <h4 className="upcoming-event-title">{event.title}</h4>
                  <p className="upcoming-event-details">{event.details}</p>
                </div>
                <button className="upcoming-button">
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="events-cta">
          <h2 className="cta-title">Host Your Own Event</h2>
          <p className="cta-description">
            Have an idea for a community event? Partner with SLMA to organize and promote 
            cultural, educational, or social activities for the Silte community.
          </p>
          
          <div className="cta-buttons">
            <Link href="/events/propose" className="cta-button primary">
              Propose an Event
            </Link>
            <Link href="/volunteer" className="cta-button secondary">
              Volunteer for Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}