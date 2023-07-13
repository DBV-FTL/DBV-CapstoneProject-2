const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");

class User {
  static async login(creds) {
    const { email, password } = creds;
    const requiredCreds = ["email", "password"];

    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "user registration",
      });
    } catch (err) {
      throw err;
    }

    const user = await User.fetchUserByEmail(email);
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const { password, ...userNoPassword } = user;
        return userNoPassword;
      }
    }
    throw new UnauthorizedError("Invalid email/password combo");
  }

  static async register(creds) {
    const { email, username, firstName, lastName, password, zip_code } = creds;
    const requiredCreds = [
      "email",
      "username",
      "firstName",
      "lastName",
      "password",
      "zip_code",
    ];

    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "user registration",
      });
    } catch (err) {
      throw err;
    }
    if (email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.");
    }

    const existingUserWithEmail = await User.fetchUserByEmail(email);
    if (existingUserWithEmail) {
      console.log(existingUserWithEmail);
      throw new BadRequestError(`Duplicate email: ${email}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const normalizedEmail = email.toLowerCase();

    const result = await db.query(
      `
        INSERT INTO users 
        (first_name, last_name, username, email, password, zip_code) 
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, username, email, first_name as "firstName", last_name as "lastName"
        `,
      [firstName, lastName, username, normalizedEmail, hashedPassword, zip_code]
    );

    const user = result.rows[0];
    return user;
  }

  static async fetchUserByEmail(email) {
    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email.toLowerCase(),
    ]);

    const user = result.rows[0];
    return user;
  }

  static async fetchProviderByZipCode( {email} ) {
    const result = await db.query(
      `SELECT id, name, cuisine, zip_code 
       FROM service_providers 
       WHERE zip_code = (SELECT zip_code FROM users WHERE email = $1)`, [email]
    );
    const providers = result.rows;
    return providers;
  }
}

module.exports = User;
