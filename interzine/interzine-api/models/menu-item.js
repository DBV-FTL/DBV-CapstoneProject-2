const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");

class MenuItem {
  static async addMenuItem({ item, provider }) {
    const { name, image_url, cost, rating, service_provider_id } = item;
    const requiredItems = ["name", "image_url", "cost", "rating"];

    try {
      validateFields({
        required: requiredItems,
        obj: item,
        location: "menu item",
      });
    } catch (err) {
      throw err;
    }

    const result = await db.query(`
    INSERT INTO menu_item 
    (name, image_url, cost, rating, service_provider_id)
    VALUES ($1, $2, $3, $4, (SELECT id FROM service_providers WHERE email = $5))
    RETURNING id, name, image_url, cost, rating, service_provider_id `,
    [name, image_url, cost, rating, provider.email])
    
    const newMenuItem = result.rows[0];
    return newMenuItem
  }

  static async listMenuItems(id){
    try {
        const result = await db.query(`
        SELECT m.id, m.name, m.image_url, m.cost, m.rating, m.service_provider_id
        FROM menu_item AS m
        WHERE m.service_provider_id = $1`,[id]);
        
        const menuItems = result.rows;
        return menuItems
    } catch(err) {
        throw new err
    }
  }
}

module.exports = MenuItem