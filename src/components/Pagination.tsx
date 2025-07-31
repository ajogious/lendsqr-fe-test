import styles from "./Pagination.module.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const MAX_VISIBLE_PAGES = 3;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    let leftSide = currentPage - 1;
    let rightSide = currentPage + 1;

    if (currentPage > 1) {
      pages.push(
        <button
          key={1}
          className={styles.pageButton}
          onClick={() => goToPage(1)}
          aria-label={`Go to page 1`}
        >
          1
        </button>
      );
      if (currentPage > 2) {
        pages.push(
          <span key="left-ellipsis" className={styles.ellipsis}>
            ...
          </span>
        );
      }
    }

    for (let i = leftSide; i <= rightSide; i++) {
      if (i > 0 && i <= totalPages) {
        pages.push(
          <button
            key={i}
            className={`${styles.pageButton} ${
              i === currentPage ? styles.active : ""
            }`}
            onClick={() => goToPage(i)}
            aria-label={`Go to page ${i}`}
            aria-current={i === currentPage ? "page" : undefined}
          >
            {i}
          </button>
        );
      }
    }

    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        pages.push(
          <span key="right-ellipsis" className={styles.ellipsis}>
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          className={styles.pageButton}
          onClick={() => goToPage(totalPages)}
          aria-label={`Go to page ${totalPages}`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={styles.container}>
      <div className={styles.resultCount}>
        Showing <strong>{startItem}</strong> to <strong>{endItem}</strong> of{" "}
        <strong>{totalItems}</strong> entries
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.navButton}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {renderPageNumbers()}

        <button
          className={styles.navButton}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
