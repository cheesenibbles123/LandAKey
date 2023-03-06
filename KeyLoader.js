import * as fs from 'fs';
import { KEY_PATH } from './config.json';


module.exports = {
    async loadKeys(bot) {
        return new Promise( async (resolve, reject) => {
            await getDataFromFile(KEY_PATH.FOLDER + KEY_PATH.ACTIVE).then(data => {
                if (data.length < 1) return;
                bot['keys']['active'] = data.split("\n");
            });
            await getDataFromFile(KEY_PATH.FOLDER + KEY_PATH.GOT_KEY).then(data => {
                if (data.length < 1) return;
                bot['keys']['gotKey'] = data.split("\n").map( inString => {
                    const fields = inString.split(" ");
                    return {
                        id : fields[0],
                        key : fields[1]
                    }
                });
            });
            resolve();
        })
    },
    updateKeys(newUserId, key) {
        bot.keys.gotKey.push({
            id : newUserId,
            key : key
        });

        fs.writeFile(KEY_PATH.ACTIVE, bot.keys.active.join("\n"), err => {
            if (err) console.error(err);
        });
        fs.writeFile(KEY_PATH.GOT_KEY, bot.keys.gotKey.map(user => {
            return `${user.id} ${user.key}`;
        }).join("\n"), err => {
            if (err) console.error(err);
        });

    }
}

function getDataFromFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFileSync(filePath, (data, err) => {
            if (err) {
                console.log(`Error loading: ${filePath}`);
                console.log(err);
                resolve("");
            };
            resolve(data);
        })
    })
}