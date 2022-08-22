const { Pool } = require('pg');

class Database {
    constructor () {
        if (!!Database.instance) {
            return Database.instance;
        }

        Database.instance = this;

        this._database = new Pool({
            database: 'bfmanager',
            host: 'postgres',
            password: 'root',
            port: 5432,
            user: 'root'
        });

        return this;
    }

    getInstance () {
        return this._database;
    }
}

module.exports = Database;
