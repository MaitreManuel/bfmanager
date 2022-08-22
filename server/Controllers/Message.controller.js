const DB = require('../Database');

const PG = new DB().getInstance();

class MessageController {
    constructor () {
        this.tableName = 'messages';
    }

    async createOne (messages, nickname) {
        const RESULT = await PG.query(`INSERT INTO ${ this.tableName } (message, nickname) VALUES ($1, $2)`, [messages, nickname]);

        return RESULT.rows;
    }

    async findAll () {
        const RESULT = await PG.query(`SELECT * FROM ${ this.tableName }`);

        return RESULT.rows;
    }
}

module.exports = MessageController;
