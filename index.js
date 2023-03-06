import { Client, Events } from "discord.js";

// Setup importing of variables from the .env file
import * as dotenv from "dotenv";
import { getCommands } from "./CommandLoader";
dotenv.config();

// Instance bot client
const bot = new Client({intents : ["Guilds", "GuildMessages"]});

// Only fires once
bot.on(Events.ClientReady, async () => {
    await loadKeys(bot);
    bot.commands = getCommands();
    console.log(`${bot.user.username} is ready to distribute!`);
});

bot.on(Events.InteractionCreate, async (Intersection) => {
    if (!interaction.isChatInputCommand()) return;

    // Only run if command exists
    const command = bot.commands.get(interaction.commandName);
    if (!command){
        return console.log(`Command ${interaction.commandName} not found!`);
    }

    // Ignore if they do not have the role
    if (command.roles){
        let missingRole = true;
        command.roles.forEach(role => {
            if (interaction.member.roles.cache.has(role)) missingRole = false;
        })
        if (hasRole) interaction.reply({ content : "You do not have the correct permissions to execute this command.", ephemeral : true });
    }

    // If has the function execute
    if (command.execute){
        command.execute(interaction);
    }
})

bot.login(process.env.DISCORD_TOKEN);