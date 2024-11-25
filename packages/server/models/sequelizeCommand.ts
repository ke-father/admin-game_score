const command = new Map<string, object>([
    [
        'wechat_session',
        [
            'sequelize model:generate --name Wechat_session --attributes openid:string,session_key:string,unionid:string'
        ]
    ],
    [
        'game_category',
        [
            'sequelize model:generate --name Game_category --attributes title:string,rank:integer'
        ]
    ],
    [
        'Game_play_style',
        [
            'sequelize model:generate --name Game_play_style --attributes categoryId:integer,title:string,rank:integer'
        ]
    ],
    [
        'Game',
        [
            'sequelize model:generate --name Game --attributes categoryId:integer,gamePlayStyleId:integer,name:string,logo:string,signature:text,description:text'
        ]
    ],
    [
        'Team',
        [
            'sequelize model:generate --name Team --attributes gameId:integer,name:string,logo:string,signature:string,description:text,rank:integer,score:integer,foul:integer,pause:integer'
        ]
    ],
    [
        'Team_member',
        [
            'sequelize model:generate --name Team_member --attributes teamId:integer,name:string'
        ]
    ]
])

const dbCommand = 'sequelize db:migrate'

const seedCommand = 'sequelize seed:generate --name'

const runSeedCommand = 'sequelize db:seed --seed'
