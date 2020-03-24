exports.up = function(knex) {
  return knex.schema.createTable('user_cred', tbl => {
    tbl.increments();
    tbl
      .string('username')
      .notNullable()
      .unique();
    tbl.string('password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.droptTableIfExists('usesr_cred');
};
