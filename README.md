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
* [`smocks-cli config:set`](#smocks-cli-hello)
* [`smocks-cli config:get`](#smocks-cli-hello)
* [`smocks-cli services:pull`](#smocks-cli-hello)
* [`smocks-cli services:push`](#smocks-cli-hello)
* [`smocks-cli contract:push`](#smocks-cli-hello)
* [`smocks-cli help [COMMAND]`](#smocks-cli-help-command)

## `smocks-cli config:set`

set cli config info

```
USAGE
  $ smocks-cli config:set

OPTIONS
  -k, --api-key=api-key            servicemocks.com api key
  -u, --api-url-root=api-url-root  [default: https://servicemocks.com] url to api

DESCRIPTION
  This information is used by default if the options are not 
  provided to the other CLI commands
```

_See code: [src/commands/hello.js](https://github.com/servicemocks/smocks-cli/blob/src/commands/config/set.js)_

## `smocks-cli config:get`

get cli config info

```
USAGE
  $ smocks-cli config:get

DESCRIPTION
  Displays existing config info
```

_See code: [src/commands/hello.js](https://github.com/servicemocks/smocks-cli/blob/src/commands/config/get.js)_

## `smocks-cli services:pull`

pull and store service definitions locally

```
USAGE
  $ smocks-cli services:pull

OPTIONS
  -a, --all                        pull every service w/o prompting
  -d, --work-dir=work-dir          [default: .svcmocks] directory to store services in
  -e, --existing                   pull every service already present in services directory
  -i, --indent=indent              [default: 2] spaces applied to service json when saved
  -j, --json                       write as json
  -k, --api-key=api-key            servicemocks.com api key. will pull from saved config otherwise specified
  -q, --query=query                text query to check for in service names to narrow results

DESCRIPTION
  Pulls service definitions from servicemocks.com and stores them
  in a working directory of your choosing. You can store these 
  definitions as .yaml or .json.
```

_See code: [src/commands/hello.js](https://github.com/servicemocks/smocks-cli/blob/src/commands/services/pull.js)_

## `smocks-cli services:push`

push local service definitions to servicemocks.com

```
USAGE
  $ smocks-cli services:push

OPTIONS
  -d, --work-dir=work-dir          [default: .svcmocks] directory to store services in
  -f, --force                      skip warning prompt
  -k, --api-key=api-key            servicemocks.com api key. will pull from saved config otherwise specified
  -p, --patch                      patch services with data specified for each service

DESCRIPTION
  WARNING!!!
  If you choose to use the default behavior of a push it will
  match existing, remote services by name, delete them and then
  insert the new service definition you have locally. If you wish
  to avoid this behavior use --patch instead. However, patching
  will require that you handle all removals from the Console or API
  given removals are not supported via --patch 

  PATCH LOGIC
  Note that when patching the logic will match services, versions, 
  and environment objects by name. It will match resources by  
  verb/path and it will match responses by name/status. Any local
  objects in the service definition that don't have a matching 
  remote counterpart will be added as a new item to their parent

  VALIDATION
  When pushing service definitions locally they will be validated 
  the same as they are in the Console or API. This will include the 
  following checks

  1. No duplicate service names  
  2. No duplicate version names 
  3. No duplicate environment names
  4. No duplicate resource verb/path combos
  5. No duplicate response name/status combos
  6. And service, version, environemnt, resource, and response
     schema validations for required fields, data types
     and so on
  
  LOCAL RESPONSE SCRIPT INLINING
  Also, this command will inline response scripts from modules 
  you expose in the --work-dir /scripts directory. You can refer
  to any script in this directory by using this syntax
  '${<some>/<path>/<module>.js}' in place of plain script
  text in your responses of any service definition you are 
  managing locally. For example script: '${/foo/baz.js}' would
  be required from '/<work-dir>/scripts/foo/baz.js'

```

_See code: [src/commands/hello.js](https://github.com/servicemocks/smocks-cli/blob/src/commands/services/push.js)_

## `smocks-cli contract:push`

push local swagger spec (.yaml, .json) to servicemocks.com

```
USAGE
  $ smocks-cli contract:push

OPTIONS

DESCRIPTION
  Pushing your contract will create/update resources and responses
  that are specificed in the contract. If you are also managing
  your service definitions via local service definitions you will
  need to check that your service definitions align with your 
  contract definition so they do not create conflicting or 
  undesired resources and responses on servicemocks.com

  See the service:push description above to understand how services
  are matched if patching. If you are replacing services in the
  service:push its advisable to first push your service definitions
  followed by the contract w/ this command. The contract resources
  and responses wll be merged with existing, remote resources and
  responses created from the services:push command 
  
```

_See code: [src/commands/hello.js](https://github.com/servicemocks/smocks-cli/blob/src/commands/contract/push.js)_


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
<!-- commandsstop -->
