export const QUESTION_TYPE_LABELS = {
  yes_no: 'Sim/Não',
  multiple_choice: 'Múltipla escolha',
  single_choice: 'Escolha única',
  free_text: 'Texto livre',
  integer: 'Número inteiro',
  decimal: 'Número decimal'
} as const;

export const CONDITION_TYPE_LABELS = {
  equals: 'Igual a',
  not_equals: 'Diferente de',
  contains: 'Contém',
  greater_than: 'Maior que',
  less_than: 'Menor que'
} as const;

export const DEFAULT_OPTIONS = [
  { id: '1', text: 'Opção 1', value: 'option1', order: 1, isOpenAnswer: false },
  { id: '2', text: 'Opção 2', value: 'option2', order: 2, isOpenAnswer: false }
]; 