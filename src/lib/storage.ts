import { Form, FormResponse, Formulario, Pergunta, OpcaoResposta, Question, Option, QuestionType, TipoPergunta } from '@/types/models';

const FORMS_KEY = 'dynamic_forms';
const RESPONSES_KEY = 'form_responses';

export function convertFormToFormulario(form: Form): Formulario {
  return {
    id: form.id,
    titulo: form.title,
    descricao: form.description,
    ordem: 1, 
  };
}

export function convertFormularioToForm(formulario: Formulario, perguntas: Pergunta[]): Form {
  return {
    id: formulario.id,
    title: formulario.titulo,
    description: formulario.descricao,
    questions: perguntas.map(convertPerguntaToQuestion),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function convertQuestionToPergunta(question: Question, formId: string): Pergunta {
  return {
    id: question.id,
    id_formulario: formId,
    titulo: question.text,
    codigo: question.code,
    orientacao_resposta: question.responseOrientation,
    ordem: question.order,
    obrigatoria: question.required,
    sub_pergunta: question.isSubQuestion || false,
    tipo_pergunta: convertQuestionTypeToTipoPergunta(question.type),
    opcoes_respostas: question.options?.map(option => convertOptionToOpcaoResposta(option, question.id)),
  };
}

export function convertPerguntaToQuestion(pergunta: Pergunta): Question {
  return {
    id: pergunta.id,
    text: pergunta.titulo,
    code: pergunta.codigo,
    responseOrientation: pergunta.orientacao_resposta,
    type: convertTipoPerguntaToQuestionType(pergunta.tipo_pergunta),
    required: pergunta.obrigatoria,
    isSubQuestion: pergunta.sub_pergunta,
    options: pergunta.opcoes_respostas?.map(convertOpcaoRespostaToOption),
    order: pergunta.ordem,
  };
}

export function convertOptionToOpcaoResposta(option: Option, questionId: string): OpcaoResposta {
  return {
    id: option.id,
    id_pergunta: questionId,
    resposta: option.text,
    ordem: option.order,
    resposta_aberta: option.isOpenAnswer,
  };
}

export function convertOpcaoRespostaToOption(opcao: OpcaoResposta): Option {
  return {
    id: opcao.id,
    text: opcao.resposta,
    value: opcao.resposta, 
    order: opcao.ordem,
    isOpenAnswer: opcao.resposta_aberta,
  };
}

export function convertQuestionTypeToTipoPergunta(type: QuestionType): TipoPergunta {
  const mapping: Record<QuestionType, TipoPergunta> = {
    [QuestionType.YES_NO]: TipoPergunta.SIM_NAO,
    [QuestionType.MULTIPLE_CHOICE]: TipoPergunta.MULTIPLA_ESCOLHA,
    [QuestionType.SINGLE_CHOICE]: TipoPergunta.UNICA_ESCOLHA,
    [QuestionType.FREE_TEXT]: TipoPergunta.TEXTO_LIVRE,
    [QuestionType.INTEGER]: TipoPergunta.INTEIRO,
    [QuestionType.DECIMAL]: TipoPergunta.NUMERO_DECIMAL,
    [QuestionType.LONG_TEXT]: TipoPergunta.TEXTO_LIVRE,
  };
  return mapping[type];
}

export function convertTipoPerguntaToQuestionType(tipo: TipoPergunta): QuestionType {
  const mapping: Record<TipoPergunta, QuestionType> = {
    [TipoPergunta.SIM_NAO]: QuestionType.YES_NO,
    [TipoPergunta.MULTIPLA_ESCOLHA]: QuestionType.MULTIPLE_CHOICE,
    [TipoPergunta.UNICA_ESCOLHA]: QuestionType.SINGLE_CHOICE,
    [TipoPergunta.TEXTO_LIVRE]: QuestionType.FREE_TEXT,
    [TipoPergunta.INTEIRO]: QuestionType.INTEGER,
    [TipoPergunta.NUMERO_DECIMAL]: QuestionType.DECIMAL,
  };
  return mapping[tipo];
}

export class FormStorage {
  static getAllForms(): Form[] {
    if (typeof window === 'undefined') return [];
    
    const forms = localStorage.getItem(FORMS_KEY);
    if (!forms) return [];
    
    try {
      const parsedForms = JSON.parse(forms);
      return parsedForms.map((form: Record<string, unknown>) => ({
        ...form,
        createdAt: new Date(form.createdAt as string),
        updatedAt: new Date(form.updatedAt as string)
      }));
    } catch {
      return [];
    }
  }

  static getFormById(id: string): Form | null {
    const forms = this.getAllForms();
    return forms.find(form => form.id === id) || null;
  }

  static saveForm(form: Form): void {
    if (typeof window === 'undefined') return;
    
    const forms = this.getAllForms();
    const existingIndex = forms.findIndex(f => f.id === form.id);
    
    if (existingIndex >= 0) {
      forms[existingIndex] = {
        ...form,
        updatedAt: new Date()
      };
    } else {
      forms.push({
        ...form,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    localStorage.setItem(FORMS_KEY, JSON.stringify(forms));
  }

  static deleteForm(id: string): void {
    if (typeof window === 'undefined') return;
    
    const forms = this.getAllForms();
    const filteredForms = forms.filter(form => form.id !== id);
    localStorage.setItem(FORMS_KEY, JSON.stringify(filteredForms));
  }

  static getAllResponses(): FormResponse[] {
    if (typeof window === 'undefined') return [];
    
    const responses = localStorage.getItem(RESPONSES_KEY);
    if (!responses) return [];
    
    try {
      const parsedResponses = JSON.parse(responses);
      return parsedResponses.map((response: Record<string, unknown>) => ({
        ...response,
        submittedAt: new Date(response.submittedAt as string)
      }));
    } catch {
      return [];
    }
  }

  static getResponsesByFormId(formId: string): FormResponse[] {
    const responses = this.getAllResponses();
    return responses.filter(response => response.formId === formId);
  }

  static saveResponse(response: FormResponse): void {
    if (typeof window === 'undefined') return;
    
    const responses = this.getAllResponses();
    responses.push({
      ...response,
      submittedAt: new Date()
    });
    
    localStorage.setItem(RESPONSES_KEY, JSON.stringify(responses));
  }

  static deleteResponse(id: string): void {
    if (typeof window === 'undefined') return;
    
    const responses = this.getAllResponses();
    const filteredResponses = responses.filter(response => response.id !== id);
    localStorage.setItem(RESPONSES_KEY, JSON.stringify(filteredResponses));
  }
}
