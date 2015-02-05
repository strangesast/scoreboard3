var config = {};

config.name = 'Scoreboard';
config.validTypes = ['player', 'game', 'team'];

config.mongoUrl = 'mongodb://127.0.0.1:27017/sb';
config.mongoUrl = 'mongodb://zagrobelny.us:27017/sb';

config.wait = 4000;

config.gameCollectionName = 'games';
config.teamCollectionName = 'teams';
config.playerCollectionName = 'players';
config.regionCollectionName = 'regions';
config.displayCollectionName = 'displays';

module.exports = config;
