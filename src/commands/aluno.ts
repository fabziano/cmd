import { RA_KEY, NAME_KEY } from './config';

export function getStoredUserName(): string {
  return localStorage.getItem(NAME_KEY) || 'user';
}

export function getStoredRa(): string | null {
  return localStorage.getItem(RA_KEY);
}

export function handleRa(args: string[]): string {
  const [value] = args;

  if (!value) {
    const savedRa = getStoredRa();
    if (!savedRa) {
      return 'Nenhum RA informado.';
    }
    return `Consultando horas para o RA: ${savedRa}...`;
  }

  if (/^\d{4,6}$/.test(value)) {
    return `Consultando horas para o RA: ${value}...`;
  }

  return 'Erro: Formato inválido.';
}