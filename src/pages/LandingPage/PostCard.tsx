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
    explanation,
    tags,
    roles,
    imageLink,
    investAmount,
    isActive,
    employmentEndDate,
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
        {imageLink != null ? (
          <img
            src={imageLink}
            alt={companyName}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f0f0f0',
            }}
          >
            No Image
          </div>
        )}
      </div>

      {/* 회사 정보 */}
      <div className="post-card-content">
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '8px',
          }}
        >
          {companyName}
        </h3>

        {/* 태그 목록 */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            marginBottom: '8px',
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '4px 8px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 역할 목록 */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            marginBottom: '8px',
          }}
        >
          {roles.map((role) => (
            <span
              key={role.id}
              style={{
                padding: '4px 8px',
                backgroundColor: '#e3f2fd',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              {role.category}
            </span>
          ))}
        </div>

        {/* 투자 정보 */}
        {investAmount != null && (
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>
            투자금액: {investAmount.toLocaleString()}만원
          </p>
        )}

        {/* 채용 마감일 */}
        <p
          style={{
            fontSize: '14px',
            color: isActive ? 'green' : 'red',
            marginBottom: '12px',
          }}
        >
          마감일: {new Date(employmentEndDate).toLocaleDateString()}
        </p>

        {/* 설명 */}
        <p
          style={{
            fontSize: '14px',
            marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {explanation}
        </p>

        {/* 상세보기 버튼 */}
        <Button
          onClick={() => {
            onDetailClick(id);
          }}
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
