import React from 'react';
import type { Customer } from '~/types/customer';
import type{ ResultsConfig, ResultFieldConfig } from '~/types/config';
import { getCustomerValue } from '~/lib/dataExtractors';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';

interface SearchResultsDisplayProps {
  customers: Customer[];
  config: ResultsConfig;
}

export const SearchResultsDisplay: React.FC<SearchResultsDisplayProps> = ({ customers, config }) => {
  const sortedResultFields: ResultFieldConfig[] = React.useMemo(() => {
    return Object.values(config).sort((a, b) => a.renderOrder - b.renderOrder);
  }, [config]);

  if (customers.length === 0) {
    return <p className="text-center text-gray-500 mt-8">No customers found matching the criteria.</p>;
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {sortedResultFields.map((field) => (
              <TableHead key={field.key} style={{ width: 6000 }}>
                {field.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id} className="hover:bg-gray-50">
              {sortedResultFields.map((fieldConfig) => (
                <TableCell key={fieldConfig.key}>
                  {getCustomerValue(customer, fieldConfig)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
