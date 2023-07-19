const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");

class ServiceProvider {
  static async login(creds) {
    const { email, password } = creds;
    const requiredCreds = ["email", "password"];

    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "service provider registration",
      });
    } catch (err) {
      throw err;
    }

    const provider = await ServiceProvider.fetchProviderByEmail(email);
    if (provider) {
      const isValid = await bcrypt.compare(password, provider.password);
      if (isValid) {
        const { password, ...providerNoPassword } = provider;
        return providerNoPassword;
      }
    }
    throw new UnauthorizedError("Invalid email/password combo");
  }

  static async register(creds) {
    const { email, name, cuisine, password, profile_picture, zip_code } = creds;
    const requiredCreds = [
      "email",
      "cuisine",
      "name",
      "password",
      "profile_picture",
      "zip_code"
    ];

    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "service provider registration",
      });
    } catch (err) {
      throw err;
    }
    if (email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.");
    }

    const existingProviderWithEmail = await ServiceProvider.fetchProviderByEmail(email);
    if (existingProviderWithEmail) {
      console.log(existingProviderWithEmail);
      throw new BadRequestError(`Duplicate email: ${email}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const normalizedEmail = email.toLowerCase();

    const result = await db.query(
      `
            INSERT INTO service_providers 
            (email, name, cuisine, password, profile_picture, zip_code) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id,email, name, cuisine, profile_picture, zip_code
            `,
      [normalizedEmail, name, cuisine, hashedPassword, profile_picture, zip_code]
    );

    const provider = result.rows[0];
    return provider;
  }

  static async fetchProviderByEmail(email) {
    const result = await db.query(`SELECT * FROM service_providers WHERE email = $1`, 
    [email.toLowerCase()]);

    const provider = result.rows[0];
    return provider;
  }

  static async fetchProviderByCuisine({cuisine}){
    const result = await db.query(`SELECT * FROM service_providers WHERE cuisine = $1`,
    [cuisine])

    const providers = result.rows;
    return providers;
  }

  static async fetchAllProviders(){
    const result = await db.query(`SELECT * FROM service_providers`)
    const providers = result.rows;
    return providers;
  }
}

module.exports = ServiceProvider
