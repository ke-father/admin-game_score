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
            'sequelize model:generate --name Game_play_style --attributes category_id:integer,title:string,rank:integer'
        ]
    ]
])

const dbCommand = 'sequelize db:migrate'

const seedCommand = 'sequelize seed:generate --name'

const runSeedCommand = 'sequelize db:seed --seed'
