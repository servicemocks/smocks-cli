const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')
const {isFunction} = require('lodash')

const isJson = (file) => {
  const ext = path.extname(file)
  return ext === '.json'
}

const isYaml = (file) => {
  const ext = path.extname(file)
  return ['.yaml', '.yml'].includes(ext)
}

module.exports.getConfig = async (configDir) => {
  const configFilePath = path.join(configDir, 'config.json')
  const exists = fs.existsSync(configFilePath)
  if (!exists) {
    return {}
  }
  return fs.readJSON(configFilePath)
}

module.exports.setConfig = async (configDir, config) => {
  const configFilePath = path.join(configDir, 'config.json')
  return fs.outputJSON(configFilePath, config, {spaces: 2})
}

module.exports.writeFileAsJson = async (workDir, filePath, json, indent = 2) => {
  return fs.outputJSON(path.join(workDir, filePath), json, {spaces: indent})
}

module.exports.writeFileAsYaml = async (workDir, filePath, json, indent = 2) => {
  return fs.writeFile(path.join(workDir, filePath), yaml.safeDump(json, {indent}))
}

module.exports.readFile = async (filePath) => {
  return fs.readFile(filePath, 'utf8')
}

module.exports.readJsonFile = async (filePath) => {
  return fs.readJSON(filePath)
}

module.exports.readYamlFile = async (filePath) => {
  return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))
}

module.exports.readJsonFileOrYaml = async (filePath, checkExists = true) => {
  if (checkExists) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`${filePath} not found`)
    }
  }
  if (!isJson(filePath) && !isYaml(filePath)) {
    throw new Error('File must be json or yaml')
  }
  return this.readFile(filePath)
}

module.exports.readFilesAsJson = async (workDir, subPath = '') => {
  const dir = path.join(workDir, subPath)
  if (!fs.existsSync(dir)) {
    return []
  }
  const files = fs.readdirSync(dir)
  return Promise.all(files
    .filter(file => isYaml(file) || isJson(file))
    .map(file => {
      const filePath = path.join(dir, file)
      if (isJson(file)) {
        return this.readJsonFile(filePath)
      }
      if (isYaml(file)) {
        return this.readYamlFile(filePath)
      }
    }))
}

module.exports.extractScriptContent = async (workDir, scriptPath) => {
  const scriptModulePath = path.resolve(path.join(workDir, 'scripts'))
  require('app-module-path').addPath(scriptModulePath)
  const contentOrFunc = require(scriptPath)
  if (isFunction(contentOrFunc)) {
    const functionText = contentOrFunc.toString()
    return functionText.substring(functionText.indexOf("{") + 1, functionText.lastIndexOf("}"))
  }
  return contentOrFunc
}

