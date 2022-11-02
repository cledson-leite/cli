import  * as fs from 'fs'
import path from 'path'
import {promisify} from 'util'
import execa from 'execa'
import Listr from 'listr'
import {projectInstall} from 'pkg-install'

const access = promisify(fs.access)
const copy = promisify(fs.copyFile)

type Options = {
  skipPrompts: boolean;
  git: boolean;
  template: string;
  templateDirectory: string;
  targetDirectory: string;
  runInstall: boolean;
}

const copyTemplateFiles = (options: Options) => {
  return copy(
    options.templateDirectory,
    options.targetDirectory
  )
}

// const initGit = async (options) => {
//   const result = await execa('git', ['init'], {
//     cwd: options.targetDirectory
//   })
//   if (result.failed) {
//     return Promise.reject(new Error('Failed to initialize git'))
//   }
//   return
// }

export const createProject = async (options: Options) => {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  }

  const templateDir = path.resolve(
    __dirname,
    `../template/`,
  )
  options.templateDirectory = templateDir

  try { 
    await access(templateDir, fs.constants.R_OK)
  } catch (err) {
    // console.error('Invalid template name')
    console.error(err)
    process.exit(1)
  }

  // copyTemplateFiles(options)
  // console.log('%s Copy project files')
  const task = new Listr([
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(options)
    },
    // {
    //   title: 'Initialize git',
    //   task: () => initGit(options),
    //   enabled: () => options.git
    // },
    {
      title: 'Install dependencies',
      task: () => projectInstall({
        cwd: options.targetDirectory
      }),
      skip: () => !options.runInstall
        ? 'Pass --install to automatically install dependencies'
        : undefined
    },
  ])
  
  // console.log('%s Project ready', chalk.green.bold('DONE'))
  await task.run()
  console.log('Project ready')
  return true;
}