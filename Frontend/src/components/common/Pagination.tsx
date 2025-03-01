import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  if (totalPages < 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 my-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`px-3 py-1 rounded ${
          currentPage <= 1 
            ? 'bg-stone-500 cursor-not-allowed opacity-50' 
            : 'bg-stone-700 hover:bg-stone-600'
        }`}
      >
        Previous
      </button>
      
      <span className="px-3 py-1">
        Page {currentPage} of {totalPages || 1}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`px-3 py-1 rounded ${
          currentPage >= totalPages 
            ? 'bg-stone-500 cursor-not-allowed opacity-50' 
            : 'bg-stone-700 hover:bg-stone-600'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;