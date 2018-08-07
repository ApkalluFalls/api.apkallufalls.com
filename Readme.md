# api.apkallufalls.com

**This is a work-in-progress. Version 2 of Apkallu Falls will hopefully be launched some time around December/January. This is the initial step towards creating version 2 and is in an incomplete state.**

**Note: Due to a change between version 2 and version 3 of XIVDB's API, an API key is now required to update lists. In order to execute some of the scripts in this repository, you'll need to get an API key from XIVDB first, then store it in a text file on the root-level folder called `xivapi-key.txt`.**

This is a mock API for Apkallu Falls. From version 2 onwards, the data Apkallu Falls loads will be maintained within this repository instead of being bundled in with the rest of the site's code.

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
npm update.js achievements
```

##### Only the list
```
npm update.js achievementsList
```

#### Minions

##### Everything
```
npm update.js minions
```

##### Only the list
```
npm update.js minionsList
```

#### Mounts

##### Everything
```
npm update.js mounts
```

##### Only the list
```
npm update.js mountsList
```

#### Icons

##### Everything
```
npm update.js icons
```