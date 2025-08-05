'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormStorage } from '@/lib/storage';
import { Form, Question, FormResponse } from '@/types/models';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

interface FormViewPageProps {
  params: Promise<{
    formId: string;
  }>;
}

export default function FormViewPage({ params }: FormViewPageProps) {
  const [form, setForm] = useState<Form | null>(null);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [visibleQuestions, setVisibleQuestions] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const loadFormData = async () => {
      const { formId } = await params;
      const loadedForm = FormStorage.getFormById(formId);
      setForm(loadedForm);
    };
    loadFormData();
  }, [params]);

  useEffect(() => {
    if (form) {
      calculateVisibleQuestions();
    }
  }, [form, answers]);



  const calculateVisibleQuestions = () => {
    if (!form) return;

    const visible = new Set<string>();
    
    form.questions.forEach(question => {
      if (!question.conditionalLogic) {
        visible.add(question.id);
        return;
      }

      const { dependsOn, condition, value } = question.conditionalLogic;
      const dependentAnswer = answers[dependsOn];

      if (!dependentAnswer) {
        visible.add(question.id);
        return;
      }

      let shouldShow = false;
      const answerValue = Array.isArray(dependentAnswer) ? dependentAnswer[0] : dependentAnswer;

      switch (condition) {
        case 'equals':
          shouldShow = answerValue === value;
          break;
        case 'not_equals':
          shouldShow = answerValue !== value;
          break;
        case 'contains':
          shouldShow = answerValue.includes(value);
          break;
        case 'greater_than':
          shouldShow = Number(answerValue) > Number(value);
          break;
        case 'less_than':
          shouldShow = Number(answerValue) < Number(value);
          break;
      }

      if (shouldShow) {
        visible.add(question.id);
      }
    });

    setVisibleQuestions(visible);
  };

  const updateAnswer = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const renderQuestion = (question: Question) => {
    if (!visibleQuestions.has(question.id)) {
      return null;
    }

    const commonProps = {
      className: "w-full",
      required: question.required,
    };

    switch (question.type) {
      case 'free_text':
        return (
          <Input
            key={question.id}
            {...commonProps}
            type="text"
            value={answers[question.id] as string || ''}
            onChange={(e) => updateAnswer(question.id, e.target.value)}
            placeholder="Digite sua resposta"
          />
        );

      case 'long_text':
        return (
          <Textarea
            key={question.id}
            {...commonProps}
            value={answers[question.id] as string || ''}
            onChange={(e) => updateAnswer(question.id, e.target.value)}
            placeholder="Digite sua resposta"
            rows={4}
          />
        );

      case 'integer':
      case 'decimal':
        return (
          <Input
            key={question.id}
            {...commonProps}
            type="number"
            value={answers[question.id] as string || ''}
            onChange={(e) => updateAnswer(question.id, e.target.value)}
            placeholder="Digite um número"
          />
        );

      case 'single_choice':
        return (
          <Select
            value={answers[question.id] as string || ''}
            onValueChange={(value) => updateAnswer(question.id, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50 shadow-lg">
              {question.options?.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'yes_no':
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <label key={option.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={answers[question.id] === option.value}
                  onChange={(e) => updateAnswer(question.id, e.target.value)}
                  required={question.required}
                  className="rounded-full border-gray-300"
                />
                <span className="text-sm">{option.text}</span>
              </label>
            ))}
          </div>
        );

      case 'multiple_choice':
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <label key={option.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={(answers[question.id] as string[] || []).includes(option.value)}
                  onChange={(e) => {
                    const currentAnswers = answers[question.id] as string[] || [];
                    const newAnswers = e.target.checked
                      ? [...currentAnswers, option.value]
                      : currentAnswers.filter(a => a !== option.value);
                    updateAnswer(question.id, newAnswers);
                  }}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{option.text}</span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <Input
            key={question.id}
            {...commonProps}
            type="text"
            value={answers[question.id] as string || ''}
            onChange={(e) => updateAnswer(question.id, e.target.value)}
            placeholder="Digite sua resposta"
          />
        );
    }
  };

  const handleSubmit = async () => {
    if (!form) return;

    setIsSubmitting(true);

    const requiredQuestions = form.questions.filter(q => 
      q.required && visibleQuestions.has(q.id)
    );

    const missingRequired = requiredQuestions.filter(q => {
      const answer = answers[q.id];
      return !answer || (Array.isArray(answer) && answer.length === 0);
    });

    if (missingRequired.length > 0) {
      alert('Por favor, responda todas as perguntas obrigatórias.');
      setIsSubmitting(false);
      return;
    }

    const response: FormResponse = {
      id: `response_${Date.now()}`,
      formId: form.id,
      answers: Object.entries(answers).map(([questionId, value]) => ({
        questionId,
        value
      })),
      submittedAt: new Date(),
    };

    FormStorage.saveResponse(response);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

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

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-green-900 mb-4">
            Formulário enviado com sucesso!
          </h2>
          <p className="text-green-700 mb-6">
            Obrigado por responder ao formulário.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para a lista
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{form.title}</h1>
          {form.description && (
            <p className="text-gray-600 mt-1">{form.description}</p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
          {form.questions
            .filter(q => visibleQuestions.has(q.id))
            .map((question) => (
              <div key={question.id} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {question.text}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderQuestion(question)}
              </div>
            ))}

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                'Enviando...'
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Formulário
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 