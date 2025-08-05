export interface Form {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  text: string;
  code?: string;
  responseOrientation?: string;
  type: QuestionType;
  required: boolean;
  isSubQuestion?: boolean;
  options?: Option[];
  conditionalLogic?: ConditionalLogic;
  order: number;
}

export interface Option {
  id: string;
  text: string;
  value: string;
  order: number;
  isOpenAnswer: boolean;
}

export interface ConditionalLogic {
  dependsOn: string; 
  condition: ConditionType;
  value: string; 
}

export interface FormResponse {
  id: string;
  formId: string;
  answers: Answer[];
  submittedAt: Date;
}

export interface Answer {
  questionId: string;
  value: string | string[]; 
}

export enum QuestionType {
  YES_NO = 'yes_no',
  MULTIPLE_CHOICE = 'multiple_choice',
  SINGLE_CHOICE = 'single_choice',
  FREE_TEXT = 'free_text',
  LONG_TEXT = 'long_text',
  INTEGER = 'integer',
  DECIMAL = 'decimal'
}

export enum ConditionType {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  CONTAINS = 'contains',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than'
}
