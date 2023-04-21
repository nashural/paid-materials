/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('materials', table => {
      table.increments('id')
      table.string('name')
      table.text('description')
      table.integer('file_id')
      // table.foreign('file_id').references('files.id')
      table.integer('image_id')
      // table.foreign('image_id').references('images.id')
      table.float('price')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('materials')
};
