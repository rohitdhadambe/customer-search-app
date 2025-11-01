import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import type { SearchFieldConfig } from '~/types/config';

interface FieldRendererProps {
  config: SearchFieldConfig;
  // form values are string-valued in the generic search form
  form: UseFormReturn<Record<string, string>>;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({ config, form }) => {
  const fieldName = config.key as string;

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex-1 min-w-[200px]">
          <FormLabel>{config.label}</FormLabel>
          <FormControl>
            {config.uiType === 'input' && (
              <Input 
                placeholder={config.placeholder} 
                {...field} 
                value={field.value ?? ''}
              />
            )}
            {config.uiType === 'date-picker' && (
              <Input 
                type="date"
                placeholder={config.placeholder || "YYYY-MM-DD"} 
                {...field}
                value={field.value || ''} 
              />
            )}
            {config.uiType === 'select' && (
              <Input disabled placeholder="Select component not yet implemented" />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
