const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wechat_session', {
    session_key: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "微信小程序会话密钥"
    },
    unionid: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "用户在开放平台的唯一标识符"
    },
    openid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "用户唯一标识"
    }
  }, {
    sequelize,
    tableName: 'wechat_session',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "openid" },
        ]
      },
    ]
  });
};
