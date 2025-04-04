const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

// Increase test timeout
jest.setTimeout(30000);

// Connect to the in-memory database before running tests
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

// Clear all data after each test
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
});

// Close database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
  await mongod.stop();
});

// Mock session and flash
jest.mock('express-session', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('connect-flash', () => ({
  __esModule: true,
  default: jest.fn()
}));

// Mock passport
jest.mock('passport', () => {
  return {
    initialize: jest.fn(),
    session: jest.fn(),
    authenticate: jest.fn(),
    setAuthenticatedUser: jest.fn(),
    use: jest.fn(),
    serializeUser: jest.fn(),
    deserializeUser: jest.fn()
  };
});

// Mock passport-local
jest.mock('passport-local', () => {
  return function() {
    return {
      authenticate: jest.fn()
    };
  };
}); 