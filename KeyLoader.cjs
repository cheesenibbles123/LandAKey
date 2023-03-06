const fs = require('fs');
const config = require('./config.json');

let bot;
module.exports = {
    loadKeys(botClient) {

        botClient['keys'] = {}

        let data = getDataFromFile(config.KEY_PATHS.FOLDER + config.KEY_PATHS.ACTIVE)
        botClient.keys['active'] = []
        if (data.length >= 1){
            botClient.keys.active = data.split("\n");
        }

        data = getDataFromFile(config.KEY_PATHS.FOLDER + config.KEY_PATHS.GOT_KEY)
        botClient.keys["gotKey"] = [];
        if (data.length >= 1){
            botClient.keys.gotKey = data.split("\n").map( inString => {
                const fields = inString.split(" ");
                return {
                    id : fields[0],
                    key : fields[1]
                }
            });
        }
        bot = botClient;
    },
    updateKeys(newUserId, key) {
        bot.keys.gotKey.push({
            id : newUserId,
            key : key
        });
        fs.writeFile(config.KEY_PATHS.FOLDER + config.KEY_PATHS.ACTIVE, bot.keys.active.join("\n"), err => {
            if (err) console.error(err);
        });
        fs.writeFile(config.KEY_PATHS.FOLDER + config.KEY_PATHS.GOT_KEY, bot.keys.gotKey.map(user => {
            return `${user.id} ${user.key}`;
        }).join("\n"), err => {
            if (err) console.error(err);
        });

    }
}


function getDataFromFile(filePath) {
    return fs.readFileSync(filePath).toString().replace(/\r/g, '');
}