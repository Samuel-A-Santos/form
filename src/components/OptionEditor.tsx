'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Option } from '@/types/models';
import { Trash2 } from 'lucide-react';

interface OptionEditorProps {
  option: Option;
  onUpdate: (optionId: string, updates: { text?: string; value?: string; order?: number; isOpenAnswer?: boolean }) => void;
  onDelete: () => void;
  canDelete: boolean;
}

export function OptionEditor({ option, onUpdate, onDelete, canDelete }: OptionEditorProps) {
  return (
    <div className="flex items-center gap-2 p-3 border rounded bg-white">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Input
            value={option.text}
            onChange={(e) => onUpdate(option.id, { text: e.target.value })}
            placeholder="Texto da opção"
            className="flex-1"
          />
          <Input
            value={option.value}
            onChange={(e) => onUpdate(option.id, { value: e.target.value })}
            placeholder="Valor"
            className="w-24"
          />
          <Input
            type="number"
            value={option.order}
            onChange={(e) => onUpdate(option.id, { order: parseInt(e.target.value) || 1 })}
            placeholder="Ordem"
            className="w-20"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`open-answer-${option.id}`}
            checked={option.isOpenAnswer}
            onChange={(e) => onUpdate(option.id, { isOpenAnswer: e.target.checked })}
            className="rounded border-gray-300"
          />
          <label htmlFor={`open-answer-${option.id}`} className="text-sm text-gray-600">
            Resposta aberta
          </label>
        </div>
      </div>
      
      {canDelete && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
