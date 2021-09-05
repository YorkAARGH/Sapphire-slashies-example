# Example Bot

This Sapphire bot is to demonstrate the most basic of ways to get slash commands  
working within the Sapphire framework.  

Before you run the `npm install` command, please rename the `.env-example` file inside the  
`./src/` folder to `.env` and put in your Discord bot token, then you will need to  
invite your bot to your server with the `applications.commands` scope **first** otherwise  
you won't be able to create slash commands.  

Just copy this link and replace `<BOTID>` with your bot's ID number.  
`https://discord.com/api/oauth2/authorize?client_id=<BOTID>&permissions=0&scope=bot%20applications.commands`  

## YOU DO NOT NEED TO KICK YOUR BOT TO INVITE IT FOR THE CORRECT SCOPE

If everything goes smoothly and correctly, you should be greeted with this when you run your bot.  

```asciidoc
    _______  __ ___    __  _______  __    ______
   / ____/ |/ //   |  /  |/  / __ \/ /   / ____/       </> DEVELOPMENT MODE
  / __/  |   // /| | / /|_/ / /_/ / /   / __/          1.0.0
 / /___ /   |/ ___ |/ /  / / ____/ /___/ /___          [+] Gateway
/_____//_/|_/_/__|_/_/__/_/_/___/_____/_____/
              / __ )/ __ \/_  __/
 ____________/ __  / / / / / /___________
/_____/_____/ /_/ / /_/ / / /_____/_____/
           /_____/\____/ /_/
2021-09-05 23:16:45 - INFO  - ├─ Loaded 23  arguments.
2021-09-05 23:16:45 - INFO  - ├─ Loaded 0   commands.
2021-09-05 23:16:45 - INFO  - ├─ Loaded 10  listeners.
2021-09-05 23:16:45 - INFO  - ├─ Loaded 13  preconditions.
2021-09-05 23:16:45 - INFO  - └─ Loaded 1   slashCommands.
```
