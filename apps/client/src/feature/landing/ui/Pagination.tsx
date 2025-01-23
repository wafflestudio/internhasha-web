import { Button } from '@/components/button';

interface PaginationProps {
  totalPages: number; // 전체 페이지 수
  pagesPerGroup?: number; // 페이지 그룹에 포함할 페이지 수(default=5)
  currentPage: number; // 현재 선택된 페이지 (0-based index)
  currentGroup: number; // 현재 선택된 그룹 (0-based index)
  onChangePage: (page: number) => void; // 페이지 변경 이벤트
  onChangeGroup: (group: number) => void; // 그룹 변경 이벤트
}

export const Pagination = ({
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
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
    >
      <Button onClick={handlePrevGroup} disabled={currentGroup === 0}>
        이전
      </Button>

      {pageNumbers.map((page, idx) => (
        <Button
          key={`pagination-button-${idx}`}
          onClick={() => {
            onChangePage(page);
          }}
          style={{
            margin: '0 5px',
            fontWeight: currentPage === page ? 'bold' : 'normal',
          }}
        >
          {page + 1} {/* 사용자에게 1-based index로 표시 */}
        </Button>
      ))}

      <Button
        onClick={handleNextGroup}
        disabled={startPage + pagesPerGroup >= totalPages}
      >
        다음
      </Button>
    </div>
  );
};
