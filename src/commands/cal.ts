export function handleCal(): string {
  const isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const pdfUrl = 'https://uniamerica.br/docs/calendarios-academicos/calendario-academico-2026-campus-boulevard.pdf';

  if (isMobile) {
    return `\x1b[4m${pdfUrl}\x1b[0m`;
  }  
  
  return [
    '+------+------+------+------+------+------+------+',
    '|                SETEMBRO 2026                   |',
    '+------+------+------+------+------+------+------+',
    '| DOM  | SEG  | TER  | QUA  | QUI  | SEX  | SAB  |',
    '+------+------+------+------+------+------+------+',
    '|      |      |  01  |  02  |  03  |  04  |  05  |',
    '+------+------+------+------+------+------+------+',
    '|  06  |  07  |  08  |  09  |  10  |  11  |  12  |',
    '+------+------+------+------+------+------+------+',
    '|  13  |  14  |  15  |  16  |  17  |  18  |  19  |',
    '+------+------+------+------+------+------+------+',
    '|  20  |  21  |  22  |  23  |  24  |  25  |  26  |',
    '+------+------+------+------+------+------+------+',
    '|  27  |  28  |  29  |  30  |      |      |      |',
    '+------+------+------+------+------+------+------+',
    '',
    'Eventos do Mês:',
    '  07/09       - Independência do Brasil',
    '  11/09       - 2ª Chamada e Recuperação do Projeto 1',
    '  21 a 24/09  - Semana de Avaliação Mensal (Projeto 2)',
    '  25/09       - Avaliação Presencial e Oferta Assíncrona',
    '  29/09       - Início do Projeto 3'
  ].join('\r\n');
}