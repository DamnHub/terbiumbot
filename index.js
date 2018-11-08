require('colors');
const telegraf = require('telegraf');
const session = require('telegraf/session');
const requireDir = async (...args) => require('require-dir')(...args);
const core = require('./core');
const config = require('./config.json');
const plugins = require('./plugins.json');
// Database
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URL, { useNewUrlParser: true });


(async () => {
    const bot = new telegraf(config.BOT_TOKEN, {
        username: config.BOT_USERNAME
    }).startPolling();
    global.Terbium = bot;
    plugins.plugins.forEach((plugin) => {
        try {
            require('./plugins/' + plugin)();
        } catch (e) {
            console.log("[ERR] Couldn't load ".red.bold + `"${plugin.yellow.bold}"`);
        }
    })
})();