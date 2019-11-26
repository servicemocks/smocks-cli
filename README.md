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
$ npm install -g svcmocks
$ svcmocks COMMAND
running command...
$ svcmocks (-v|--version|version)
svcmocks/1.0.0 darwin-x64 node-v10.16.2
$ svcmocks --help [COMMAND]
USAGE
  $ svcmocks COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`svcmocks config:get`](#svcmocks-configget)
* [`svcmocks config:set`](#svcmocks-configset)
* [`svcmocks contract:push`](#svcmocks-contractpush)
* [`svcmocks help [COMMAND]`](#svcmocks-help-command)
* [`svcmocks services:pull`](#svcmocks-servicespull)
* [`svcmocks services:push`](#svcmocks-servicespush)

## `svcmocks config:get`

get cli config info

```
USAGE
  $ svcmocks config:get
```

_See code: [src/commands/config/get.js](https://github.com/servicemocks/svcmocks/svcmocks/blob/v1.0.0/src/commands/config/get.js)_

## `svcmocks config:set`

set cli config info

```
USAGE
  $ svcmocks config:set

OPTIONS
  -k, --api-key=api-key            servicemocks.com api key
  -u, --api-url-root=api-url-root  [default: https://servicemocks.com] url to api
```

_See code: [src/commands/config/set.js](https://github.com/servicemocks/svcmocks/svcmocks/blob/v1.0.0/src/commands/config/set.js)_

## `svcmocks contract:push`

push local swagger spec (.yaml, .json) to servicemocks.com

```
USAGE
  $ svcmocks contract:push

OPTIONS
  -k, --api-key=api-key      servicemocks.com api key. will pull from saved config otherwise specified
  -p, --file-path=file-path  (required) file path to contract
```

_See code: [src/commands/contract/push.js](https://github.com/servicemocks/svcmocks/svcmocks/blob/v1.0.0/src/commands/contract/push.js)_

## `svcmocks help [COMMAND]`

display help for svcmocks

```
USAGE
  $ svcmocks help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `svcmocks services:pull`

pull and store service definitions locally

```
USAGE
  $ svcmocks services:pull

OPTIONS
  -a, --all                pull every service w/o prompting
  -d, --work-dir=work-dir  [default: .svcmocks] directory to store services in
  -e, --existing           pull every service already present in services directory
  -i, --indent=indent      [default: 2] spaces applied to service json when saved
  -j, --json               write as json
  -k, --api-key=api-key    servicemocks.com api key. will pull from saved config otherwise specified
  -q, --query=query        text query to check for in service names to narrow results
```

_See code: [src/commands/services/pull.js](https://github.com/servicemocks/svcmocks/svcmocks/blob/v1.0.0/src/commands/services/pull.js)_

## `svcmocks services:push`

push local service definitions to servicemocks.com

```
USAGE
  $ svcmocks services:push

OPTIONS
  -d, --work-dir=work-dir  [default: .svcmocks] directory to store services in
  -f, --force              skip warning prompt
  -k, --api-key=api-key    servicemocks.com api key. will pull from saved config otherwise specified
  -p, --patch              patch services with data specified for each service
```

_See code: [src/commands/services/push.js](https://github.com/servicemocks/svcmocks/svcmocks/blob/v1.0.0/src/commands/services/push.js)_
<!-- commandsstop -->
