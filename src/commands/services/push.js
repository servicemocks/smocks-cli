const {Command, flags} = require('@oclif/command')
const {set} = require('lodash')
const {getConfig, readFilesAsJson, extractScriptContent} = require('../../utils')
const axios = require('axios')
const inquirer = require('inquirer')

class PushCommand extends Command {
  static async pushServices(apiUrlRoot, apiKey, services = [], patch = false, error) {
    try {
      await axios.post(`${apiUrlRoot}/api/services/push`, {services, patch}, {
        headers: {
          'x-api-key': apiKey
        }
      })
      return true
    } catch (e) {
      if (e.response) {
        return error(JSON.stringify(e.response.data, null, 2))
      }
      error(e.toString())
    }
  }

  static async getExistingServices(workDir) {
    return readFilesAsJson(workDir, 'services')
  }

  static async inlineScripts(workDir, services) {
    const scriptOps = []
    services.forEach((service, si) => {
      if (!service.versions) {
        return
      }
      service.versions.forEach((version, vi) => {
        if (!version.environments) {
          return
        }
        version.environments.forEach((environment, ei) => {
          if (!environment.resources) {
            return
          }
          environment.resources.forEach((resource, resi) => {
            if (!resource.responses) {
              return
            }
            resource.responses.forEach((response, respi) => {
              if (response.script && response.script.startsWith('${') && response.script.endsWith('}')) {
                const path = response.script.replace('${', '').replace('}', '')
                scriptOps.push({
                  serviceIndex: si,
                  path: `versions[${vi}].environments[${ei}].resources[${resi}].responses[${respi}].script`,
                  op: extractScriptContent(workDir, path)
                })
              }
            })
          })
        })
      })
    })
    const scripts = await Promise.all(scriptOps.map(s => s.op))
    scripts.forEach((script, i) => {
      const serviceOp = scriptOps[i]
      const {serviceIndex, path} = serviceOp
      const service = services[serviceIndex]
      set(service, path, script)
    })
    return services
  }

  async run() {
    const {flags} = this.parse(PushCommand)
    const apiUrlRoot = process.env.SM_API_URL_ROOT || config.apiUrlRoot || 'https://servicemocks.com'
    const config = await getConfig(this.config.configDir)
    const workDir = flags['work-dir']
    if (!workDir) {
      this.error('work-dir required', 1)
    }
    const apiKey = flags['api-key'] || config.apiKey
    if (!apiKey) {
      this.error('api-key required', 1)
    }
    const patch = flags['patch']
    const force = flags['force']
    if (!patch && !force) {
      const prompt = await inquirer.prompt({
        type: 'confirm',
        name: 'confirmed',
        message: 'Pushing local changes will overwrite remote changes. Are you sure you want to continue?'
      })
      if (!prompt.confirmed) {
        this.log('Cancelling services:push command.')
        return
      }
    }

    let services = await PushCommand.getExistingServices(workDir)
    services = await PushCommand.inlineScripts(workDir, services)
    this.log(`Pushing ${services.length} services....`)
    const successful = await PushCommand.pushServices(apiUrlRoot, apiKey, services, patch, this.error)
    if (successful) {
      this.log('Successfully pushed services')
    }
  }
}

PushCommand.description = 'push local service definitions to servicemocks.com'

PushCommand.flags = {
  'api-key': flags.string({
    char: 'k',
    env: 'SM_API_KEY',
    description: 'servicemocks.com api key. will pull from saved config otherwise specified'
  }),
  'work-dir': flags.string({
    char: 'd',
    default: '.svcmocks',
    description: 'directory to store services in'
  }),
  'patch': flags.boolean({
    char: 'p',
    default: false,
    description: 'patch services with data specified for each service'
  }),
  'force': flags.boolean({
    char: 'f',
    default: false,
    description: 'skip warning prompt'
  })
}

module.exports = PushCommand
