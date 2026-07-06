import { useState } from 'react';
import { dictionaryAPI } from '../services/api';

function AddWord() {
  const [formData, setFormData] = useState({
    greek_word: '',
    pronounciation: '',
    translation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await dictionaryAPI.addWord(formData);
      setSuccess(true);
      setFormData({
        greek_word: '',
        pronounciation: '',
        translation: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add New Word</h1>
        
        {success && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
            Word successfully added!
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="greek_word" className="block text-sm font-medium text-gray-700 mb-1">
              Greek Word
            </label>
            <input
              type="text"
              id="greek_word"
              name="greek_word"
              value={formData.greek_word}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the word in Greek alphabet"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Only Greek alphabet allowed, optionally with an article
            </p>
          </div>

          <div>
            <label htmlFor="pronounciation" className="block text-sm font-medium text-gray-700 mb-1">
              Pronounciation
            </label>
            <input
              type="text"
              id="pronounciation"
              name="pronounciation"
              value={formData.pronounciation}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the pronounciation in Latin script"
              required
            />
          </div>

          <div>
            <label htmlFor="translation" className="block text-sm font-medium text-gray-700 mb-1">
              Translation
            </label>
            <input
              type="text"
              id="translation"
              name="translation"
              value={formData.translation}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the translation"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
          >
            {loading ? 'Adding...' : 'Add Word'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddWord;
