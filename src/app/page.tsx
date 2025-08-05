'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormStorage } from '@/lib/storage';
import { Form } from '@/types/models';
import { generateFormId } from '@/utils/id';
import { Plus, Edit, Eye, Trash2, FileText } from 'lucide-react';

export default function HomePage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [newFormTitle, setNewFormTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = () => {
    const allForms = FormStorage.getAllForms();
    setForms(allForms);
  };

  const createNewForm = () => {
    if (!newFormTitle.trim()) return;

    const newForm: Form = {
      id: generateFormId(),
      title: newFormTitle.trim(),
      description: '',
      questions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    FormStorage.saveForm(newForm);
    setNewFormTitle('');
    setIsCreating(false);
    loadForms();
  };

  const deleteForm = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este formulário?')) {
      FormStorage.deleteForm(id);
      loadForms();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Meus Formulários</h2>
          <p className="text-gray-600 mt-2">
            Crie e gerencie seus formulários dinâmicos
          </p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Formulário
        </Button>
      </div>

      {/* Criar novo formulário */}
      {isCreating && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Criar Novo Formulário</h3>
          <div className="flex gap-4">
            <Input
              placeholder="Título do formulário"
              value={newFormTitle}
              onChange={(e) => setNewFormTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && createNewForm()}
              className="flex-1"
            />
            <Button onClick={createNewForm} disabled={!newFormTitle.trim()}>
              Criar
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreating(false);
                setNewFormTitle('');
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Lista de formulários */}
      {forms.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-sm border text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum formulário criado
          </h3>
          <p className="text-gray-600 mb-6">
            Comece criando seu primeiro formulário dinâmico
          </p>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Criar Primeiro Formulário
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <div
              key={form.id}
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {form.title}
                  </h3>
                  {form.description && (
                    <p className="text-sm text-gray-600 mb-2">
                      {form.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {form.questions.length} pergunta{form.questions.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteForm(form.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Link href={`/form/${form.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                </Link>
                <Link href={`/form/${form.id}/view`} className="flex-1">
                  <Button size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                </Link>
              </div>
              <div className="mt-2">
                <Link href={`/form/${form.id}/responses`} className="w-full">
                  <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    Ver Respostas
                  </Button>
                </Link>
              </div>

              <div className="mt-3 text-xs text-gray-500">
                Criado em {form.createdAt.toLocaleDateString('pt-BR')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
