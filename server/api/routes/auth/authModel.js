const db = require('../../../data/dbconfig.js');

module.exports = {
  find,
  findby,
  findbyId,
  add,
  remove,
  update,
};

async function find() {
  try {
    return await db('user_cred').select('id', 'username');
  } catch (error) {
    return error;
  }
}

async function findby(key) {
  try {
    return await db('user_cred').where(key);
  } catch (error) {
    return error;
  }
}
async function findbyId(id) {
  return await db('user_cred')
    .where({ id })
    .first();
}
async function add(user) {
  const [id] = await db('user_cred').insert(user);
  return await findbyId(id);
}
function remove() {}
function update() {}
