import { useState, useCallback } from 'react';
import type { Customer } from '~/types/customer';

const API_URL = 'http://localhost:3001/customers';

interface SearchCriteria {
  [key: string]: string;
}

export const useCustomerSearch = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchCustomers = useCallback(async (criteria: SearchCriteria) => {
    console.log('searchCustomers called with:', criteria);
    
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(criteria).forEach(([key, value]) => {
        if (value && value.trim()) {
          queryParams.append(key, value.trim());
          console.log(`✅ Adding to query: ${key}=${value.trim()}`);
        } else {
          console.log(`❌ Skipping empty field: ${key}`);
        }
      });

      const queryString = queryParams.toString();
      const url = `${API_URL}${queryString ? '?' + queryString : ''}`;
      
      console.log('Final URL:', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Customer[] = await response.json();
      console.log(' Received data:', data);
      console.log(' Number of results:', data.length);
      
      setCustomers(data);
    } catch (err) {
      console.error('❌ Search failed:', err);
      setError('Failed to fetch customers. Please check the JSON Server status (port 3001).');
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    console.log('Clearing search results');
    setCustomers([]);
    setError(null);
  }, []);

  return { 
    customers, 
    isLoading, 
    error, 
    searchCustomers,
    clearSearch 
  };
};