import type { Series } from '@/entities/post.ts';

export const SeriesBadge = ({ series, className }: { series: Series, className?: string }) => {
  return (
    <>
      <span
        className={`px-2 py-1 text-xs rounded ${
          series === 'PRE_A' || series === 'A'
            ? 'bg-blue-100 text-blue-900'
            : series === 'B'
              ? 'bg-red-100 text-red-900'
              : series === 'C'
                ? 'bg-green-100 text-green-900'
                : series === 'D'
                  ? 'bg-yellow-100 text-yellow-900'
                  : 'bg-gray-200 text-gray-800'
        } ${className}`}
      >
        {series === 'PRE_A'
          ? 'Pre-Series A'
          : series.length === 1
            ? `Series ${series}`
            : 'Seed'}
      </span>
    </>
  );
};
