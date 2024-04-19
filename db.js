const { password } = require('pg/lib/defaults');

const pgp = require('pg-promise')();

const db = pgp({
    host : 'localhost',
    port : 5432,
    database : 'crudAPI',
    user : 'postgres',
    password : 'postgres1234'
});

module.exports = db;