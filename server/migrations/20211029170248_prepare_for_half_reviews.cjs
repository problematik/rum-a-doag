
exports.up = function (knex) {
  return knex.raw('update reviews set rating = rating * 10')
}

exports.down = function (knex) {
  return knex.raw('update reviews set rating = rating / 10')
}
