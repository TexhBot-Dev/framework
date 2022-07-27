# Getting Started

### Install

```sh
npm install discord.js pkgname
```

### Setting Up A Bot

1. Create a `src` folder.
2. Create a file for creating a new client.
3. Input the following to get started:

```ts
import { Client, GatewayIntentBits } from "discord.js";
import { TechClient } from "pkgname";

const client = new TechClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.login("token");
```
