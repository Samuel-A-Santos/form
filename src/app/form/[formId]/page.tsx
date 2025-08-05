import { FormEditor } from '@/components/FormEditor';

interface FormEditPageProps {
  params: Promise<{
    formId: string;
  }>;
}

export default async function FormEditPage({ params }: FormEditPageProps) {
  const { formId } = await params;
  return <FormEditor formId={formId} />;
} 