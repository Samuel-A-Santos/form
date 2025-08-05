'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { QuestionEditor } from './QuestionEditor';
import { FormStorage } from '@/lib/storage';
import { Form, Question, QuestionType } from '@/types/models';
import { generateQuestionId } from '@/utils/id';
import { Plus, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface FormEditorProps {
  formId: string;
}

export function FormEditor({ formId }: FormEditorProps) {
  const [form, setForm] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadForm();
  }, [formId]);

  const loadForm = () => {
    const loadedForm = FormStorage.getFormById(formId);
    setForm(loadedForm);
    setIsLoading(false);
  };

  const updateForm = (updates: Partial<Form>) => {
    if (!form) return;
    
    const updatedForm = { ...form, ...updates, updatedAt: new Date() };
    setForm(updatedForm);
    FormStorage.saveForm(updatedForm);
  };

  const addQuestion = () => {
    if (!form) return;

    const newQuestion: Question = {
      id: generateQuestionId(),
      text: '',
      code: '',
      responseOrientation: '',
      type: QuestionType.FREE_TEXT,
      required: false,
      isSubQuestion: false,
      order: form.questions.length,
    };

    const updatedForm = {
      ...form,
      questions: [...form.questions, newQuestion],
      updatedAt: new Date(),
    };

    setForm(updatedForm);
    FormStorage.saveForm(updatedForm);
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    if (!form) return;

    const updatedQuestions = form.questions.map(q =>
      q.id === questionId ? { ...q, ...updates } : q
    );

    const updatedForm = {
      ...form,
      questions: updatedQuestions,
      updatedAt: new Date(),
    };

    setForm(updatedForm);
    FormStorage.saveForm(updatedForm);
  };

  const deleteQuestion = (questionId: string) => {
    if (!form) return;

    const updatedQuestions = form.questions
      .filter(q => q.id !== questionId)
      .map((q, index) => ({ ...q, order: index }));

    const updatedForm = {
      ...form,
      questions: updatedQuestions,
      updatedAt: new Date(),
    };

    setForm(updatedForm);
    FormStorage.saveForm(updatedForm);
  };

  const moveQuestion = (questionId: string, direction: 'up' | 'down') => {
    if (!form) return;

    const questions = [...form.questions];
    const currentIndex = questions.findIndex(q => q.id === questionId);
    
    if (direction === 'up' && currentIndex > 0) {
      [questions[currentIndex], questions[currentIndex - 1]] = 
      [questions[currentIndex - 1], questions[currentIndex]];
    } else if (direction === 'down' && currentIndex < questions.length - 1) {
      [questions[currentIndex], questions[currentIndex + 1]] = 
      [questions[currentIndex + 1], questions[currentIndex]];
    }

    const updatedQuestions = questions.map((q, index) => ({ ...q, order: index }));
    
    const updatedForm = {
      ...form,
      questions: updatedQuestions,
      updatedAt: new Date(),
    };

    setForm(updatedForm);
    FormStorage.saveForm(updatedForm);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Carregando...</div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Formulário não encontrado
        </h2>
        <Link href="/">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para a lista
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Editar Formulário</h1>
            <p className="text-gray-600">Configure as perguntas e condicionalidades</p>
          </div>
        </div>
        <Button onClick={() => FormStorage.saveForm(form)}>
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Informações do Formulário</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <Input
              value={form.title}
              onChange={(e) => updateForm({ title: e.target.value })}
              placeholder="Digite o título do formulário"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição (opcional)
            </label>
            <Textarea
              value={form.description || ''}
              onChange={(e) => updateForm({ description: e.target.value })}
              placeholder="Digite uma descrição para o formulário"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Perguntas</h2>
          <Button onClick={addQuestion}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Pergunta
          </Button>
        </div>

        {form.questions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="mb-4">Nenhuma pergunta criada ainda</p>
            <Button onClick={addQuestion} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeira Pergunta
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {form.questions.map((question, index) => (
              <QuestionEditor
                key={question.id}
                question={question}
                allQuestions={form.questions}
                onUpdate={(updates) => updateQuestion(question.id, updates)}
                onDelete={() => deleteQuestion(question.id)}
                onMoveUp={() => moveQuestion(question.id, 'up')}
                onMoveDown={() => moveQuestion(question.id, 'down')}
                canMoveUp={index > 0}
                canMoveDown={index < form.questions.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 