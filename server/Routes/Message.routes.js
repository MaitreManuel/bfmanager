const Message = require('../Controllers/Message.controller');

class MessageRouter {
    constructor () {
        if (!!MessageRouter.instance) {
            return MessageRouter.instance;
        }

        MessageRouter.instance = this;
        this.controller = new Message();

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
                case 'read':
                    if (method === 'GET') {
                        data = await this.controller.findAll();

                        response = MakeResponse(200, data, 'SUCCESS');
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

module.exports = MessageRouter;
