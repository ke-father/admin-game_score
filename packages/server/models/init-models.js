const DataTypes = require("sequelize").DataTypes;
const _game = require("./game");
const _game_category = require("./game_category");
const _person = require("./person");
const _person_follow_game = require("./person_follow_game");
const _person_foul = require("./person_foul");
const _person_score = require("./person_score");
const _system_setting = require("./system_setting");
const _team = require("./team");
const _team_foul = require("./team_foul");
const _team_member = require("./team_member");
const _team_pause = require("./team_pause");
const _team_score = require("./team_score");

function initModels(sequelize) {
  const game = _game(sequelize, DataTypes);
  const game_category = _game_category(sequelize, DataTypes);
  const person = _person(sequelize, DataTypes);
  const person_follow_game = _person_follow_game(sequelize, DataTypes);
  const person_foul = _person_foul(sequelize, DataTypes);
  const person_score = _person_score(sequelize, DataTypes);
  const system_setting = _system_setting(sequelize, DataTypes);
  const team = _team(sequelize, DataTypes);
  const team_foul = _team_foul(sequelize, DataTypes);
  const team_member = _team_member(sequelize, DataTypes);
  const team_pause = _team_pause(sequelize, DataTypes);
  const team_score = _team_score(sequelize, DataTypes);

  person_follow_game.belongsTo(game, { as: "game", foreignKey: "game_id"});
  game.hasMany(person_follow_game, { as: "person_follow_games", foreignKey: "game_id"});
  person_foul.belongsTo(game, { as: "game", foreignKey: "game_id"});
  game.hasMany(person_foul, { as: "person_fouls", foreignKey: "game_id"});
  person_score.belongsTo(game, { as: "game", foreignKey: "game_id"});
  game.hasMany(person_score, { as: "person_scores", foreignKey: "game_id"});
  team_foul.belongsTo(game, { as: "game", foreignKey: "game_id"});
  game.hasMany(team_foul, { as: "team_fouls", foreignKey: "game_id"});
  team_pause.belongsTo(game, { as: "game", foreignKey: "game_id"});
  game.hasMany(team_pause, { as: "team_pauses", foreignKey: "game_id"});
  team_score.belongsTo(game, { as: "game", foreignKey: "game_id"});
  game.hasMany(team_score, { as: "team_scores", foreignKey: "game_id"});
  game.belongsTo(game_category, { as: "category", foreignKey: "category_id"});
  game_category.hasMany(game, { as: "games", foreignKey: "category_id"});
  game.belongsTo(person, { as: "creator", foreignKey: "creator_id"});
  person.hasMany(game, { as: "games", foreignKey: "creator_id"});
  person_follow_game.belongsTo(person, { as: "person", foreignKey: "person_id"});
  person.hasMany(person_follow_game, { as: "person_follow_games", foreignKey: "person_id"});
  person_foul.belongsTo(person, { as: "person", foreignKey: "person_id"});
  person.hasMany(person_foul, { as: "person_fouls", foreignKey: "person_id"});
  person_score.belongsTo(person, { as: "person", foreignKey: "person_id"});
  person.hasMany(person_score, { as: "person_scores", foreignKey: "person_id"});
  team_member.belongsTo(person, { as: "person", foreignKey: "person_id"});
  person.hasMany(team_member, { as: "team_members", foreignKey: "person_id"});
  person_foul.belongsTo(team, { as: "team", foreignKey: "team_id"});
  team.hasMany(person_foul, { as: "person_fouls", foreignKey: "team_id"});
  person_score.belongsTo(team, { as: "team", foreignKey: "team_id"});
  team.hasMany(person_score, { as: "person_scores", foreignKey: "team_id"});
  team_foul.belongsTo(team, { as: "team", foreignKey: "team_id"});
  team.hasMany(team_foul, { as: "team_fouls", foreignKey: "team_id"});
  team_member.belongsTo(team, { as: "team", foreignKey: "team_id"});
  team.hasMany(team_member, { as: "team_members", foreignKey: "team_id"});
  team_pause.belongsTo(team, { as: "team", foreignKey: "team_id"});
  team.hasMany(team_pause, { as: "team_pauses", foreignKey: "team_id"});
  team_score.belongsTo(team, { as: "team", foreignKey: "team_id"});
  team.hasMany(team_score, { as: "team_scores", foreignKey: "team_id"});

  return {
    game,
    game_category,
    person,
    person_follow_game,
    person_foul,
    person_score,
    system_setting,
    team,
    team_foul,
    team_member,
    team_pause,
    team_score,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
