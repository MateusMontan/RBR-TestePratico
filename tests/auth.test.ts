import request from 'supertest';
import app from '../src/app'; // Import the app instance

// Utility function to create a user
const createUser = async (username: string, password: string) => {
  return await request(app)
    .post('/api/auth/register')
    .send({ username, password });
};

describe('Auth Endpoints', () => {
  beforeEach(async () => {});

  it('should register a new user and return a token', async () => {
    const response = await createUser('testuser', 'Test@1234');
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.message).toBe('User registered successfully!');
  });

  it('should not register an existing user', async () => {
    await createUser('existinguser', 'Test@1234');

    const response = await createUser('existinguser', 'Test@1234');
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'User already exists');
  });

  it('should return validation error for invalid data', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'short',
        password: 'short'
      });
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should login an existing user and return a token', async () => {
    await createUser('loginuser', 'Test@1234');

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'loginuser',
        password: 'Test@1234'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not login with invalid credentials', async () => {
    await createUser('loginuser', 'Test@1234');

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'loginuser',
        password: 'WrongPassword'
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });
  it('should not login with a non-existing user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'nonexistinguser',
        password: 'SomePassword'
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });
});
