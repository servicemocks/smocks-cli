smocks-cli
========

Manage your servicemocks.com resources locally

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/smocks-cli.svg)](https://npmjs.org/package/smocks-cli)
[![Downloads/week](https://img.shields.io/npm/dw/smocks-cli.svg)](https://npmjs.org/package/smocks-cli)
[![License](https://img.shields.io/npm/l/smocks-cli.svg)](https://github.com/https://github.com/servicemocks/smocks-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g smocks-cli
$ smocks-cli COMMAND
running command...
$ smocks-cli (-v|--version|version)
smocks-cli/1.0.0 darwin-x64 node-v10.16.2
$ smocks-cli --help [COMMAND]
USAGE
  $ smocks-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`smocks-cli config:get`](#smocks-cli-configget)
* [`smocks-cli config:set`](#smocks-cli-configset)
* [`smocks-cli contract:push`](#smocks-cli-contractpush)
* [`smocks-cli help [COMMAND]`](#smocks-cli-help-command)
* [`smocks-cli services:pull`](#smocks-cli-servicespull)
* [`smocks-cli services:push`](#smocks-cli-servicespush)

## `smocks-cli config:get`

get cli config info

```
USAGE
  $ smocks-cli config:get
```

_See code: [src/commands/config/get.js](https://github.com/servicemocks/smocks-cli/blob/v1.0.0/src/commands/config/get.js)_

## `smocks-cli config:set`

set cli config info

```
USAGE
  $ smocks-cli config:set

OPTIONS
  -k, --api-key=api-key            servicemocks.com api key
  -u, --api-url-root=api-url-root  [default: https://servicemocks.com] url to api
```

_See code: [src/commands/config/set.js](https://github.com/servicemocks/smocks-cli/blob/v1.0.0/src/commands/config/set.js)_

## `smocks-cli contract:push`

push local swagger spec (.yaml, .json) to servicemocks.com

```
USAGE
  $ smocks-cli contract:push

OPTIONS
  -k, --api-key=api-key      servicemocks.com api key. will pull from saved config otherwise specified
  -p, --file-path=file-path  (required) file path to contract
```

_See code: [src/commands/contract/push.js](https://github.com/servicemocks/smocks-cli/blob/v1.0.0/src/commands/contract/push.js)_

## `smocks-cli help [COMMAND]`

display help for smocks-cli

```
USAGE
  $ smocks-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `smocks-cli services:pull`

pull and store service definitions locally

```
USAGE
  $ smocks-cli services:pull

OPTIONS
  -a, --all                pull every service w/o prompting
  -d, --work-dir=work-dir  [default: .svcmocks] directory to store services in
  -e, --existing           pull every service already present in services directory
  -i, --indent=indent      [default: 2] spaces applied to service json when saved
  -j, --json               write as json
  -k, --api-key=api-key    servicemocks.com api key. will pull from saved config otherwise specified
  -q, --query=query        text query to check for in service names to narrow results
```

_See code: [src/commands/services/pull.js](https://github.com/servicemocks/smocks-cli/blob/v1.0.0/src/commands/services/pull.js)_

## `smocks-cli services:push`

push local service definitions to servicemocks.com

```
USAGE
  $ smocks-cli services:push

OPTIONS
  -d, --work-dir=work-dir  [default: .svcmocks] directory to store services in
  -f, --force              skip warning prompt
  -k, --api-key=api-key    servicemocks.com api key. will pull from saved config otherwise specified
  -p, --patch              patch services with data specified for each service
```

_See code: [src/commands/services/push.js](https://github.com/servicemocks/smocks-cli/blob/v1.0.0/src/commands/services/push.js)_
<!-- commandsstop -->
