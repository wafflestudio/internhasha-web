import { useMutation } from '@tanstack/react-query';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';

import { FormContainer } from '@/components/form';
import { LabelContainer } from '@/components/input/LabelContainer';
import { CancelCheckModal } from '@/components/modal/CancelCheckModal';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createErrorMessage } from '@/entities/errors';
import type { Series } from '@/entities/post';
import type { CreateCompanyRequest } from '@/entities/post';
import {
  MAX_EXPLANATION_LENGTH,
  MAX_SLOGAN_LENGTH,
  seriesList,
} from '@/feature/company/presentation/companypresentation';
import { companyPresentation } from '@/feature/company/presentation/companypresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const CreateCompanyForm = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [imageResponseMessage, setImageResponseMessage] = useState('');
  const [pdfResponseMessage, setPdfResponseMessage] = useState('');

  const {
    companyName,
    email,
    slogan,
    tags,
    series,
    investAmount,
    investCompany,
    landingPageLink,
    externalDescriptionLink,
    explanation,
  } = companyPresentation.useValidator({});
  const { rawTags, thumbnail, IRDeckPreview } =
    companyPresentation.useUtilState();
  const { tagValidator, tagInputValidator } = companyPresentation.validator;
  const { tagsFilter, investCompanyFilter, externalDescriptionLinkFilter } =
    companyPresentation.filter;
  const { toMain } = useRouteNavigation();

  const addThumbnailImage = (file: File | undefined) => {
    if (file !== undefined && file.type.startsWith('image/')) {
      thumbnail.onChange({ file, url: URL.createObjectURL(file) });
    }
  };

  const removeImage = () => {
    thumbnail.onChange(null);
  };

  const addPdfPreview = (file: File | undefined) => {
    if (file !== undefined && file.type === 'application/pdf') {
      IRDeckPreview.onChange({ file, url: URL.createObjectURL(file) });
    }
  };

  const removePdf = () => {
    IRDeckPreview.onChange(null);
  };

  const handleClickCancelButton = () => {
    setIsCancel(true);
  };

  const closeCancelModal = () => {
    setIsCancel(false);
  };

  const handleChangeResponseMessage = (input: string) => {
    setResponseMessage(input);
  };
  const handleChangeImageResponseMessage = (input: string) => {
    setImageResponseMessage(input);
  };
  const handleChangePdfResponseMessage = (input: string) => {
    setPdfResponseMessage(input);
  };

  const { uploadFile, isPending: isUploadFilePending } = useUploadFile({
    setResponseMessage: handleChangeResponseMessage,
  });
  const { getPresignedUrl: uploadImage, isPending: isUploadImagePending } =
    useGetPresignedUrl({
      onSuccess: ({ presignedUrl }: { presignedUrl: string }) => {
        uploadFile({ file: thumbnail.value?.file, presignedUrl });
      },
      setResponseMessage: handleChangeImageResponseMessage,
    });
  const { getPresignedUrl: uploadPdf, isPending: isUploadPdfPending } =
    useGetPresignedUrl({
      onSuccess: ({ presignedUrl }: { presignedUrl: string }) => {
        uploadFile({ file: IRDeckPreview.value?.file, presignedUrl });
      },
      setResponseMessage: handleChangePdfResponseMessage,
    });
  const { createCompany, isPending: isCreateCompanyPending } = useCreateCompany(
    { setResponseMessage },
  );

  const isPending =
    isUploadFilePending ||
    isUploadImagePending ||
    isUploadPdfPending ||
    isCreateCompanyPending;

  const handleSubmit = () => {
    setIsSubmit(true);
    if (thumbnail.value !== null) {
      uploadImage({
        fileName: thumbnail.value.file.name,
        fileType: thumbnail.value.file.type,
      });
    }
    if (IRDeckPreview.value !== null) {
      uploadPdf({
        fileName: IRDeckPreview.value.file.name,
        fileType: IRDeckPreview.value.file.type,
      });
    }
    if (imageResponseMessage !== '' || pdfResponseMessage !== '') {
      return;
    }
    if (
      companyName.isError ||
      email.isError ||
      slogan.isError ||
      investAmount.isError ||
      thumbnail.value === null ||
      series.value === 'NONE'
    ) {
      return;
    }
    createCompany({
      company: {
        companyName: companyName.value,
        explanation: explanation.value,
        email: email.value,
        slogan: slogan.value,
        investAmount: Number(investAmount.value),
        investCompany: investCompanyFilter(investCompany.value).join(','),
        series: series.value,
        irDeckLink:
          IRDeckPreview.value !== null ? IRDeckPreview.value.url : undefined,
        landingPageLink: landingPageLink.value,
        imageLink: thumbnail.value.url,
        externalDescriptionLink: externalDescriptionLinkFilter(
          externalDescriptionLink.value,
        ),
        tags: tagsFilter(tags.value),
      },
    });
  };

  return (
    <>
      <FormContainer
        handleSubmit={handleSubmit}
        response={responseMessage}
        className="gap-10"
      >
        <LabelContainer label="회사명" id="companyName" required>
          <Input
            id="companyName"
            value={companyName.value}
            placeholder="회사명을 입력해주세요."
            disabled={isPending}
            onChange={(e) => {
              companyName.onChange(e.target.value);
            }}
          />
          {isSubmit && companyName.isError && (
            <FormErrorResponse>올바른 회사명을 입력해주세요.</FormErrorResponse>
          )}
        </LabelContainer>
        <LabelContainer label="회사 이메일" id="companyEmail" required>
          <Input
            id="companyEmail"
            value={email.value}
            placeholder="회사 이메일을 입력해주세요."
            disabled={isPending}
            onChange={(e) => {
              email.onChange(e.target.value);
            }}
          />
          {isSubmit && email.isError && (
            <FormErrorResponse>
              올바르지 않은 이메일 형식입니다.
            </FormErrorResponse>
          )}
        </LabelContainer>
        <LabelContainer label="한 줄 소개" id="slogan" required>
          <Input
            id="slogan"
            value={slogan.value}
            placeholder="한 줄 소개를 입력해주세요."
            disabled={isPending}
            onChange={(e) => {
              slogan.onChange(e.target.value);
            }}
          />
          <div className="flex flex-col gap-1">
            <div className="flex w-full justify-between">
              <FormInfoResponse>
                한 줄 소개는 공고 카드에 보여져요.
              </FormInfoResponse>
              <span
                className={`text-sm ${slogan.value.length > MAX_SLOGAN_LENGTH ? 'text-red' : 'text-grey-normal'}`}
              >
                {slogan.value.length}/{MAX_SLOGAN_LENGTH}
              </span>
            </div>
            {isSubmit && slogan.isError && (
              <FormErrorResponse>
                한 줄 소개는 {MAX_SLOGAN_LENGTH}자 이내로 작성해주세요.
              </FormErrorResponse>
            )}
          </div>
        </LabelContainer>
        <LabelContainer label="회사 상세 소개" required>
          <div data-color-mode="light">
            <MDEditor
              value={explanation.value}
              onChange={(value) => {
                explanation.onChange(value ?? '');
              }}
            />
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex w-full justify-between">
                <FormInfoResponse>
                  상세 소개는 공고 글에 보여져요.
                </FormInfoResponse>
                <span
                  className={`text-sm ${explanation.value.length > MAX_EXPLANATION_LENGTH ? 'text-red' : 'text-grey-normal'}`}
                >
                  {explanation.value.length}/{MAX_EXPLANATION_LENGTH}
                </span>
              </div>

              {isSubmit && explanation.isError && (
                <FormErrorResponse>
                  상세 소개는 {MAX_EXPLANATION_LENGTH}자 이내로 작성해주세요.
                </FormErrorResponse>
              )}
            </div>
          </div>
        </LabelContainer>
        <LabelContainer label="대표 사진" id="imageLink" required>
          {thumbnail.value !== null ? (
            <div>
              <img src={thumbnail.value.url} alt="회사 대표 이미지 썸네일" />
              <Button onClick={removeImage} disabled={isPending}>
                삭제
              </Button>
            </div>
          ) : (
            <label htmlFor="fileInput">
              <span>이미지 등록</span>
            </label>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            disabled={isPending}
            onChange={(e) => {
              if (e.target.files !== null) {
                addThumbnailImage(e.target.files[0]);
              }
            }}
          />
          <div className="flex flex-col gap-1">
            <FormInfoResponse>
              회사 썸네일 이미지는 정사각형 비율(1:1)로 보여져요.
            </FormInfoResponse>
            {isSubmit && thumbnail.isError && (
              <FormErrorResponse>
                1MB 이하의 이미지 파일을 올려주세요.
              </FormErrorResponse>
            )}
            {imageResponseMessage !== '' && (
              <FormErrorResponse>{imageResponseMessage}</FormErrorResponse>
            )}
          </div>
        </LabelContainer>
        <LabelContainer label="투자 단계" id="series" required>
          <select
            disabled={isPending}
            onChange={(e) => {
              if (seriesList.includes(e.target.value)) {
                series.onChange(e.target.value as Series);
              }
            }}
          >
            <option value="NONE" disabled hidden></option>
            {seriesList.map((seriesItem, idx) => (
              <option key={idx} value={seriesItem}>
                {seriesItem}
              </option>
            ))}
          </select>
          {isSubmit && series.isError && (
            <FormErrorResponse>투자 단계를 선택해주세요.</FormErrorResponse>
          )}
        </LabelContainer>
        <LabelContainer label="누적 투자액" id="investAmount" required>
          <div className="flex items-center gap-2">
            <Input
              id="investAmount"
              value={investAmount.value}
              placeholder="100"
              disabled={isPending}
              onChange={(e) => {
                investAmount.onChange(e.target.value);
              }}
              className="w-[190px]"
            />
            <span>천만원</span>
          </div>
          {isSubmit && investAmount.isError && (
            <FormErrorResponse>
              0 이상의 양의 정수로 입력해주세요.
            </FormErrorResponse>
          )}
        </LabelContainer>
        <LabelContainer label="투자사 정보" id="investCompany" required>
          {investCompany.value.map((company, index) => (
            <div key={`invest-company-${index}`}>
              <Input
                value={company}
                placeholder="투자사 이름을 입력해주세요."
                disabled={isPending}
                onChange={(e) => {
                  investCompany.onChange({
                    input: e.target.value,
                    index,
                    mode: 'PATCH',
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    investCompany.onChange({ input: '', mode: 'ADD' });
                  }
                }}
              />
              <Button
                variant="outline"
                disabled={isPending}
                onClick={(e) => {
                  e.preventDefault();
                  investCompany.onChange({ input: company, mode: 'REMOVE' });
                }}
              >
                삭제
              </Button>
            </div>
          ))}
          <Button
            variant="secondary"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              investCompany.onChange({ input: '', mode: 'ADD' });
            }}
          >
            추가
          </Button>
          {isSubmit && investCompany.isError && (
            <FormErrorResponse>
              투자사 정보는 1개 이상, 10개 이하로 중복되지 않게 입력해주세요.
            </FormErrorResponse>
          )}
        </LabelContainer>
        <LabelContainer label="해시태그" id="tags">
          {tags.value.map((tag) => (
            <div key={`tag-${tag}`}>
              <span>{tag}</span>
              <Button
                disabled={isPending}
                onClick={(e) => {
                  e.preventDefault();
                  tags.onChange({ input: tag, mode: 'REMOVE' });
                }}
              >
                삭제
              </Button>
            </div>
          ))}
          <Input
            value={rawTags.value}
            placeholder="회사를 소개하는 태그를 입력해주세요. (최대 10개)"
            disabled={isPending}
            onChange={(e) => {
              rawTags.onChange(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (
                  tagValidator({ tag: rawTags.value.trim(), tags: tags.value })
                ) {
                  tags.onChange({ input: rawTags.value.trim(), mode: 'ADD' });
                  rawTags.onChange('');
                }
              }
            }}
          />
          <div className="flex flex-col gap-1">
            <FormInfoResponse>
              엔터를 치면 태그가 생성되며 한 개당 최대 8자까지 입력할 수 있어요.
            </FormInfoResponse>
            {!tagInputValidator({
              tag: rawTags.value.trim(),
              tags: tags.value,
            }) && (
              <FormErrorResponse>
                입력한 태그와 중복되지 않는 8자 이하의 태그를 작성해주세요.
              </FormErrorResponse>
            )}
            {isSubmit && tags.isError && (
              <FormErrorResponse>
                하나의 태그는 8자 이하, 총 10개까지 작성 가능합니다.
              </FormErrorResponse>
            )}
          </div>
        </LabelContainer>
        <LabelContainer label="IR Deck 자료" id="IRDeckLink">
          {IRDeckPreview.value !== null ? (
            <div>
              <p>{IRDeckPreview.value.file.name}</p>
              <Button disabled={isPending} onClick={removePdf}>
                삭제
              </Button>
            </div>
          ) : (
            <label htmlFor="pdfInput">
              <span>PDF 파일만 업로드 가능해요.</span>
            </label>
          )}
          <input
            id="pdfInput"
            type="file"
            accept="application/pdf"
            className="hidden"
            disabled={isPending}
            onChange={(e) => {
              if (e.target.files !== null) {
                addPdfPreview(e.target.files[0]);
              }
            }}
          />
          <div className="flex flex-col gap-1">
            {isSubmit && IRDeckPreview.isError && (
              <FormErrorResponse>
                5MB 이하의 PDF 파일을 올려주세요.
              </FormErrorResponse>
            )}
            {pdfResponseMessage !== '' && <p>{pdfResponseMessage}</p>}
          </div>
        </LabelContainer>
        <LabelContainer label="기업 소개 홈페이지">
          <Input
            id="landingPageLink"
            value={landingPageLink.value}
            placeholder="https://"
            disabled={isPending}
            onChange={(e) => {
              landingPageLink.onChange(e.target.value);
            }}
          />
          {isSubmit && landingPageLink.isError && (
            <FormErrorResponse>
              https로 시작하는 홈페이지 링크를 입력해주세요.
            </FormErrorResponse>
          )}
        </LabelContainer>
        <LabelContainer label="외부 소개 링크" id="externalDescriptionLink">
          {externalDescriptionLink.value.map((input, index) => (
            <div key={`external-link-${index}`}>
              <div>
                <LabelContainer label="제목">
                  <Input
                    value={input.description}
                    placeholder="링크 제목을 작성해주세요. (e.g. OO 프로젝트 성과 기사)"
                    disabled={isPending}
                    onChange={(e) => {
                      externalDescriptionLink.onChange({
                        input: {
                          link: input.link,
                          description: e.target.value,
                        },
                        index,
                        mode: 'PATCH',
                      });
                    }}
                  />
                </LabelContainer>
                <LabelContainer label="링크">
                  <Input
                    value={input.link}
                    placeholder="https://"
                    disabled={isPending}
                    onChange={(e) => {
                      externalDescriptionLink.onChange({
                        input: {
                          link: e.target.value,
                          description: input.description,
                        },
                        index,
                        mode: 'PATCH',
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        externalDescriptionLink.onChange({
                          input: { link: '', description: '' },
                          mode: 'ADD',
                        });
                      }
                    }}
                  />
                </LabelContainer>
                <Button
                  disabled={isPending}
                  onClick={(e) => {
                    e.preventDefault();
                    externalDescriptionLink.onChange({ input, mode: 'REMOVE' });
                  }}
                >
                  삭제
                </Button>
              </div>
            </div>
          ))}
          <FormInfoResponse>
            더벤처스, 잡코리아, 기사 링크 등 회사를 소개할 수 있는 기타 링크를
            첨부해주세요.
          </FormInfoResponse>
          <Button
            variant="secondary"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              externalDescriptionLink.onChange({
                input: { link: '', description: '' },
                mode: 'ADD',
              });
            }}
          >
            추가
          </Button>
          {isSubmit && externalDescriptionLink.isError && (
            <div>
              <FormErrorResponse>유효한 링크를 입력해주세요.</FormErrorResponse>
              <FormErrorResponse>
                외부 소개 링크는 최대 5개까지 입력 가능합니다.
              </FormErrorResponse>
            </div>
          )}
        </LabelContainer>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={handleClickCancelButton}
            disabled={isPending}
            className="flex-1"
          >
            뒤로가기
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1"
          >
            저장
          </Button>
        </div>
      </FormContainer>
      {isCancel && (
        <CancelCheckModal onClose={toMain} onCancel={closeCancelModal} />
      )}
    </>
  );
};

const useGetPresignedUrl = ({
  onSuccess,
  setResponseMessage,
}: {
  onSuccess({ presignedUrl }: { presignedUrl: string }): void;
  setResponseMessage(input: string): void;
}) => {
  const { fileService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const { mutate: getPresignedUrl, isPending } = useMutation({
    mutationFn: ({
      fileName,
      fileType,
    }: {
      fileName: string;
      fileType: string;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return fileService.getPresignedUrl({ token, fileName, fileType });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        onSuccess({ presignedUrl: response.data.presignedUrl });
      } else {
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setResponseMessage('업로드에 실패했습니다. 잠시 후에 다시 실행해주세요.');
    },
  });

  return {
    getPresignedUrl,
    isPending,
  };
};

const useUploadFile = ({
  setResponseMessage,
}: {
  setResponseMessage(input: string): void;
}) => {
  const { fileService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const { mutate: uploadFile, isPending } = useMutation({
    mutationFn: ({
      presignedUrl,
      file,
    }: {
      presignedUrl: string;
      file: File | undefined;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      if (file === undefined) {
        throw new Error('파일이 존재하지 않습니다.');
      }
      return fileService.uploadImage({ presignedUrl, file });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        setResponseMessage('');
      } else {
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setResponseMessage('업로드에 실패했습니다. 잠시 후에 다시 실행해주세요.');
    },
  });

  return {
    uploadFile,
    isPending,
  };
};

const useCreateCompany = ({
  setResponseMessage,
}: {
  setResponseMessage(input: string): void;
}) => {
  const { postService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);
  const { toMain } = useRouteNavigation();

  const { mutate: createCompany, isPending } = useMutation({
    mutationFn: ({ company }: { company: CreateCompanyRequest }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return postService.createCompany({ token, companyContents: company });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        toMain();
      } else {
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setResponseMessage(
        '회사 생성에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  return {
    createCompany,
    isPending,
  };
};
