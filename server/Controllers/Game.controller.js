const DB = require('../Database');

const PG = new DB().getInstance();

const Datetime = () => {
    const NOW = new Date();
    let datetime = NOW.getFullYear();

    datetime += `-${ (NOW.getMonth() + 1) > 9 ? '' : '0' }${ NOW.getMonth() + 1 }`;
    datetime += `-${ NOW.getDate() > 9 ? '' : '0' }${ NOW.getDate() }`;
    datetime += ` ${ NOW.getHours() > 9 ? '' : '0' }${ NOW.getHours() }`;
    datetime += `:${ NOW.getMinutes() > 9 ? '' : '0' }${ NOW.getMinutes() }`;
    datetime += `:${ NOW.getSeconds() > 9 ? '' : '0' }${ NOW.getSeconds() }`;

    return datetime;
};

class GameController {
    constructor () {
        this.tableName = 'games';
    }

    buildDataToUpdate (data) {
        const MODEL = {
            id: {
                column: 'id',
                mutable: false
            },
            players: {
                column: 'players',
                mutable: true
            },
            finished: {
                column: 'finished',
                mutable: true
            },
            onLine: {
                column: 'on_line',
                mutable: true
            },
            creadtedAt: {
                column: 'creadted_at',
                mutable: false
            },
            updatedAt: {
                column: 'updated_at',
                mutable: true
            },
        };
        let builtData = '';

        for (const KEY in data) {
            if (!!MODEL[KEY].mutable && !!data[KEY]) {
                builtData += `${ MODEL[KEY].column } = '${ data[KEY] }',`
            }
        }

        builtData += `updated_at = '${ Datetime() }'`;

        return builtData;
    }

    async createOne (players) {
        const RESULT = await PG.query(`INSERT INTO ${ this.tableName } (players) VALUES ($1)`, [players]);

        return RESULT.rows;
    }

    async deleteMany (ids) {
        const RESULT = await PG.query(`DELETE FROM ${ this.tableName } WHERE id = ANY($1::int[])`, [ids]);

        return RESULT.rows;
    }

    async deleteOne (id) {
        const RESULT = await PG.query(`DELETE FROM ${ this.tableName } WHERE id = $1`, [id]);

        return RESULT.rows;
    }

    async findAll () {
        const RESULT = await PG.query(`SELECT * FROM ${ this.tableName }`);

        return RESULT.rows;
    }

    async findOne (id) {
        const RESULT = await PG.query(`SELECT * FROM ${ this.tableName } WHERE id = $1`, [id]);

        return RESULT.rows;
    }

    async updateMany (ids, data) {
        const DATA = this.buildDataToUpdate(data);
        const RESULT = await PG.query(`UPDATE ${ this.tableName } SET ${ DATA } WHERE id = ANY($1::int[])`, [ids]);

        return RESULT.rows;
    }

    async updateOne (data) {
        const DATA = this.buildDataToUpdate(data);
        const RESULT = await PG.query(`UPDATE ${ this.tableName } SET ${ DATA } WHERE id = $1`, [data.id]);

        return RESULT.rows;
    }
}

module.exports = GameController;
