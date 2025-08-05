'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FormStorage } from '@/lib/storage';
import { Form, FormResponse } from '@/types/models';
import { ArrowLeft, Download, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface FormResponsesPageProps {
  params: Promise<{
    formId: string;
  }>;
}

export default function FormResponsesPage({ params }: FormResponsesPageProps) {
  const [form, setForm] = useState<Form | null>(null);
  const [responses, setResponses] = useState<FormResponse[]>([]);

  useEffect(() => {
    const loadDataAsync = async () => {
      const { formId } = await params;
      const loadedForm = FormStorage.getFormById(formId);
      const formResponses = FormStorage.getResponsesByFormId(formId);
      
      setForm(loadedForm);
      setResponses(formResponses);
    };
    loadDataAsync();
  }, [params]);

  const loadData = async () => {
    const { formId } = await params;
    const loadedForm = FormStorage.getFormById(formId);
    const formResponses = FormStorage.getResponsesByFormId(formId);
    
    setForm(loadedForm);
    setResponses(formResponses);
  };

  const deleteResponse = (responseId: string) => {
    if (confirm('Tem certeza que deseja excluir esta resposta?')) {
      FormStorage.deleteResponse(responseId);
      loadData();
    }
  };

  const exportToCSV = () => {
    if (!form || responses.length === 0) return;

    const headers = ['Data/Hora', ...form.questions.map(q => q.text)];
    const csvData = responses.map(response => {
      const row = [response.submittedAt.toLocaleString('pt-BR')];
      
      form.questions.forEach(question => {
        const answer = response.answers.find(a => a.questionId === question.id);
        const value = answer ? (Array.isArray(answer.value) ? answer.value.join(', ') : answer.value) : '';
        row.push(`"${value}"`);
      });
      
      return row.join(',');
    });

    const csvContent = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${form.title}_respostas.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatAnswer = (answer: unknown): string => {
    if (Array.isArray(answer)) {
      return answer.join(', ');
    }
    return String(answer || '');
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
            <h1 className="text-2xl font-bold text-gray-900">Respostas do Formulário</h1>
            <p className="text-gray-600">{form.title}</p>
          </div>
        </div>
        {responses.length > 0 && (
          <Button onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Estatísticas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{responses.length}</div>
            <div className="text-sm text-gray-600">Total de Respostas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{form.questions.length}</div>
            <div className="text-sm text-gray-600">Perguntas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {responses.length > 0 
                ? new Date(Math.max(...responses.map(r => r.submittedAt.getTime()))).toLocaleDateString('pt-BR')
                : 'N/A'
              }
            </div>
            <div className="text-sm text-gray-600">Última Resposta</div>
          </div>
        </div>
      </div>

      {responses.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-sm border text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhuma resposta ainda
          </h3>
          <p className="text-gray-600">
            Quando as pessoas responderem ao formulário, as respostas aparecerão aqui.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data/Hora
                  </th>
                  {form.questions.map((question) => (
                    <th key={question.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {question.text}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {responses.map((response) => (
                  <tr key={response.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {response.submittedAt.toLocaleString('pt-BR')}
                    </td>
                    {form.questions.map((question) => {
                      const answer = response.answers.find(a => a.questionId === question.id);
                      return (
                        <td key={question.id} className="px-6 py-4 text-sm text-gray-900">
                          {answer ? formatAnswer(answer.value) : '-'}
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteResponse(response.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 