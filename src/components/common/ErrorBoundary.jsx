import { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
    
    // You could add error reporting service here
    // Example: reportErrorToService(error, errorInfo);
  }

  render() {
    const { fallback } = this.props;
    
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback(this.state.error, this.resetError);
      }
      
      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
            <div className="text-red-500 text-5xl mb-4">
              <span role="img" aria-label="Error">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Refresh Page
              </button>
              <Link
                to="/"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Go to Home
              </Link>
            </div>
            {this.props.showDetails && this.state.errorInfo && (
              <details className="mt-6 text-left bg-gray-50 p-4 rounded border text-sm">
                <summary className="cursor-pointer font-medium mb-2">Error Details</summary>
                <pre className="overflow-auto p-2 bg-gray-200 rounded">
                  {this.state.error && this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 