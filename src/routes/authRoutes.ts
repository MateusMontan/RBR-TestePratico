import { Router, Request, Response, NextFunction } from 'express';
import { register, login } from '../controllers/authController';
import { registerSchema, loginSchema } from '../validators/validationSchemas';

const router = Router();

const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;
