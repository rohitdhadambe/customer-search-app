import React from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Form } from '~/components/ui/form';
import { Button } from '~/components/ui/button';
import { Loader2 } from 'lucide-react';
import type { SearchConfig, SearchFieldConfig } from '~/types/config';
import { FieldRenderer } from './FieldRenderer';

interface SearchFormValues {
  [key: string]: string;
}

interface GenericSearchFormProps {
  config: SearchConfig;
  onSubmit: (data: SearchFormValues) => void;
  onClear?: () => void;
  isLoading: boolean;
}

export const GenericSearchForm: React.FC<GenericSearchFormProps> = ({ 
  config, 
  onSubmit, 
  onClear,
  isLoading 
}) => {
  const form = useForm<SearchFormValues>({
    defaultValues: Object.keys(config).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {} as SearchFormValues)
  });

  const sortedFields = React.useMemo(() => {
    return Object.values(config).sort((a, b) => a.renderOrder - b.renderOrder);
  }, [config]);

  const handleSubmit: SubmitHandler<SearchFormValues> = (data) => {
    console.log(' Form submitted with raw data:', data);
    
    // Filter out empty values
    const payload = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => {
        const hasValue = value !== '' && value !== null && value !== undefined;
        console.log(`Field ${key}: "${value}" - ${hasValue ? 'INCLUDED' : 'EXCLUDED'}`);
        return hasValue;
      })
    );
    
    console.log(' Filtered payload:', payload);

    if (Object.keys(payload).length === 0) {
      console.warn(' No search criteria provided');
      return;
    }
    
    const titleCase = (s: string) =>
      s
        .trim()
        .split(/\s+/)
        .map((w) => w[0]?.toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');

    const normalizedPayload = Object.fromEntries(
      Object.entries(payload).map(([k, v]) => {
        if (k === 'firstName' || k === 'lastName') {
          const normalized = titleCase(String(v));
          console.log(`Normalized ${k}: "${v}" → "${normalized}"`);
          return [k, normalized];
        }
        return [k, v as string];
      })
    );

    console.log('✨ Final normalized payload:', normalizedPayload);
    onSubmit(normalizedPayload);
  };

  const handleReset = () => {
    console.log(' Resetting form');
    form.reset();
    onClear?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="flex flex-wrap gap-4">
          {sortedFields.map((fieldConfig: SearchFieldConfig) => (
            <FieldRenderer 
              key={fieldConfig.key} 
              config={fieldConfig} 
              form={form} 
            />
          ))}
        </div>

        <div className="flex gap-2">
          <Button 
              type="submit" 
              variant="outline"
              disabled={isLoading}
              className="text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                'Search Customers'
              )}
            </Button>
        <Button 
            type="button" 
            variant="outline" 
            onClick={handleReset}
            disabled={isLoading}
            className="text-white"
            >
            Reset Filters
            </Button>
        </div>
      </form>
    </Form>
  );
};