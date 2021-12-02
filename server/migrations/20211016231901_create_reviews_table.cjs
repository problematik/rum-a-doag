exports.up = function (knex) {
  return knex.schema
    .createTable('reviews', table => {
      table.increments('id')
      table.integer('productId').unsigned().notNullable()
      table.integer('rating').unsigned().notNullable()
      table.string('review')
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())

      table.foreign('productId').references('products.id')
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('reviews')
}
