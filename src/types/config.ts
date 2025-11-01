import type { Customer } from './customer';

interface FieldConfigBase {
  key: keyof Customer | string;
  label: string;
  renderOrder: number;
}

export type SearchUIType = 'input' | 'date-picker' | 'select';

export interface SearchFieldConfig extends FieldConfigBase {
  uiType: SearchUIType;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export interface SearchConfig {
  [key: string]: SearchFieldConfig;
}

export type ResultExtractionType = 
  | 'simple'
  | 'primaryPhone'
  | 'primaryEmail'
  | 'fullName';

export interface ResultFieldConfig extends FieldConfigBase {
  extractionType: ResultExtractionType;
  format?: 'date' | 'default';
  width?: number | string;
}

export interface ResultsConfig {
  [key: string]: ResultFieldConfig;
}
