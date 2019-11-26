const {Command, flags} = require('@oclif/command')
const {getConfig, writeFileAsJson, writeFileAsYaml, readFilesAsJson} = require('../../utils')
const axios = require('axios')
const inquirer = require('inquirer')

class PullCommand extends Command {
  static async saveService(service, workDir, spaces, asJson = false) {
    if (asJson) {
      await writeFileAsJson(
        workDir,
        `services/${service.name}.json`,
        service,
        spaces
      )
      return
    }
    await writeFileAsYaml(
      workDir,
      `services/${service.name}.yaml`,
      service,
      spaces
    )
  }

  static async pullServices(apiUrlRoot, apiKey, names = [], error) {
    const namesQueryParam = names.length ? `?names=${names.join(',')}` : ''
    try {
      const resp = await axios.get(`${apiUrlRoot}/api/services/pull/${namesQueryParam}`, {
        headers: {
          'x-api-key': apiKey
        }
      })
      return resp.data
    } catch (e) {
      if (e.response) {
        error(JSON.stringify(e.response.data, null, 2))
      }
    }
  }

  static filterServices(services, query) {
    return services.filter(s => {
      return !query || s.name.indexOf(query) > -1
    })
  }

  static async getExistingServiceNames(workDir) {
    const services = await readFilesAsJson(workDir, 'services')
    return services.map(s => s.name)
  }

  async run() {
    const {flags} = this.parse(PullCommand)
    const config = await getConfig(this.config.configDir)
    const apiUrlRoot = process.env.SM_API_URL_ROOT || config.apiUrlRoot || 'https://servicemocks.com'
    const workDir = flags['work-dir']
    if (!workDir) {
      this.error('work-dir required', 1)
    }
    const apiKey = flags['api-key'] || config.apiKey
    if (!apiKey) {
      this.error('api-key required', 1)
    }
    const query = flags['query']
    const indent = parseInt(flags['indent'])
    const existing = flags['existing']
    const all = flags['all']
    const json = flags['json']
    if (!all && !existing) {
      this.log(`Pulling services...`)
      let services = await PullCommand.pullServices(apiUrlRoot, apiKey, [], this.error)
      if (query) {
        services = PullCommand.filterServices(services, query)
      }
      const answers = await inquirer.prompt({
        type: 'checkbox',
        name: 'services',
        message: 'Select services to pull',
        choices: services.map(s => {
          return {
            name: s.name,
            value: s
          }
        }),
        pageSize: 10
      })
      if (answers.services.length === 0) {
        this.log('No services selected')
      } else {
        answers.services.forEach(s => PullCommand.saveService(s, workDir, indent, json))
        this.log(`Successfully pulled ${answers.services.length} service selections`)
      }
    } else {
      let serviceNames = []
      if (existing) {
        serviceNames = await PullCommand.getExistingServiceNames(workDir)
        if (serviceNames.length === 0) {
          this.warn(`No services currently exist in directory: ${workDir}/services`)
          return
        }
      }
      this.log(`Pulling ${existing ? `${serviceNames.length} existing` : 'all'} services`)
      const services = await PullCommand.pullServices(apiUrlRoot, apiKey, serviceNames, this.error)
      services.forEach(s => PullCommand.saveService(s, workDir, indent, json))
      if (serviceNames.length > 0 && services.length !== serviceNames.length) {
        this.warn(`Your local and remote service counts don't match. Please check for name changes, remote services having been removed, or local services that haven't yet been pushed.`)
        return
      }
      this.log(`Successfully pulled ${services.length} services`)
    }
  }
}

PullCommand.description = 'pull and store service definitions locally'

PullCommand.flags = {
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
  'existing': flags.boolean({
    char: 'e',
    default: false,
    description: 'pull every service already present in services directory'
  }),
  'all': flags.boolean({
    char: 'a',
    default: false,
    description: 'pull every service w/o prompting'
  }),
  'json': flags.boolean({
    char: 'j',
    default: false,
    description: 'write as json'
  }),
  'indent': flags.string({
    char: 'i',
    default: '2',
    description: 'spaces applied to service json when saved'
  }),
  'query': flags.string({
    char: 'q',
    description: 'text query to check for in service names to narrow results'
  })
}

module.exports = PullCommand
