import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { getStoredUserName } from './commands/aluno';

export function setupTerminal(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Elemento #${containerId} não encontrado.`);
  }

  const isMobile = window.innerWidth < 768;

  const term = new Terminal({
    cursorBlink: true,
    cursorStyle: 'block',
    theme: {
      background: '#000000',
      foreground: '#cccccc',
      cursor: '#cccccc',
      green: '#26a269'
    },
    fontFamily: 'Consolas, "Courier New", monospace',
    fontSize: isMobile ? 18 : 15,
    lineHeight: 1.2,
    convertEol: true
  });

  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  term.loadAddon(new WebLinksAddon());

  term.open(container);

  // Desativa autocorreção/previsão de palavras no teclado mobile
  const textarea = container.querySelector<HTMLTextAreaElement>('.xterm-helper-textarea');
  if (textarea) {
    textarea.setAttribute('autocorrect', 'off');
    textarea.setAttribute('autocapitalize', 'none');
    textarea.setAttribute('autocomplete', 'off');
    textarea.setAttribute('spellcheck', 'false');
  }

  fitAddon.fit();

  window.addEventListener('resize', () => fitAddon.fit());
  container.addEventListener('click', () => term.focus());
  container.addEventListener('touchend', () => term.focus());

  const prompt = () => {
    const user = getStoredUserName();
    term.write(`\x1b[1;32m${user}@uniamerica:~$\x1b[0m `);
  };

  term.focus();
  return { term, prompt };
}

export function listenInput(
  term: Terminal,
  prompt: () => void,
  onEnter: (line: string) => void
) {
  let currentLine = '';
  const history: string[] = [];
  let historyIndex = -1;

  const replaceCurrentLine = (newLine: string) => {
    while (currentLine.length > 0) {
      term.write('\b \b');
      currentLine = currentLine.slice(0, -1);
    }
    currentLine = newLine;
    term.write(currentLine);
  };

  term.onData((data: string) => {
    switch (data) {
      case '\r':
      case '\n':
      case '\r\n':
        if (currentLine.trim()) {
          history.push(currentLine);
        }
        historyIndex = history.length;
        onEnter(currentLine);
        currentLine = '';
        prompt();
        break;

      case '\u007F':
      case '\b':
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          term.write('\b \b');
        }
        break;

      case '\u0003':
        term.writeln('^C');
        currentLine = '';
        historyIndex = history.length;
        prompt();
        break;

      case '\x1b[A':
        if (history.length > 0 && historyIndex > 0) {
          historyIndex--;
          replaceCurrentLine(history[historyIndex]);
        }
        break;

      case '\x1b[B':
        if (history.length > 0 && historyIndex < history.length - 1) {
          historyIndex++;
          replaceCurrentLine(history[historyIndex]);
        } else if (historyIndex === history.length - 1) {
          historyIndex = history.length;
          replaceCurrentLine('');
        }
        break;

      default:
        if (data.startsWith('\x1b')) break;
        if (data >= ' ' || data === '\t' || data.length > 1) {
          currentLine += data;
          term.write(data);
        }
        break;
    }
  });
}