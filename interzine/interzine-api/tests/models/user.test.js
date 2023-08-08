const User = require('../../models/user'); // Replace with the actual path to your User model
const bcrypt = require('bcrypt');

// Mock the external dependencies and functions
// jest.mock('../../interzine-schema.sql', () => ({
//   db: {
//     query: jest.fn().mockImplementation((query, values) => {
//       // Implement a mock database query here
//       // Return the expected result.rows based on your needs
//       return {
//         rows: [
//           {
//             id: 1,
//             username: 'testuser',
//             email: 'test@example.com',
//             firstName: 'John',
//             lastName: 'Doe',
//             zip_code: '12345',
//           },
//         ],
//       };
//     }),
//   },
// }));

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

describe('User Model - register', () => {
  it('should register a new user successfully', async () => {
    // Mock the input data
    const mockCreds = {
      email: 'test@example.com',
      username: 'testuser',
      firstName: 'John',
      lastName: 'Doe',
      password: 'testpassword',
      zip_code: 12345,
    };

    // Call the register method
    const newUser = await User.register(mockCreds);

    // Assert the result
    expect(newUser).toEqual({
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      zip_code: 12345,
    });

    // Check if bcrypt.hash was called with the correct password
    expect(bcrypt.hash).toHaveBeenCalledWith('testpassword', expect.any(Number));
  });

  // Add more test cases to cover other scenarios such as duplicate email, invalid email, etc.
});