import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { useGuardContext } from '@/shared/context/hooks.ts';
import { ServiceContext } from '@/shared/context/ServiceContext.ts';
import { TokenContext } from '@/shared/context/TokenContext.ts';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation.ts';
import { Button } from '@/components/button';

export const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const { toMain } = useRouteNavigation();

  // url parameter 가 잘못되었을 경우 어떻게?
  if (postId === undefined) {
    throw new Error('잘못된 접근입니다.');
  }

  const { postDetailData } = useGetPostDetail({ postId: postId });

  if (postDetailData === undefined) {
    return <div>로딩 중...</div>;
  }

  if (postDetailData.type === 'error') {
    return <div>정보를 불러오는 중 문제가 발생했습니다. 새로고침해주세요.</div>;
  }

  const {
    companyName,
    imageLink,
    explanation,
    roles,
    tags,
    investAmount,
    employmentEndDate,
    isActive,
    IRDeckLink,
    landingPageLink,
  } = postDetailData.data;

  return (
    <div className="post-detail" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>

      <Button
        onClick={toMain}
        style={{
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
        }}
      >
        ← 메인 페이지로
      </Button>

      {/* 헤더 섹션 */}
      <div style={{
        display: 'flex',
        gap: '24px',
        marginBottom: '32px',
        alignItems: 'flex-start'
      }}>
        {/* 회사 이미지 */}
        <div style={{
          width: '320px',
          height: '240px',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#f5f5f5'
        }}>
          {(imageLink != null) ? (
            <img
              src={imageLink}
              alt={companyName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              No Image
            </div>
          )}
        </div>

        {/* 회사 기본 정보 */}
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h1 style={{ fontSize: '28px', margin: 0 }}>{companyName}</h1>
            <span style={{
              padding: '4px 12px',
              borderRadius: '16px',
              backgroundColor: isActive ? '#e6f4ea' : '#fce8e6',
              color: isActive ? '#137333' : '#c5221f'
            }}>
              {isActive ? '채용중' : '마감'}
            </span>
          </div>

          <p style={{ fontSize: '16px', marginBottom: '16px' }}>{explanation}</p>

          {/* 태그 목록 */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {tags.map((tag) => (
              <span key={tag} style={{
                padding: '4px 12px',
                backgroundColor: '#f1f3f4',
                borderRadius: '16px',
                fontSize: '14px'
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* 투자 정보 */}
          {(investAmount != null) && (
            <p style={{ marginBottom: '8px' }}>
              <strong>투자금액:</strong> {investAmount.toLocaleString()}만원
            </p>
          )}

          <p style={{ marginBottom: '8px' }}>
            <strong>채용 마감일:</strong> {new Date(employmentEndDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* 채용 포지션 섹션 */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>채용 포지션</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px'
        }}>
          {roles.map((role) => (
            <div key={role.id} style={{
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              backgroundColor: '#ffffff'
            }}>
              <h3 style={{
                fontSize: '18px',
                marginBottom: '8px',
                color: '#1a73e8'
              }}>
                {role.category}
              </h3>
              <p style={{ fontSize: '14px' }}>{role.detail}</p>
              <p style={{ fontSize: '14px', color: '#5f6368' }}>
                채용 인원: {role.headcount}명
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 관련 링크 섹션 */}
      <section>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>관련 링크</h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          {(landingPageLink != null) && (
            <a
              href={landingPageLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 16px',
                backgroundColor: '#1a73e8',
                color: 'white',
                borderRadius: '4px',
                textDecoration: 'none'
              }}
            >
              회사 홈페이지
            </a>
          )}
          {(IRDeckLink != null) && (
            <a
              href={IRDeckLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 16px',
                backgroundColor: '#1a73e8',
                color: 'white',
                borderRadius: '4px',
                textDecoration: 'none'
              }}
            >
              IR 자료
            </a>
          )}
        </div>
      </section>
    </div>
  );
};

const useGetPostDetail = ({ postId }: { postId: string }) => {
  const { token } = useGuardContext(TokenContext);
  const { postService } = useGuardContext(ServiceContext);

  const { data: postDetailData } = useQuery({
    queryKey: ['post', token] as const,
    queryFn: ({ queryKey: [, t] }) => {
      if (t === null) {
        // 나중에 optional token call 만들기
        return postService.getPostDetail({ token: '', postId: postId });
      }
      return postService.getPostDetail({ token: t, postId: postId });
    },
  });

  return { postDetailData };
};
