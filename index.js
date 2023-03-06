import { Client, Events } from "discord.js";
import  { getCommands } from "./CommandLoader.cjs";
import keyLoader from "./KeyLoader.cjs";

// Setup importing of variables from the .env file
import * as dotenv from "dotenv";
dotenv.config();

// Instance bot client
const bot = new Client({intents : ["Guilds", "GuildMessages"]});

// Only fires once
bot.on(Events.ClientReady, async () => {
    keyLoader.loadKeys(bot);
    bot["commands"] = getCommands(bot);
    console.log(`${bot.user.username} is ready to distribute!`);
});

bot.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (config.CHANNELS_GET_KEY !== "" && interaction.channel !== config.CHANNELS_GET_KEY) return interaction.reply({ content : `Please use this command in the appropriate channel: <#${config.CHANNELS_GET_KEY}>`, ephemeral : true });
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
        if (missingRole) return interaction.reply({ content : "You do not have the correct permissions to execute this command.", ephemeral : true });
    }

    // If has the function execute
    if (command.execute){
        command.execute(interaction);
    }
})

bot.login(process.env.DISCORD_TOKEN);