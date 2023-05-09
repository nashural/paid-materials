/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('orders', table => {
      table.integer('id')
      table.integer('material_id')
      table.integer('subscription_id')
      table.text('init')
      table.dateTime('init_at')
      table.text('status')
      table.dateTime('status_at')
      table.boolean('is_paid')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('orders')
};
