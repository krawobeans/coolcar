import React, { useState } from 'react';
import { learnFromWeb } from '../utils/chatLearning';

export default function TestSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const searchResults = await learnFromWeb(query);
      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Test Google Search Integration</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !query}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="text-red-500 mb-4">
          Error: {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold">Search Results:</h3>
          {results.map((result, index) => (
            <div key={index} className="border p-3 rounded">
              <p className="text-gray-600">Source: {result.source}</p>
              <p>{result.content}</p>
              <p className="text-sm text-gray-500">Relevance: {result.relevance.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 