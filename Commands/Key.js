
let bot;
module.exports = {
    data : {
        name : "key",
        description : "provides you access to a game key"
    },
    init(botClient) {
        bot = botClient;
    },
    // Convert this to use DMs after
    execute(interaction) {
        if (!checkIsEligible(interaction.user)) return interaction.reply("You already have a key, please contact a moderator or developer if this is not the case.");

        const key = bot.keys.active[0];
        interaction.user.send(``)

    }
}

/**
 * Check if the user already has a key or not
 * @param {} user User to check
 * @returns True/False
 */
function checkIsEligible(user) {
    if (bot.keys.got_key.filter( player => player.id === user.id).size < 1){
        return true;
    }
    return false;
}