import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const taskSchema = Joi.object({
  title: Joi.string().max(30).required(),
  description: Joi.string().min(30).required(),
  status: Joi.string().valid('pending', 'completed').optional() // Status is optional for creation
});

const validateTask = (req: Request, res: Response, next: NextFunction) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

export default validateTask;
