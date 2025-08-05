export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function generateQuestionId(): string {
  return `question_${generateId()}`;
}

export function generateOptionId(): string {
  return `option_${generateId()}`;
}

export function generateFormId(): string {
  return `form_${generateId()}`;
}
