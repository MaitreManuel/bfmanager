const _http = require('node:http');
const _querystring = require('node:querystring');
const _socket = require('socket.io');
const _url = require('node:url');

const PORT = process.env.NODE_PORT;

const GameRouter = require('./Routes/Game.routes');
const MessageController = require('./Controllers/Message.controller');
const MessageRouter = require('./Routes/Message.routes');

const SERVER = (async (req, res) => {
    const HEADERS = {
        'Access-Control-Allow-Credentials': false,
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, GET, PATCH, POST',
        'Content-Type': 'application/json'
    };

    const PATH = _url.parse(req.url).pathname;
    const PATH_SPLITED = PATH.substring(1).split('/'); // First char is '/', so first index is an empty string
    let params = '';
    let data;

    if (req.method === 'GET') {
        params = _querystring.parse(_url.parse(req.url).query);
    } else {
        await req.on('data', chunk => {
            params += chunk.toString();
        });

        params = JSON.parse(params);
    }

    switch (PATH_SPLITED[0]) {
        case 'game':
            data = await new GameRouter().router(PATH_SPLITED[1], params, req.method);
            break;
        case 'message':
            data = await new MessageRouter().router(PATH_SPLITED[1], params, req.method);
            break;
        default:
            data = {
                code: 400,
                data: { message: 'Unknown root path' },
                status: 'ERROR'
            }
            break;
    }

    res.writeHead(data.code, HEADERS);
    res.end(JSON.stringify(data));
});

const APP = _http.createServer(SERVER)
const IO = _socket(APP, { cors: { origin: '*' } });

APP.listen(PORT, () => {
    console.info(`Server servin' from good ol' port ${ PORT }`);
});

IO.on('connection', socket => {
    socket.on('add game', () => {
        IO.emit('refresh games');
    });

    socket.on('add message', async data => {
        await new MessageController().createOne(data.message, data.nickname);

        IO.emit('refresh messages');
    })
});

