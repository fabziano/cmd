import '@xterm/xterm/css/xterm.css';
import './style.css';

import { setupTerminal, listenInput } from './terminal';
import { executeCommand } from './commands';

const { term, prompt } = setupTerminal('terminal');

listenInput(term, prompt, (line) => executeCommand(line, term));

prompt();