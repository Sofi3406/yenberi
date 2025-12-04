'use client';

import React, { useState, useEffect } from 'react';
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
  Zap,
  Search,
  Loader2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Event {
  _id: string;
  title: string;
  description: string;
  shortDescription?: string;
  category: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  date: string;
  endDate?: string;
  time?: string;
  location: string;
  address?: string;
  attendees: any[];
  maxAttendees: number;
  image: string;
  isIslamicEvent?: boolean;
  prayerTiming?: string;
  suitableFor?: string[];
  registrationRequired?: boolean;
  registrationUrl?: string;
  organizer: {
    _id: string;
    name: string;
    email: string;
    profile?: {
      photo?: string;
    };
  };
  attendeesCount?: number;
}

interface ApiResponse {
  success: boolean;
  data: Event[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  message?: string;
}

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const eventCategories = [
    { id: 'all', label: 'All Events', icon: <Zap className="w-5 h-5" /> },
    { id: 'cultural', label: 'Cultural', icon: <Music className="w-5 h-5" /> },
    { id: 'educational', label: 'Educational', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'community', label: 'Community', icon: <Heart className="w-5 h-5" /> },
    { id: 'sports', label: 'Sports', icon: <Trophy className="w-5 h-5" /> },
    { id: 'youth', label: 'Youth', icon: <Target className="w-5 h-5" /> },
    { id: 'religious', label: 'Religious', icon: <Heart className="w-5 h-5" /> },
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

  const fetchEvents = async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        upcomingOnly: 'true'
      });
      
      if (activeFilter !== 'all') {
        params.append('category', activeFilter);
      }
      
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/events?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setEvents(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch('/api/events/upcoming/events');
      
      if (!response.ok) {
        throw new Error('Failed to fetch upcoming events');
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setUpcomingEvents(data.data?.slice(0, 3) || []);
      }
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchUpcomingEvents();
  }, [activeFilter, currentPage, searchQuery]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    const startDay = firstDay.getDay();
    
    for (let i = 0; i < startDay; i++) {
      days.push({ day: null, hasEvent: false });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const hasEvent = Math.random() > 0.7; // Replace with real check
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchEvents();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cultural': return 'bg-purple-100 text-purple-800';
      case 'religious': return 'bg-yellow-100 text-yellow-800';
      case 'educational': return 'bg-blue-100 text-blue-800';
      case 'sports': return 'bg-green-100 text-green-800';
      case 'community': return 'bg-indigo-100 text-indigo-800';
      case 'youth': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by title, description, or location..."
                className="w-full pl-12 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </form>
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
                <div className={`category-icon ${type.color}`}>
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
              <span className="flex items-center gap-2">
                {category.icon}
                {category.label}
              </span>
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          </div>
        ) : events.length > 0 ? (
          <>
            <div className="events-grid">
              {events.map((event) => (
                <div key={event._id} className="event-card">
                  <div className="event-status-container">
                    <span className={`event-status ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                    {event.isIslamicEvent && (
                      <span className="event-status bg-yellow-100 text-yellow-800">
                        Islamic Event
                      </span>
                    )}
                  </div>
                  
                  <div className="event-image-container">
                    <div 
                      className="event-image"
                      style={{
                        backgroundImage: `url(${event.image || '/api/placeholder/400/225'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                    <div className={`event-category ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </div>
                  </div>

                  <div className="event-content">
                    <div className="event-date">{formatDate(event.date)}</div>
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-description">
                      {event.shortDescription || event.description}
                    </p>
                    
                    <div className="event-details">
                      <div className="event-detail">
                        <Clock className="detail-icon" />
                        <span>{event.time || 'Time TBA'}</span>
                      </div>
                      <div className="event-detail">
                        <MapPin className="detail-icon" />
                        <span>{event.location}</span>
                      </div>
                      <div className="event-detail">
                        <Users className="detail-icon" />
                        <span>{event.attendees?.length || 0} attendees</span>
                      </div>
                    </div>

                    <div className="event-actions">
                      <Link href={`/events/${event._id}`} className="event-button primary">
                        View Details
                      </Link>
                      {event.registrationRequired ? (
                        event.registrationUrl ? (
                          <a
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="event-button secondary"
                          >
                            Register Now
                          </a>
                        ) : (
                          <button className="event-button secondary" disabled>
                            Registration Required
                          </button>
                        )
                      ) : (
                        <button className="event-button secondary">
                          Learn More
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-events">
            <Calendar className="no-events-icon" />
            <h3 className="no-events-title">No Events Found</h3>
            <p className="no-events-description">
              {searchQuery 
                ? `No events found for "${searchQuery}". Try a different search.`
                : 'Try selecting a different category or check back soon for upcoming events.'}
            </p>
            <button 
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
                setCurrentPage(1);
              }}
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
                className={`calendar-day ${
                  dayInfo.day === today.getDate() && 
                  currentMonth.getMonth() === today.getMonth() ? 'today' : ''
                } ${dayInfo.hasEvent ? 'event-day' : ''}`}
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
              <div key={event._id} className="upcoming-item">
                <div className="upcoming-date">
                  <div className="upcoming-day">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="upcoming-month">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                </div>
                <div className="upcoming-content">
                  <h4 className="upcoming-event-title">{event.title}</h4>
                  <p className="upcoming-event-details">
                    {event.location}, {event.time || 'Time TBA'}
                  </p>
                </div>
                <Link 
                  href={`/events/${event._id}`}
                  className="upcoming-button"
                >
                  View Details
                </Link>
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
            <Link href="/admin/events/create" className="cta-button primary">
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