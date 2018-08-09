# api.apkallufalls.com

**Note: Due to a change between XIVDB's API and XIVAPI an API key is now required to run any update scripts. For this, you'll need to register an API key on XIVAPI first, then store it in a text file on the root-level folder called `xivapi-key.txt`.**

This is a mock API for Apkallu Falls. From version 2 onwards, the data Apkallu Falls loads is maintained within this repository instead of being bundled in with the rest of the site's code. The exception to this being character info, as that data is not static.

This benefit of this is that anyone can now update the site's content by cloning the repository and creating a pull request, although I don't expect anyone to actually do that other than myself!

## Structure

This repository has 3 core folders:

### docs

This contains a load of JSON data which Apkallu Falls relies upon.

### filters

This contains scripts which alter the generated API in some way.

### scripts

This contains a set of JavaScript files which can be used to populate the `api` folder.

## Setup

You'll need Node version 8 or higher installed before you can do anything here (as this relies on nifty `async` functionality from ES6).

Pointing to the top-level folder, run:

```
npm install
```

## Execution

To update the `api` folder, open a terminal and point to the `scripts` folder.

### Updating everything

To update everything in one go, run:

```
node update.js
```

This process will take around 15 minutes.

### Updating individual parts

If you don't want to wait 15 minutes for everything to process, individual sections can be updated.

#### Patches

```
npm update.js patches
```

#### Achievements

##### Everything
```
npm update.js achievementsV3
```

##### Only the list
```
npm update.js achievementsListV3
```

#### Minions

##### Everything
```
npm update.js minionsV3
```

##### Only the list
```
npm update.js minionsListV3
```

#### Mounts

##### Everything
```
npm update.js mountsV3
```

##### Only the list
```
npm update.js mountsListV3
```

#### Emotes

##### Everything
```
npm update.js emotesV3
```

##### Only the list
```
npm update.js emotesListV3
```

#### Icons

##### Everything
```
npm update.js iconsV3
```
