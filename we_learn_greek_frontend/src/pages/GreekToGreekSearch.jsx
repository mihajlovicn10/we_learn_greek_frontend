import { useState } from 'react';
import { greekToGreekAPI } from '../services/api';

function GreekToGreekSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await greekToGreekAPI.getAllWords();
      const filtered = data.filter(word => 
        word.greek_word.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Under Construction.....</h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
          </div>
        </form>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {searchResults && (
          <div className="space-y-4">
            {searchResults.length === 0 ? (
              <p className="text-center text-gray-500">Δεν βρέθηκαν αποτελέσματα.</p>
            ) : (
              searchResults.map((word) => (
                <div key={word.id} className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold text-blue-600 mb-2">
                    {word.greek_word}
                  </h2>
                  <p className="text-gray-700">
                    {word.greek_explanation}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GreekToGreekSearch;
