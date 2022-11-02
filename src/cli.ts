import arg from 'arg'

import { createProject } from './main';

const parseArgumentsIntoOptions = (rawArgs: string[]) => {
  const args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "-g": '--git',
      "-y": '--yes',
      "-i": '--install',
    },
    { argv: rawArgs.slice(2)}
  )
  const defaultTemplate = 'JavaScript';
  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    template: args._[0] || defaultTemplate,
    runInstall: args['--install'] || false,
    targetDirectory: "",
    templateDirectory: ""
  }
}

export const cli = async (args: string[]) => {
  let options = parseArgumentsIntoOptions(args);
  await createProject(options)
}