import type{ Customer, Phone, Email } from '~/types/customer';
import type{ ResultFieldConfig } from '~/types/config';

const findPrimaryItem = <T extends { isPrimary: boolean }>(
  items: T[],
  mapToString: (item: T) => string | undefined
): string => {
  const primaryItem = items.find((item) => item.isPrimary);
  return primaryItem ? mapToString(primaryItem) ?? 'N/A' : 'N/A';
};

export const getCustomerValue = (customer: Customer, config: ResultFieldConfig): string => {
  const { key, extractionType } = config;

  switch (extractionType) {
    case 'simple':
      return String(customer[key as keyof Customer] ?? 'N/A');
    case 'fullName':
      return `${customer.firstName} ${customer.lastName}`;
    case 'primaryPhone': {
      const phones: Phone[] = customer.phones || [];
      return findPrimaryItem(phones, (p) => p.number);
    }
    case 'primaryEmail': {
      const emails: Email[] = customer.emails || [];
      return findPrimaryItem(emails, (e) => e.address);
    }
    default:
      return `[ERR: Unknown Extractor for ${key}]`;
  }
};
