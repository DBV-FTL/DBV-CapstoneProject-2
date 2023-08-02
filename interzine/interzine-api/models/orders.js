const db = require("../db");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../utils/errors");
const { validateFields } = require("../utils/validate");

class Orders {
  static async addOrder({ item, user }) {
    const { product_name, service_provider_id, quantity } = item;
    const requiredItems = ["product_name", "quantity", "service_provider_id"];

    //Checks to see if the item is an array, if an array, maps through the array of objects and validates each field
    if (Array.isArray(item)) {
      item?.map((item) => {
        try {
          validateFields({
            required: requiredItems,
            obj: item,
            location: "add order",
          });
        } catch (err) {
          throw err;
        }
      });
    } else {
      try {
        validateFields({
          required: requiredItems,
          obj: item,
          location: "add order",
        });
      } catch (err) {
        throw err;
      }
    }

    if (user?.client && user?.client === "provider")
      throw new UnauthorizedError("User is a Provider");
    const order_id = await this.createOrderNumber({ user });
    const sp_id = await this.getServiceProviderId({ item });

    let orderDetails = [];
    try {
      if (Array.isArray(item)) {
        Promise.all(
          item?.map(async (item) => {
            const result = await db.query(
              `
                SELECT id FROM menu_items
                WHERE name = $1 AND service_provider_id = $2`,
              [item.product_name, item.service_provider_id]
            );
            // console.log()
            const item_id = result.rows[0].id;

            const r = await db.query(
              `
                INSERT INTO order_details (product_name, quantity, menu_item_id, order_id)
                VALUES ($1, $2, $3, $4)
                RETURNING *`,
              [item.product_name, item.quantity, item_id, order_id]
            );

            orderDetails = [...orderDetails, r.rows[0]];
        })
        ).then(() => {
            console.log("ordered", orderDetails)
          return orderDetails;
        });
      } 
      else {
        const result = await db.query(
          `
            SELECT id FROM menu_items
            WHERE name = $1 AND service_provider_id = $2`,
          [product_name, service_provider_id]
        );
        const item_id = result.rows[0].id;

        const r = await db.query(
          `
            INSERT INTO order_details (product_name, quantity, menu_item_id, order_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
          [product_name, quantity, item_id, order_id]
        );

        orderDetails = [...orderDetails, r.rows[0]];
        return orderDetails;
      }
    } catch (err) {
      throw err;
    }
  }

  static async getServiceProviderId({ item }) {
    const result = await db.query(
      `
    SELECT service_provider_id FROM menu_items
    WHERE name = $1`,
      [item.product_name]
    );
    console.log("how many", result.rows);
  }
  static async createOrderNumber({ user }) {
    const result = await db.query(
      `
        INSERT INTO orders (user_id)
        VALUES ($1)
        RETURNING *`,
      [user.id]
    );
    return result.rows[0].id;
  }

  static async listOrders({ user }) {
    if (user?.client && user?.client === "provider")
      throw new UnauthorizedError("User is a Provider");
    const result = await db.query(
      `
        SELECT * from orders as o
        RIGHT JOIN order_details as od
        ON o.id = od.order_id
        WHERE o.user_id = $1
        ORDER BY o.id DESC`,
      [user.id]
    );
    return result.rows;
  }
}

module.exports = Orders;
