const request = require('supertest');
const express = require('express');

// Import your router and other necessary modules/functions here
const router = require('../../routes/auth'); 
const User = require('../../models/user');
const generateAuthToken  = require('../../utils/tokens'); 

const app = express();

// Add the router to the app
app.use(express.json());
app.use('/auth', router);

// Mock the User module and the generateAuthToken function
jest.mock('../models/user', () => ({
  register: jest.fn().mockResolvedValue({ id: 1, username: 'testuser' }),
}));

jest.mock('../utils/tokens', () => ({
  generateAuthToken: jest.fn().mockReturnValue('mockAuthToken'),
}));

describe('POST /auth/user/register', () => {
  it('should respond with the user data and token on successful registration', async () => {
    const mockUserData = {
      username: 'testuser',
      password: 'testpassword',
      email: "test@test.com",
      firstName: "testFirst",
      lastName: "testLast",
      zip_code: 94105,
    };

    // Perform the POST request using Supertest
    const response = await request(app).post('/auth/user/register').send(mockUserData);

    // Assert the response
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
    expect(response.body.user).toEqual({ id: 1, username: 'testuser' });
    expect(response.body.token).toBe('mockAuthToken');
  });

//   it('should call the User.register function with the provided user data', async () => {
//     const mockUserData = {
//       username: 'testuser',
//       password: 'testpassword',
//       email: "test@test.com",
//       firstName: "testFirst",
//       lastName: "testLast",
//       zip_code: 94105,
//     };

//     // Perform the POST request using Supertest
//     const response = await request(app).post('/auth/user/register').send(mockUserData);

//     // Assert the response
//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty('user');
//     expect(response.body).toHaveProperty('token');
//     expect(response.body.user).toEqual({ id: 1, username: 'testuser' });
//     expect(response.body.token).toBe('mockAuthToken');

//     // Assert that the User.register function was called with the provided user data
//     expect(User.register).toHaveBeenCalledWith(mockUserData);
//   });

//   it('should handle errors and call the next middleware', async () => {
//     const mockUserData = {
//       username: 'testuser',
//       password: 'testpassword',
//       email: "test@test.com",
//       firstName: "testFirst",
//       lastName: "testLast",
//       zip_code: 94105,
//     };

    // // Mock the User.register function to throw an error
    // jest.spyOn(User, 'register').mockRejectedValue(new Error('Registration error'));

    // // Create a mock function for the "next" middleware to check if it's called
    // const next = jest.fn();

    // // Perform the POST request using Supertest
    // const response = await request(app).post('/auth/user/register').send(mockUserData);

    // // Assert the response
    // expect(response.status).toBe(500); // You can adjust the expected status code based on your error handling

    // // Assert that the "next" middleware was called with an error
    // expect(next).toHaveBeenCalled();
//   });
});