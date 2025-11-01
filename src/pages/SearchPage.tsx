import React, { useCallback } from 'react';
import { useCustomerSearch } from '~/hooks/useCustomerSearch';
import { GenericSearchForm } from '~/components/forms/GenericSearchForm';
import { SearchResultsDisplay } from '~/components/SearchResultsDisplay';
import { searchConfig, resultsConfig } from '~/config/appConfig';
import { Separator } from '~/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { AlertCircle, Search, Users, TrendingUp, Sparkles } from 'lucide-react';
import { Skeleton } from '~/components/ui/skeleton';

type SearchCriteria = Record<string, string>;

const SearchPage: React.FC = () => {
  const { customers, isLoading, error, searchCustomers, clearSearch } = useCustomerSearch();
  const [hasSearched, setHasSearched] = React.useState(false);

  const handleSearch = useCallback((criteria: SearchCriteria) => {
    if (Object.keys(criteria).length > 0) {
      searchCustomers(criteria);
      setHasSearched(true);
    }
  }, [searchCustomers]);

  const handleClear = useCallback(() => {
    clearSearch();
    setHasSearched(false);
  }, [clearSearch]);

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="w-full p-8 space-y-8">
        <header className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-10 shadow-2xl">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                <Search className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  Customer Search Application
                  <Sparkles className="h-7 w-7 text-yellow-300 animate-pulse" />
                </h1>
                <p className="text-blue-100 text-xl mt-2">
                  Powerful search filters and dynamic results at your fingertips
                </p>
              </div>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-400/20 rounded-full blur-2xl"></div>
        </header>

        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
              <Search className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Search Filters
            </h2>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <GenericSearchForm 
              config={searchConfig} 
              onSubmit={handleSearch}
              onClear={handleClear}
              isLoading={isLoading} 
            />
          </div>
        </section>

        <Separator className="bg-gradient-to-r from-transparent via-indigo-300 to-transparent h-0.5" />

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Search Results
              </h2>
            </div>
            
            {hasSearched && !isLoading && (
              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg animate-fadeIn">
                <TrendingUp className="h-5 w-5 text-white" />
                <span className="text-white font-semibold text-lg">{customers.length} Found</span>
              </div>
            )}
          </div>
          
          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50 shadow-lg animate-fadeIn">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-lg font-semibold">Error Occurred</AlertTitle>
              <AlertDescription className="text-base">{error}</AlertDescription>
            </Alert>
          )}

          {isLoading && (
            <div className="space-y-4 animate-fadeIn">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-20 w-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-shimmer" />
                </div>
              ))}
            </div>
          )}

          {hasSearched && customers.length > 0 && !isLoading && (
            <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-8 animate-fadeIn hover:shadow-2xl transition-all duration-300">
              <SearchResultsDisplay 
                customers={customers} 
                config={resultsConfig} 
              />
            </div>
          )}
          
          {hasSearched && !isLoading && customers.length === 0 && !error && (
            <Alert className="border-amber-200 bg-amber-50 shadow-lg animate-fadeIn">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <AlertTitle className="text-lg font-semibold text-amber-900">No Results Found</AlertTitle>
              <AlertDescription className="text-base text-amber-800">
                No customers match your search criteria. Try different filters or reset to search again.
              </AlertDescription>
            </Alert>
          )}
          
          {!hasSearched && !isLoading && !error && (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 p-16 border-2 border-dashed border-indigo-300 shadow-inner animate-fadeIn">
              <div className="text-center space-y-6">
                <div className="inline-block p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl">
                  <Search className="h-16 w-16 text-white" />
                </div>
                <p className="text-2xl text-slate-600 font-medium">
                  Ready to find customers?
                </p>
                <p className="text-lg text-slate-500">
                  Enter your search criteria above and click <span className="font-semibold text-indigo-600">'Search Customers'</span> to begin
                </p>
              </div>
              
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-200/30 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-200/30 rounded-full blur-2xl"></div>
            </div>
          )}
        </section>
      </div>
    </div>

  );
};

export default SearchPage;