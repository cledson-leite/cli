import kleur from 'kleur'
import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const tasks = new Listr([
  {
    title: 'Testando kleur',
    task: () => console.log(`${kleur.green('Hello')} ${kleur.red('word !!')}`)
  },
  {
    title: 'Testando pkg-install',
    task: () =>
      execa('echo', ['unicorns']).then((stdout: any) => {
        console.log(stdout);
      })
  },
  {
    title: 'Testando Execa',
    task: () =>
      projectInstall({ prefer: 'yarn' }).then((stdout: any) => {
        console.log(stdout);
      })
  },
]);

tasks.run();
