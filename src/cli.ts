import arg from 'arg'
import { create } from './create'
import { generate } from './generate'
import { OptionsType } from './types'

const parseArgumentsIntoOptions = (rawArgs: string[]): OptionsType => {
  const args = arg(
    {
      '--create': Boolean,
      '--generate': Boolean,
      '-C': '--create',
      '-G': '--generate',
    },
    { argv: rawArgs.slice(2) })
  return {
    name: args._[0],
    create: args['--create'] || false,
    generate: args['--generate'] || false
  }
}

export const cli = async (args: string[]) => {
  let options = parseArgumentsIntoOptions(args)
  if (options.create) {
    return await create(options)
  }

  if (options.generate) {
    return await generate(options)
  }
}