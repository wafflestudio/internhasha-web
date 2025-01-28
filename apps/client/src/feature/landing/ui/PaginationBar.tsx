import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationProps = {
  totalPages: number; // 전체 페이지 수
  pagesPerGroup?: number; // 페이지 그룹에 포함할 페이지 수(default=5)
  currentPage: number; // 현재 선택된 페이지 (0-based index)
  currentGroup: number; // 현재 선택된 그룹 (0-based index)
  onChangePage: (page: number) => void; // 페이지 변경 이벤트
  onChangeGroup: (group: number) => void; // 그룹 변경 이벤트
};

export const PaginationBar = ({
  totalPages,
  pagesPerGroup = 5,
  currentPage,
  currentGroup,
  onChangePage,
  onChangeGroup,
}: PaginationProps) => {
  const startPage = currentGroup * pagesPerGroup;
  const endPage = Math.min(startPage + pagesPerGroup, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage },
    (_, i) => startPage + i,
  );

  const handlePrevGroup = () => {
    onChangeGroup(Math.max(currentGroup - 1, 0));
  };

  const handleNextGroup = () => {
    if (startPage + pagesPerGroup < totalPages) {
      onChangeGroup(currentGroup + 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevGroup}
            isActive={currentGroup !== 0}
          />
        </PaginationItem>
        {pageNumbers.map((page, idx) => (
          <PaginationItem key={`pagination-button-${idx}`}>
            <PaginationLink
              onClick={() => {
                onChangePage(page);
              }}
              isActive={currentPage === page}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={handleNextGroup}
            isActive={startPage + pagesPerGroup < totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
