import * as fs from "fs";
import * as path from "path";
import { Collection, REST, Routes} from "discord.js";

/**
 * Returns all commands to append to the bot
 * @returns Collection of commands <name, command>
 */
export function getCommands() {
    let commandsToRegister = [];

    const commandsPath = path.join(__dirname, "Commands");
    const commandFiles = fs.readdirSync(commandsPath).filter( file => file.endsWith(".js") && !file.startsWith('_'));

    const commands = new Collection();

    for (const file of commandFiles){
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command){
            commands.set(command.data.name, command);
            commandsToRegister.push(command.data);
        }else{
            console.log(`Error loading command ${command.data.name}, please check it has a "data" field and "execute" function!`);
        }
    }

    registerSlashCommands(commandsToRegister);

}

function registerSlashCommands(commandsToRegister){
    REST.captureRejectionSymbol(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body : commandsToRegister }
    )
}