import * as config from "./config.json";

let bot;
module.exports = {
    data : {
        name : "key",
        description : "provides you access to a game key"
    },
    roles : [config.ROLES.ELIGIBLE],
    init(botClient) {
        bot = botClient;
    },
    // Convert this to use DMs after
    execute(interaction) {
        const user = interaction.user;

        if (!isDmOpen(user)) return interaction.reply(config.MESSAGES.DM_CLOSED)
        if (!checkIsEligible(user)) return interaction.reply(config.MESSAGES.HAS_KEY_ALREADY);

        const key = bot.keys.active[0];
        bot.keys.active.shift();
        
        const keyEmbed = {
            title : config.MESSAGES.KEY_EMBED_TITLE,
            description: config.MESSAGES.KEY_EMBED_DESCRIPTION + `\n||${key}||`,
            thumbnail : {
                url : config.MESSAGES.KEY_EMBED_THUMBNAIL
            }
        }

        user.send({ embeds: [keyEmbed] });
    }
}

/**
 * Check if the user already has a key or not
 * @param {*} user User to check
 * @returns True/False
 */
function checkIsEligible(user) {
    if (bot.keys.got_key.filter( player => player.id === user.id).size < 1){
        return true;
    }
    return false;
}

/**
 * Checks if a users DMs are open or not
 * @param {*} user 
 * @returns True/False
 */
async function isDmOpen(user) {
    await user.send("Processing your key application....").catch(err => { return false });
    return true;
}
