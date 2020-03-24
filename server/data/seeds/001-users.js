exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_cred')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('user_cred').insert([
        { username: 'Fred', password: 'yabbaDabba' },
      ]);
    });
};
