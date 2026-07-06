import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Previous page"
      >
        <FaChevronLeft size={14} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
            currentPage === page
              ? 'border-brand-600 bg-brand-600 text-white'
              : 'border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Next page"
      >
        <FaChevronRight size={14} />
      </button>
    </nav>
  );
}

export default Pagination;
