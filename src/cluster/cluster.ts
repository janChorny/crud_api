import cluster from 'node:cluster';
import { cpus } from 'node:os';
import process from 'node:process';
import { runAPI } from '../api';

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({PORT: 4000 + i});
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else {
  runAPI();
  console.log(`Worker ${process.pid} started`);
}
