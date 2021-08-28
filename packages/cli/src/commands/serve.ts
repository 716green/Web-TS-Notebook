import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port), path.basename(filename), dir);
      console.log(
        `Opened ${filename} - navigate to http://localhost:${options.port} to edit`
      );
    } catch (err: any) {
      if (err.code === 'EADDRINUSE') {
        console.error(
          'Port in use. Try running on a different port.\nTry re-running with a port of your choice.\nExample: ... -p 4433'
        );
      } else {
        console.log('Found an error:', err.message);
      }
      process.exit(1);
    }
  });
