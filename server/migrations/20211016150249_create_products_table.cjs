exports.up = async function (knex) {
  await knex.schema
    .createTable('products', table => {
      table.increments('id')
      table.string('slug').notNullable()
      table.string('title').notNullable()
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
    })

  await knex.raw('CREATE UNIQUE INDEX unique_slug ON products(slug)')
}

exports.down = function (knex) {
  return knex.schema.dropTable('products')
}
