import Listr from 'listr'
import { data } from './data'
import { domain } from './domain'
import { presentation } from './presentation'
import { service } from './service'
import { UI } from './UI'

export const createFeature = async (target: string, name: string) => {
  const dir = `${target}/src/feature/${name}`
  const task = new Listr([
    {
      title: 'Criando camada de domínio',
      task: async () => await domain(dir)
    },
    {
      title: 'Criando camada de dados',
      task: async () => await data(dir)
    },
    {
      title: 'Criando camada de serviço',
      task: async () => await service(dir)
    },
    {
      title: 'Criando camada de apresentação',
      task: async () => await presentation(dir)
    },
    {
      title: 'Criando camada de UI',
      task: async () => await UI(dir)
    },
  ])
  task.run()
  
  
  
  
  
  
}