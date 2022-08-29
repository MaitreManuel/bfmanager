const SOCKET = io('http://localhost:5000/');

const createGame = players => {
    fetch('http://localhost:5000/game/create', {
        method: 'POST',
        body: JSON.stringify({
            players: players
        })
    })
        .then(() => {
            SOCKET.emit('add game');
        })
    ;
};

const deleteGame = id => {
    fetch('http://localhost:5000/game/delete', {
        method: 'POST',
        body: JSON.stringify({
            id: id
        })
    })
        .then(() => {
            SOCKET.emit('add game');
        })
    ;
};

const finishedGame = id => {
    fetch('http://localhost:5000/game/update', {
        method: 'POST',
        body: JSON.stringify({
            id: id,
            finished: true
        })
    })
        .then(() => {
            SOCKET.emit('add game');
        })
    ;
};

const getGames = () => {
    fetch('http://localhost:5000/game/read', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(result => {
            let games = result.data;
            let gamesFinished = 0;
            let html = '';

            for (let i = 0; i < games.length; i++) {
                html += '' +
                    '<div class="game"><span class="'+ (games[i].finished === true ? "already-finished" : "finished") +'" data-id="'+ games[i].id +'">V</span> '+ games[i].players +' <span class="delete" data-id="'+ games[i].id +'">X</span></div>' +
                    '';

                if (games[i].finished === true) gamesFinished +=1;
            }

            document.querySelector('#counter').innerText = gamesFinished;
            document.querySelector('#games').innerHTML = html;

            setListener();
        })
        .catch(err => {
            console.error(err)
        })
    ;
};

const getMessages = () => {
    fetch('http://localhost:5000/message/read', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(result => {
            let messages = result.data;
            let html = '';

            for (let i = 0; i < messages.length; i++) {
                html += '' +
                    '<div class="one-message"><span class="msg-nickname">'+ messages[i].nickname +' :</span> '+ messages[i].message +'</div>' +
                    '';
            }

            document.querySelector('#messages').innerHTML = html;
        })
        .catch(err => {
            console.error(err)
        })
    ;
};

const setListener = () => {
    const DELETE_BTNS = document.querySelectorAll('.delete');
    const FINISHED_BTNS = document.querySelectorAll('.finished');

    for (let i = 0; i < DELETE_BTNS.length; i++) {
        DELETE_BTNS[i].addEventListener('click', () => {
            deleteGame(DELETE_BTNS[i].getAttribute('data-id'));
        });
    }

    for (let i = 0; i < FINISHED_BTNS.length; i++) {
        FINISHED_BTNS[i].addEventListener('click', () => {
            finishedGame(FINISHED_BTNS[i].getAttribute('data-id'));
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const MSG_INPUT = document.querySelector('#message');
    const PLAYERS_INPUT = document.querySelector('#players');

    const ADD_GAME_ACTION = () => {
        const PLAYERS = document.querySelector('#players');

        if (PLAYERS.value) {
            createGame(PLAYERS.value);
            PLAYERS_INPUT.value = '';
        } else {
            alert('Rentrez d\'abord les noms de joueurs !');
        }
    };

    const ADD_MSG_ACTION = () => {
        const MESSAGE = document.querySelector('#message');
        const NICKNAME = document.querySelector('#nickname');

        if (MESSAGE.value && NICKNAME.value) {
            SOCKET.emit('add message', { message: MESSAGE.value, nickname: NICKNAME.value });
            MSG_INPUT.value = '';
        } else {
            alert('Rentrez un pseudo et un message avant !');
        }
    };

    getGames();
    getMessages();

    SOCKET.on('refresh games', () => {
        console.log('refresh games');
        getGames();
    });

    SOCKET.on('refresh messages', () => {
        console.log('refresh messages');
        getMessages();
    });

    document.querySelector('#add-game').addEventListener('click', () => {
        ADD_GAME_ACTION();
    });

    PLAYERS_INPUT.addEventListener('keyup', event => {
        event.preventDefault();

        if (event.keyCode === 13) { // "Enter" on keyboard
            ADD_GAME_ACTION();
        }
    });

    document.querySelector('#add-message').addEventListener('click', () => {
        ADD_MSG_ACTION();
    });

    MSG_INPUT.addEventListener('keyup', event => {
        event.preventDefault();

        if (event.keyCode === 13) {
            ADD_MSG_ACTION();
        }
    });
});
