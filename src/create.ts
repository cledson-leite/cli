import path from 'path'
import Listr from 'listr'
import execa from 'execa'
import { OptionsType } from './types'
import { setConfig } from './set-config'
import { setSrc } from './set-src'
import { createFeature } from './creatorFeature'

export const create = async (options: OptionsType) => {
  if (!options.name) {
    console.error("Nome do projeto é obrigatório");
    process.exit(1)
  }
  const target = path.resolve(process.cwd(), `${options.name}`)
  
  const task = new Listr([
    {
      title: 'Criando arquivos de configurações',
      task: async () => await setConfig(target, options.name)
    },
    {
      title: 'Instalando dependências',
      task: async () => await execa('yarn', ['install'], {
        cwd: path.resolve(process.cwd(), `${options.name}`)
      })
    },
    {
      title: 'Atualizando dependências',
      task: async () => await execa('yarn', ['upgrade', '-L'], {
        cwd: path.resolve(process.cwd(), `${options.name}`)
      })
    },
    {
      title: 'Criando estrutura de pastas',
      task: async () => await setSrc(target)
    },
    {
      title: 'Criando feature exemplo',
      task: async () => await createFeature(target, 'example')
    },
  ])

  try {
    await task.run()
    console.log('Projeto concluído')
  } catch (error: any) {
    console.error(error.message);
    
  }
}