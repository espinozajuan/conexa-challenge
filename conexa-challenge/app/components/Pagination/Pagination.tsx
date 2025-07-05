import { PaginationProps } from "./Pagination.types";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className={`px-4 py-2 rounded ${
          hasPrev
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        Anterior
      </button>

      <span className="text-sm text-black">
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={`px-4 py-2 rounded ${
          hasNext
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        Siguiente
      </button>
    </div>
  );
}
