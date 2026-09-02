import { Terminal } from '@xterm/xterm';
import { handleRa } from './aluno';
import { handleCal } from './cal';
import { handleConfig, handleHelp, handleClear } from './config';

type CommandHandler = (args: string[], term: Terminal) => string | void;

const commands: Record<string, CommandHandler> = {
  cls: handleClear,
  clear: handleClear,
  ra: handleRa,
  cal: handleCal,
  config: handleConfig,
  help: handleHelp
};

export function executeCommand(cmdStr: string, term: Terminal): void {
  const trimmed = cmdStr.trim();
  if (!trimmed) {
    term.writeln('');
    return;
  }

  const [cmd, ...args] = trimmed.split(' ');
  const normalizedCmd = cmd.toLowerCase();

  if (normalizedCmd === 'cls' || normalizedCmd === 'clear') {
    commands[normalizedCmd](args, term);
    return;
  }

  term.writeln('');

  const handler = commands[normalizedCmd];
  const output = handler
    ? handler(args, term)
    : `Comando não reconhecido: '${cmd}'\r\nDigite 'help' para ver os comandos disponíveis.`;

  if (output) {
    term.writeln(output);
  }
}