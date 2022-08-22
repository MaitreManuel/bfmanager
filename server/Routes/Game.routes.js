const Game = require('../Controllers/Game.controller');

class GameRouter {
    constructor () {
        if (!!GameRouter.instance) {
            return GameRouter.instance;
        }

        GameRouter.instance = this;
        this.controller = new Game();

        return this;
    }

    async router (path, query, method) {
        const MakeResponse = (code, data, status) => {
            return {
                code: code,
                data: data,
                status: status
            }
        };

        let data;
        let response;

        try {
            switch (path) {
                case 'create':
                    if (method === 'POST') {
                        if (query.players) {
                            data = await this.controller.createOne(query.players);
                            response = MakeResponse(200, data, 'SUCCESS');
                        } else {
                            response = MakeResponse(400, { message: 'Missing players param' }, 'ERROR');
                        }
                    } else {
                        response = MakeResponse(400, { message: 'Invalid method' }, 'ERROR');
                    }
                    break;
                case 'read':
                    if (method === 'GET') {
                        if (query.id) {
                            data = await this.controller.findOne(query.id);
                        } else {
                            data = await this.controller.findAll();
                        }

                        response = MakeResponse(200, data, 'SUCCESS');
                    } else {
                        response = MakeResponse(400, { message: 'Invalid method' }, 'ERROR');
                    }
                    break;
                case 'update':
                    if (method === 'POST') { // 'PATCH' method require particular code to get body params, no time
                        if (query.id) {
                            const IDS = JSON.parse(query.id);

                            if (typeof IDS === 'number') {
                                data = await this.controller.updateOne(query);
                            } else {
                                data = await this.controller.updateMany(IDS, query);
                            }
                            response = MakeResponse(200, data, 'SUCCESS');
                        } else {
                            response = MakeResponse(400, { message: 'Missing id param' }, 'ERROR');
                        }
                    } else {
                        response = MakeResponse(400, { message: 'Invalid method' }, 'ERROR');
                    }
                    break;
                case 'delete':
                    if (method === 'POST') { // 'DELETE' method require particular code to get body params, no time
                        if (query.id) {
                            const IDS = JSON.parse(query.id);

                            if (typeof IDS === 'number') {
                                data = await this.controller.deleteOne(query.id);
                            } else {
                                data = await this.controller.deleteMany(IDS);
                            }

                            response = MakeResponse(200, data, 'SUCCESS');
                        } else {
                            response = MakeResponse(400, { message: 'Missing id param' }, 'ERROR');
                        }
                    } else {
                        response = MakeResponse(400, { message: 'Invalid method' }, 'ERROR');
                    }
                    break;
                default:
                    response = MakeResponse(404, { message: 'Unknown path' }, 'ERROR');
                    break;
            }
        } catch (err) {
            response = MakeResponse(500, { message: 'Internal Server Error' }, 'ERROR');
            console.error(err);
        }

        return response;
    }
}

module.exports = GameRouter;
