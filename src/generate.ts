import path from 'path'
import Listr from 'listr'
import execa from 'execa'
import { OptionsType } from './types'
import { setConfig } from './set-config'
import { setSrc } from './set-src'
import { createFeature } from './creatorFeature'

export const generate = async (options: OptionsType) => {
  if (!options.name) {
    console.error("Nome da feature é obrigatório");
    process.exit(1)
  }
  const target = path.resolve(process.cwd(), `feature/${options.name}`)
  
  

  try {
    await createFeature(process.cwd(), options.name)
    console.log('Projeto concluído')
  } catch (error: any) {
    console.error(error.message);
    
  }
}