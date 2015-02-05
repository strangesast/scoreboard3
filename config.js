var config = {};

config.name = 'Scoreboard';
config.validTypes = ['player', 'game', 'team'];

// Local
//config.mongoUrl = 'mongodb://127.0.0.1:27017/sb';

// Str
//config.mongoUrl = 'mongodb://zagrobelny.us:27017/sb';

config.mongoUrl = 'mongodb://zagrobelny.us:27017/sbtesting';

config.wait = 4000;

config.gameCollectionName = 'games';
config.teamCollectionName = 'teams';
config.playerCollectionName = 'players';
config.regionCollectionName = 'regions';
config.displayCollectionName = 'displays';


config.validTypes = ['event', 'game', 'team', 'player'];

module.exports = config;
