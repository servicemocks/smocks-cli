const {Command, flags} = require('@oclif/command')
const {getConfig, setConfig} = require('../../utils')

class SetCommand extends Command {
  async run() {
    const {flags} = this.parse(SetCommand)
    const config = await getConfig(this.config.configDir)
    config.apiKey = flags['api-key']
    config.apiUrlRoot = flags['api-url-root']
    await setConfig(this.config.configDir, config)
  }
}

SetCommand.description = 'set cli config info'

SetCommand.flags = {
  'api-key': flags.string({
    char: 'k',
    description: 'servicemocks.com api key'
  }),
  'api-url-root': flags.string({
    char: 'u',
    default: 'https://servicemocks.com',
    description: 'url to api'
  })
}

module.exports = SetCommand
