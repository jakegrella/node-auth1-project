const db = require('../../data/dbConfig');

const getAll = () => {
	return db('users');
};

const add = async (user) => {
	const [id] = await db('users').insert(user, 'id');
	return db('users').where({ id }).first();
};

module.exports = {
	getAll,
	add,
};
