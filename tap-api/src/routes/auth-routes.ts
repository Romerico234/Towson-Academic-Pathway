import { Router, Request, Response } from 'express';
import { Db } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router: Router = Router();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_key';

// Register route
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const db: Db = req.app.locals.db;

    const { studentId, email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await db.collection('student-data').findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      studentId,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      createdAt: new Date(),
    };

    const result = await db.collection('student-data').insertOne(newUser);

    // Create JWT token
    const token = jwt.sign(
      { userId: result.insertedId, email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const db: Db = req.app.locals.db;

    const { email, password } = req.body;

    // Find user by email
    const user = await db.collection('student-data').findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
