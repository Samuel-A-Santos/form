export interface Formulario {
  id: string;
  titulo: string;
  descricao?: string;
  ordem: number;
}

export interface Pergunta {
  id: string;
  id_formulario: string;
  titulo: string;
  codigo?: string;
  orientacao_resposta?: string;
  ordem: number;
  obrigatoria: boolean;
  sub_pergunta: boolean;
  tipo_pergunta: TipoPergunta;
  opcoes_respostas?: OpcaoResposta[];
}

export interface OpcaoResposta {
  id: string;
  id_pergunta: string;
  resposta: string;
  ordem: number;
  resposta_aberta: boolean;
}

export interface OpcaoRespostaPergunta {
  id: string;
  id_opcao_resposta: string;
  id_pergunta: string;
}

export enum TipoPergunta {
  SIM_NAO = 'Sim_Não',
  MULTIPLA_ESCOLHA = 'multipla_escola',
  UNICA_ESCOLHA = 'unica_escolha',
  TEXTO_LIVRE = 'texto_livre',
  INTEIRO = 'Inteiro',
  NUMERO_DECIMAL = 'Numero com duas casa decimais'
}

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
