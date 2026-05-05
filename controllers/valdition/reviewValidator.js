const Joi = require('joi');


//   Middleware to validate review data using Joi
 
exports.validateReview = (req, res, next) => {
    // 1) Define validation schema
    const schema = Joi.object({
        review: Joi.string().min(5).max(500).required().messages({
            'string.empty': 'Review text is required',
            'string.min': 'Review must be at least 5 characters long'
        }),
        rating: Joi.number().min(1).max(5).required().messages({
            'number.base': 'Rating must be a number',
            'number.min': 'Rating must be at least 1',
            'number.max': 'Rating cannot exceed 5'
        }),
        book: Joi.string().hex().length(24).required().messages({
            'string.length': 'Invalid Book ID format'
        })
    });

    // 2) Validate request body against the schema
    const { error } = schema.validate(req.body);
    
    // 3) If validation fails, return 400 error
    if (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.details[0].message
        });
    }

    // 4) If validation succeeds, move to the next middleware/controller
    next();
};