'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OptionEditor } from './OptionEditor';
import { Question, QuestionType, ConditionType } from '@/types/models';
import { QUESTION_TYPE_LABELS, CONDITION_TYPE_LABELS } from '@/constants/enums';
import { ChevronUp, ChevronDown, Trash2, Settings } from 'lucide-react';

interface QuestionEditorProps {
  question: Question;
  allQuestions: Question[];
  onUpdate: (updates: Partial<Question>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export function QuestionEditor({
  question,
  allQuestions,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: QuestionEditorProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const needsOptions = [
    'multiple_choice',
    'single_choice',
    'yes_no'
  ].includes(question.type);

  const updateOption = (optionId: string, updates: { text?: string; value?: string; order?: number; isOpenAnswer?: boolean }) => {
    if (!question.options) return;

    const updatedOptions = question.options.map(option =>
      option.id === optionId ? { ...option, ...updates } : option
    );

    onUpdate({ options: updatedOptions });
  };

  const addOption = () => {
    const newOption = {
      id: `option_${Date.now()}`,
      text: `Opção ${(question.options?.length || 0) + 1}`,
      value: `option${(question.options?.length || 0) + 1}`,
      order: (question.options?.length || 0) + 1,
      isOpenAnswer: false,
    };

    const updatedOptions = [...(question.options || []), newOption];
    onUpdate({ options: updatedOptions });
  };

  const deleteOption = (optionId: string) => {
    if (!question.options) return;

    const updatedOptions = question.options.filter(option => option.id !== optionId);
    onUpdate({ options: updatedOptions });
  };

  const updateConditionalLogic = (field: 'dependsOn' | 'condition' | 'value', value: string) => {
    if (field === 'dependsOn' && (!value || value === 'none')) {
      onUpdate({ conditionalLogic: undefined });
      return;
    }

    const updatedLogic = {
      dependsOn: question.conditionalLogic?.dependsOn || '',
      condition: (question.conditionalLogic?.condition || 'equals') as ConditionType,
      value: question.conditionalLogic?.value || '',
      [field]: value,
    };
    onUpdate({ conditionalLogic: updatedLogic });
  };

  const getAvailableQuestions = () => {
    return allQuestions.filter(q => q.id !== question.id);
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex items-start gap-3">
        <div className="flex flex-col gap-1 mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className="h-6 w-6 p-0"
          >
            <ChevronUp className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className="h-6 w-6 p-0"
          >
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pergunta
            </label>
            <Textarea
              value={question.text}
              onChange={(e) => onUpdate({ text: e.target.value })}
              placeholder="Digite a pergunta"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código
            </label>
            <Input
              value={question.code || ''}
              onChange={(e) => onUpdate({ code: e.target.value })}
              placeholder="Digite o código da pergunta"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de pergunta
            </label>
            <Select
              value={question.type}
              onValueChange={(value: QuestionType) => onUpdate({ type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(QUESTION_TYPE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {needsOptions && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Opções
                </label>
                <Button size="sm" onClick={addOption} variant="outline">
                  Adicionar Opção
                </Button>
              </div>
              <div className="space-y-2">
                {question.options?.map((option) => (
                  <OptionEditor
                    key={option.id}
                    option={option}
                    onUpdate={updateOption}
                    onDelete={() => deleteOption(option.id)}
                    canDelete={question.options!.length > 1}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Configurações Avançadas
            </Button>
          </div>

          {showAdvanced && (
            <div className="space-y-4 p-4 bg-white rounded border">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`required-${question.id}`}
                  checked={question.required}
                  onChange={(e) => onUpdate({ required: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor={`required-${question.id}`} className="text-sm font-medium">
                  Pergunta obrigatória
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`sub-question-${question.id}`}
                  checked={question.isSubQuestion}
                  onChange={(e) => onUpdate({ isSubQuestion: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor={`sub-question-${question.id}`} className="text-sm font-medium">
                  Sub-pergunta
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Orientação de Resposta
                </label>
                <Input
                  value={question.responseOrientation || ''}
                  onChange={(e) => onUpdate({ responseOrientation: e.target.value })}
                  placeholder="Digite a orientação para resposta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lógica Condicional
                </label>
                <div className="space-y-3">
                  <Select
                    value={question.conditionalLogic?.dependsOn || 'none'}
                    onValueChange={(value) => updateConditionalLogic('dependsOn', value === 'none' ? '' : value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a pergunta dependente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhuma (sempre visível)</SelectItem>
                      {getAvailableQuestions().map((q) => (
                        <SelectItem key={q.id} value={q.id}>
                          {q.text || `Pergunta ${q.order + 1}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {question.conditionalLogic?.dependsOn && question.conditionalLogic.dependsOn !== '' && (
                    <>
                      <Select
                        value={question.conditionalLogic?.condition || 'equals'}
                        onValueChange={(value) => updateConditionalLogic('condition', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a condição" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(CONDITION_TYPE_LABELS).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Input
                        value={question.conditionalLogic?.value || ''}
                        onChange={(e) => updateConditionalLogic('value', e.target.value)}
                        placeholder="Valor da condição"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
