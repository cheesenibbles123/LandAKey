const fs = require("fs");
const path = require("path");
const { Collection, REST, Routes} = require("discord.js");

module.exports = {
    /**
     * Returns all commands to append to the bot
     * @returns Collection of commands <name, command>
     */
    getCommands(bot) {
        let commandsToRegister = [];
        const commandsPath = path.join(__dirname, "./Commands");
        const commandFiles = fs.readdirSync(commandsPath).filter( file => (file.endsWith(".js") || file.endsWith(".cjs") ) && !file.startsWith('_'));

        const commands = new Collection();

        for (const file of commandFiles){
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ("data" in command && "execute" in command){
                commands.set(command.data.name, command);
                if (command.init){
                    command.init(bot);
                }
                commandsToRegister.push(command.data);
            }else{
                console.log(`Error loading command ${command.data.name}, please check it has a "data" field and "execute" function!`);
            }
        }

        registerSlashCommands(commandsToRegister);
        return commands;
    }
}

function registerSlashCommands(commandsToRegister){
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body : commandsToRegister }
    )
}