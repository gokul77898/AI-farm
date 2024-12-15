const request = require('supertest');
const app = require('../src/app'); // We'll create this
const User = require('../src/models/User');
const { connectDB } = require('../src/config/mongodb');

describe('Authentication Endpoints', () => {
  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/auth/register/email', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register/email')
        .send({
          email: 'test@example.com',
          password: 'Password123!'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('Registration successful. Please verify your email.');
    });
  });
});