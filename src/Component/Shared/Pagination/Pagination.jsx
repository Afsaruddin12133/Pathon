import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = ({ pagination, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= pagination.last_page; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(pagination.current_page - 1)}
        disabled={pagination.current_page === 1}
        className="p-2 border rounded disabled:opacity-40"
      >
        <MdKeyboardDoubleArrowLeft />
      </button>

      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 border rounded ${
            num === pagination.current_page ? "bg-purple-600 text-white" : ""
          }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onPageChange(pagination.current_page + 1)}
        disabled={pagination.current_page === pagination.last_page}
        className="p-2 border rounded disabled:opacity-40"
      >
        <MdKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
