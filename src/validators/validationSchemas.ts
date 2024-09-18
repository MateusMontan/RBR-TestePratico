import Joi from 'joi';

export const registerSchema = Joi.object({
  username: Joi.string().min(6).max(16).required(),
  password: Joi.string()
    .min(6)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    .message('Password must have at least one uppercase letter, one lowercase letter, one number, and one special character.')
});

export const loginSchema = Joi.object({
  username: Joi.string().min(6).max(16).required(),
  password: Joi.string()
    .min(6)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    .message('Password must have at least one uppercase letter, one lowercase letter, one number, and one special character.')
});

export const createTaskSchema = Joi.object({
  title: Joi.string().max(30).required(),
  description: Joi.string().min(30).optional()
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().max(30).optional(),
  description: Joi.string().min(30).optional(),
  status: Joi.string().valid('pending', 'completed').optional()
});