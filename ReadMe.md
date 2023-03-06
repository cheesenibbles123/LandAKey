# Keybot

On first setup need to create a `.env` file, the template for it is shown below:
```sh
DISCORD_TOKEN=
CLIENT_ID=
GUILD_ID=
```

As well as modify the following parameters in the `config.json` file:
```json
{
    "ROLES" : {
        "ELIGIBLE" : "ROLE_THAT_CAN_GET_IT"
    },
    "CHANNELS" : {
        "GET_KEY" : "VALID_CHANNEL_THAT_MESSAGE_CAN_BE_SENT_IN"
    }
}
```


## Commands

Commands are housed inside the **Commands** folder, where they can be created using the template:
Files that don't end in `cjs`, `js` or start with a `_` will be ignored.


```js
module.exports = {
    data : {
        name : "COMMAND_NAME_HERE",
        description : "COMMAND_DESCRIPTION_HERE",
        roles : ["ALLOWED_ROLE_IDS"],
        execute(interaction) {
            // Code goes here
        }
    }
}
```