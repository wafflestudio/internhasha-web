import { Button } from '@/components/button';
import type { PostBriefDTO } from '@/shared/api/entities';

interface PostCardProps {
  post: PostBriefDTO;
  onDetailClick: (postId: string) => void;
}

export const PostCard = ({ post, onDetailClick }: PostCardProps) => {
  const {
    id,
    companyName,
    slogan,
    title,
    series,
    category,
    isActive,
    imageLink,
    investAmount,
    employmentEndDate,
    headcount,
    isAlways,
  } = post;

  return (
    <div
      className="post-card"
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        margin: '12px',
        maxWidth: '320px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* 회사 이미지 */}
      <div
        className="post-card-image"
        style={{
          width: '100%',
          height: '160px',
          backgroundColor: '#f5f5f5',
          marginBottom: '12px',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <img
          src={imageLink}
          alt={companyName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* 회사 정보 */}
      <div className="post-card-content">
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '4px',
          }}
        >
          {companyName}
        </h3>

        {/* 슬로건 */}
        <p
          style={{
            fontSize: '14px',
            color: '#666',
            marginBottom: '12px',
          }}
        >
          {slogan}
        </p>

        {/* 채용 공고 제목 */}
        <h4
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '8px',
            color: '#1a73e8',
          }}
        >
          {title}
        </h4>

        {/* 시리즈 & 카테고리 */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '8px',
          }}
        >
          <span
            style={{
              padding: '4px 8px',
              backgroundColor: '#e3f2fd',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            Series {series}
          </span>
          <span
            style={{
              padding: '4px 8px',
              backgroundColor: '#e8f5e9',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            {category}
          </span>
        </div>

        {/* 투자 정보 */}
        {(investAmount != null) && (
          <p style={{ fontSize: '14px', marginBottom: '4px' }}>
            투자금액: {investAmount.toLocaleString()}만원
          </p>
        )}

        {/* 채용 정보 */}
        <div
          style={{
            fontSize: '14px',
            marginBottom: '12px',
          }}
        >
          <p>채용 인원: {headcount}명</p>
          <p style={{
            color: isActive ? 'green' : 'red',
          }}>
            {isAlways ? '상시 채용' : `마감일: ${new Date(employmentEndDate).toLocaleDateString()}`}
          </p>
        </div>

        {/* 상세보기 버튼 */}
        <Button
          onClick={() => { onDetailClick(id); }}
          style={{
            width: '100%',
          }}
        >
          자세히 보기
        </Button>
      </div>
    </div>
  );
};
