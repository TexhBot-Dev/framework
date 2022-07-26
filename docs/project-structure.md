# Project Structure
Projects using the framework should use the file structure as presented here. The naming of folders is really important, as they are used internally.

### Source Directory
For TypeScript project, all the TypeScript files should go in `src`, and all the JavaScript transpiled files should be in `dist`.\
For JavaScript projects, you can either use `src` or `dist` as your base directory.

### Semantic Directories
- The `commands` directory holds the bot's commands.
- The `preconditions` directory holds the bot's preconditions (this folder name can be something else, we do not use it internally).
- ...

### Example Project Structure
```
-> home/someone/myownbot
  -> src/
    -> client.ts
    -> commands/
      -> moderation/
        -> ban.ts
        -> kick.ts
        -> timeout.ts
      -> economy/
        -> balance.ts
        -> share.ts
        -> fish.ts
      -> dev/
        -> eval.ts
    -> preconditions/
      -> ownerOnly.ts
  -> dist/
    -> client.js
    -> commands/
      -> moderation/
        -> ban.js
        -> kick.js
        -> timeout.js
      -> economy/
        -> balance.js
        -> share.js
        -> fish.js
      -> dev/
        -> eval.js
    -> preconditions
      -> ownerOnly.js
```