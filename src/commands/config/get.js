const {Command} = require('@oclif/command')
const {getConfig} = require('../../utils')

class GetCommand extends Command {
  async run() {
    this.parse(GetCommand)
    const config = await getConfig(this.config.configDir)
    this.log(`${JSON.stringify(config, null, 2)}`)
  }
}

GetCommand.description = 'get cli config info'

module.exports = GetCommand
