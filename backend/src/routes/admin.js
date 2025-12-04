const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const authMiddleware = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary for image uploads
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Apply auth middleware to all admin routes
router.use(authMiddleware);

// Create new event (with image upload)
router.post('/', 
  upload.single('image'),
  [
    body('title').notEmpty().trim().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').isIn(['cultural', 'educational', 'community', 'sports', 'youth', 'religious'])
      .withMessage('Invalid category'),
    body('startDate').isISO8601().withMessage('Valid start date is required'),
    body('time').notEmpty().withMessage('Time is required'),
    body('location').notEmpty().withMessage('Location is required')
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false, 
          errors: errors.array() 
        });
      }
      
      // Handle image upload to Cloudinary
      let imageUrl = '';
      let imagePublicId = '';
      
      if (req.file) {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'silte-events',
              transformation: [
                { width: 800, height: 450, crop: 'fill' },
                { quality: 'auto' },
                { fetch_format: 'auto' }
              ]
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          
          stream.end(req.file.buffer);
        });
        
        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;
      } else {
        // Use default Islamic/Silte image based on category
        const defaultImages = {
          cultural: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?q=80&w=800&auto=format&fit=crop',
          religious: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop',
          educational: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
          sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w-800&auto=format&fit=crop',
          community: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=800&auto=format&fit=crop',
          youth: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop'
        };
        
        imageUrl = defaultImages[req.body.category] || defaultImages.cultural;
      }
      
      // Create event
      const eventData = {
        ...req.body,
        imageUrl,
        imagePublicId: imagePublicId || undefined,
        createdBy: req.user._id,
        startDate: new Date(req.body.startDate),
        endDate: req.body.endDate ? new Date(req.body.endDate) : undefined
      };
      
      const event = new Event(eventData);
      await event.save();
      
      res.status(201).json({
        success: true,
        message: 'Event created successfully',
        event: {
          id: event._id,
          title: event.title,
          category: event.category,
          startDate: event.startDate,
          imageUrl: event.imageUrl
        }
      });
      
    } catch (error) {
      console.error('Event creation error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error creating event',
        error: error.message 
      });
    }
  }
);

// Update event
router.put('/:id', 
  upload.single('image'),
  async (req, res) => {
    try {
      const eventId = req.params.id;
      const updates = req.body;
      
      // Find event
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ 
          success: false, 
          message: 'Event not found' 
        });
      }
      
      // Check permission
      if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ 
          success: false, 
          message: 'Not authorized to update this event' 
        });
      }
      
      // Handle image update if new image provided
      if (req.file) {
        // Delete old image from Cloudinary if exists
        if (event.imagePublicId) {
          await cloudinary.uploader.destroy(event.imagePublicId);
        }
        
        // Upload new image
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'silte-events',
              transformation: [
                { width: 800, height: 450, crop: 'fill' },
                { quality: 'auto' }
              ]
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          
          stream.end(req.file.buffer);
        });
        
        updates.imageUrl = uploadResult.secure_url;
        updates.imagePublicId = uploadResult.public_id;
      }
      
      // Convert dates
      if (updates.startDate) updates.startDate = new Date(updates.startDate);
      if (updates.endDate) updates.endDate = new Date(updates.endDate);
      
      updates.updatedAt = new Date();
      
      // Update event
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        updates,
        { new: true, runValidators: true }
      );
      
      res.json({
        success: true,
        message: 'Event updated successfully',
        event: updatedEvent
      });
      
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Error updating event',
        error: error.message 
      });
    }
  }
);

// Delete event (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }
    
    // Check permission
    if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this event' 
      });
    }
    
    // Soft delete by setting isActive to false
    event.isActive = false;
    event.updatedAt = new Date();
    await event.save();
    
    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting event',
      error: error.message 
    });
  }
});

// Get all events for admin (including inactive)
router.get('/all', async (req, res) => {
  try {
    const { page = 1, limit = 20, search, category, status } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    if (category) query.category = category;
    if (status) query.status = status;
    
    const events = await Event.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('createdBy', 'name email');
    
    const total = await Event.countDocuments(query);
    
    res.json({
      success: true,
      events,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalEvents: total
      }
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching events',
      error: error.message 
    });
  }
});

// Get event statistics for admin dashboard
router.get('/dashboard/stats', async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const activeEvents = await Event.countDocuments({ isActive: true });
    const upcomingEvents = await Event.countDocuments({ 
      isActive: true, 
      status: 'upcoming',
      startDate: { $gte: new Date() }
    });
    const eventsByCategory = await Event.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    // Get recent events
    const recentEvents = await Event.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category status startDate attendees');
    
    res.json({
      success: true,
      stats: {
        totalEvents,
        activeEvents,
        upcomingEvents,
        eventsByCategory,
        recentEvents
      }
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching dashboard stats',
      error: error.message 
    });
  }
});

module.exports = router;