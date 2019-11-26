const {Command, flags} = require('@oclif/command')
const {getConfig, readJsonFileOrYaml} = require('../../utils')
const axios = require('axios')

class PushCommand extends Command {

  static async pushContract(apiUrlRoot, apiKey, contract, error) {
    try {
      await axios.post(`${apiUrlRoot}/api/services/upload-contract`, contract, {
        headers: {
          'Content-Type': 'text/plain',
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

  async run() {
    const {flags} = this.parse(PushCommand)
    const config = await getConfig(this.config.configDir)
    const apiUrlRoot = process.env.SM_API_URL_ROOT || config.apiUrlRoot || 'https://servicemocks.com'
    const filePath = flags['file-path']
    const apiKey = flags['api-key'] || config.apiKey
    if (!apiKey) {
      this.error('api-key required', 1)
    }
    this.log(`Pushing contract...`)
    const contract = await readJsonFileOrYaml(filePath)
    const successful = await PushCommand.pushContract(apiUrlRoot, apiKey, contract, this.error)
    if (successful) {
      this.log('Successfully pushed contract')
    }
  }
}

PushCommand.description = 'push local swagger spec (.yaml, .json) to servicemocks.com'

PushCommand.flags = {
  'api-key': flags.string({
    char: 'k',
    env: 'SM_API_KEY',
    description: 'servicemocks.com api key. will pull from saved config otherwise specified'
  }),
  'file-path': flags.string({
    required: true,
    char: 'p',
    description: 'file path to contract'
  })
}

module.exports = PushCommand
