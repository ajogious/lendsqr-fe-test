import { useMemo } from "react";
import styles from "./Pagination.module.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Props type for Pagination component
type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
};

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate options for items per page dropdown based on totalItems
  const itemsPerPageOptions = useMemo(() => {
    const defaultOptions = [10, 20, 50, 100, 200, 500];
    const filtered = defaultOptions.filter((opt) => opt < totalItems);
    if (!filtered.includes(totalItems)) filtered.push(totalItems);
    return filtered;
  }, [totalItems]);

  // Change page handler with bounds checking
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Items per page dropdown change handler
  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = Number(e.target.value);
    onItemsPerPageChange(newItemsPerPage);
    onPageChange(1); // reset to page 1 when page size changes
  };

  // Render pagination buttons including ellipsis logic
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if not enough pages at the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // If startPage > 1, show "1" and ellipsis
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className={`${styles.pageButton} ${
            1 === currentPage ? styles.active : ""
          }`}
          onClick={() => goToPage(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="left-ellipsis" className={styles.ellipsis}>
            ...
          </span>
        );
      }
    }

    // Render main page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageButton} ${
            i === currentPage ? styles.active : ""
          }`}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }

    // If endPage < totalPages, show ellipsis and last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="right-ellipsis" className={styles.ellipsis}>
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          className={`${styles.pageButton} ${
            totalPages === currentPage ? styles.active : ""
          }`}
          onClick={() => goToPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={styles.container}>
      {/* Items-per-page selector */}
      <div className={styles.showingText}>
        Showing
        <select
          className={styles.itemsPerPageSelect}
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          {itemsPerPageOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt === totalItems ? `All (${opt})` : opt}
            </option>
          ))}
        </select>
        out of <span className={styles.totalItems}>{totalItems}</span>
      </div>

      {/* Pagination controls */}
      <div className={styles.paginationControls}>
        {/* Previous button */}
        <button
          className={styles.navButton}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page number buttons */}
        <div className={styles.pageNumbers}>{renderPageNumbers()}</div>

        {/* Next button */}
        <button
          className={styles.navButton}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
