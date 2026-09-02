import { Terminal } from '@xterm/xterm';

export const RA_KEY = 'aluno_default_ra';
export const NAME_KEY = 'aluno_default_name';

export function handleClear(_args: string[], term: Terminal): void {
  term.write('\x1b[2J\x1b[3J\x1b[H');
}

export function handleConfig(args: string[]): string {
  const [subcommand, value] = args;
  const action = subcommand?.toLowerCase();

  if (action === 'reset') {
    localStorage.removeItem(RA_KEY);
    localStorage.removeItem(NAME_KEY);
    return 'Configurações de usuário apagadas.';
  }

  if (action === 'ra') {
    const rawVal = value?.trim();

    if (!rawVal) {
      return 'Erro: Nenhum valor informado.';
    }

    if (/^\d{4,6}$/.test(rawVal)) {
      localStorage.setItem(RA_KEY, rawVal);
      return `RA padrão configurado para: ${rawVal}`;
    }

    return 'Erro: Formato inválido.';
  }

  if (action === 'username') {
    const rawVal = value?.trim();

    if (!rawVal) {
      return 'Erro: Nenhum valor informado.';
    }

    if (/^[a-zA-Z0-9_]{1,15}$/.test(rawVal)) {
      const sanitizedName = rawVal.toLowerCase();
      localStorage.setItem(NAME_KEY, sanitizedName);
      return `Nome de usuário configurado para: ${sanitizedName}`;
    }

    return 'Erro: Formato inválido.';
  }

  return 'Digite "help" para ver os comandos disponíveis.';
}

export function handleHelp(): string {
  const isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  if (isMobile) {
    return [
      'Comandos disponíveis:',
      '  ra <RA>',
      '  config ra <RA>',
      '  config username <nome>',
      '  config reset',
      '  cal',
      '  clear'
    ].join('\r\n');
  }

  return [
    'Comandos disponíveis:',
    '  ra <RA>                 - Consulta horas na Blackboard pelo RA',
    '  config ra <RA>          - Salva RA padrão para consultas futuras',
    '  config username <nome>  - Altera o nome de usuário do terminal',
    '  config reset            - Apaga as configurações salvas',
    '  cal                     - Exibe o calendário acadêmico',
    '  clear                   - Limpa a tela do terminal'
  ].join('\r\n');
}