import { useMutation } from '@tanstack/react-query';
import MDEditor from '@uiw/react-md-editor';
import {
  Button,
  FormContainer,
  LabelContainer,
  SubmitButton,
  TextInput,
} from '@waffle/design-system';
import { useState } from 'react';

import { CancelCheckModal } from '@/components/modal/CancelCheckModal';
import { createErrorMessage } from '@/entities/errors';
import type { Series } from '@/entities/post';
import { seriesList } from '@/feature/company/presentation/companypresentation';
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
  } = companyPresentation.useValidator({});
  const { rawTags, thumbnail, IRDeckPreview } =
    companyPresentation.useUtilState();
  const { tagValidator, tagInputValidator } = companyPresentation.validator;
  const { tagsFilter, investCompanyFilter, externalDescriptionLinkFilter } =
    companyPresentation.filter;
  const { toMain, toCreatePost } = useRouteNavigation();

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

  const isPending =
    isUploadFilePending || isUploadImagePending || isUploadPdfPending;

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
    toCreatePost({
      companyBody: {
        companyName: companyName.value,
        email: email.value,
        slogan: slogan.value,
        series: series.value,
        imageLink: thumbnail.value.url,
        investAmount: Number(investAmount.value),
        investCompany: investCompanyFilter(investCompany.value),
        tags: tagsFilter(tags.value),
        IRDeckLink:
          IRDeckPreview.value !== null ? IRDeckPreview.value.url : undefined,
        landingPageLink: landingPageLink.value,
        externalDescriptionLink: externalDescriptionLinkFilter(
          externalDescriptionLink.value,
        ),
        // TODO: explanation form 추가
        explanation: '',
      },
    });
  };

  return (
    <>
      <FormContainer handleSubmit={handleSubmit} response={responseMessage}>
        <LabelContainer label="회사명" id="companyName">
          <TextInput
            id="companyName"
            value={companyName.value}
            placeholder="회사명을 입력해주세요."
            disabled={isPending}
            onChange={(e) => {
              companyName.onChange(e.target.value);
            }}
          />
          {isSubmit && companyName.isError && (
            <p>올바른 회사명을 입력해주세요.</p>
          )}
        </LabelContainer>
        <LabelContainer label="회사 이메일" id="companyEmail">
          <TextInput
            id="companyEmail"
            value={email.value}
            placeholder="회사 이메일을 입력해주세요."
            disabled={isPending}
            onChange={(e) => {
              email.onChange(e.target.value);
            }}
          />
          {isSubmit && email.isError && <p>올바르지 않은 이메일 형식입니다.</p>}
        </LabelContainer>
        <LabelContainer label="한 줄 소개" id="slogan">
          <TextInput
            id="slogan"
            value={slogan.value}
            placeholder="한 줄 소개를 입력해주세요."
            disabled={isPending}
            onChange={(e) => {
              slogan.onChange(e.target.value);
            }}
          />
          {isSubmit && email.isError && (
            <p>한 줄 소개는 500자 이내로 작성해주세요.</p>
          )}
        </LabelContainer>
        <LabelContainer label="회사 상세 소개">
          <div data-color-mode="light">
            <MDEditor />
          </div>
        </LabelContainer>
        <LabelContainer label="대표 사진" id="imageLink">
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
          {isSubmit && thumbnail.isError && (
            <p>1MB 이하의 이미지 파일을 올려주세요.</p>
          )}
          {imageResponseMessage !== '' && <p>{imageResponseMessage}</p>}
        </LabelContainer>
        <LabelContainer label="투자 단계" id="series">
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
          {isSubmit && series.isError && <p>투자 단계를 선택해주세요.</p>}
        </LabelContainer>
        <LabelContainer label="누적 투자액" id="investAmount">
          <TextInput
            id="investAmount"
            value={investAmount.value}
            placeholder="100"
            disabled={isPending}
            onChange={(e) => {
              investAmount.onChange(e.target.value);
            }}
          />
          <span>천만원</span>
          {isSubmit && investAmount.isError && (
            <p>0 이상의 양의 정수로 입력해주세요.</p>
          )}
        </LabelContainer>
        <LabelContainer label="투자사 정보" id="investCompany">
          {investCompany.value.map((company, index) => (
            <div key={`invest-company-${index}`}>
              <TextInput
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
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              investCompany.onChange({ input: '', mode: 'ADD' });
            }}
          >
            추가
          </Button>
          {isSubmit && investCompany.isError && (
            <p>
              투자사 정보는 1개 이상, 10개 이하로 중복되지 않게 입력해주세요.
            </p>
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
          <TextInput
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
          <p>
            엔터를 치면 태그가 생성되며 한 개당 최대 8자까지 입력할 수 있어요.
          </p>
          {!tagInputValidator({
            tag: rawTags.value.trim(),
            tags: tags.value,
          }) && (
            <p>입력한 태그와 중복되지 않는 8자 이하의 태그를 작성해주세요.</p>
          )}
          {isSubmit && tags.isError && (
            <p>하나의 태그는 8자 이하, 총 10개까지 작성 가능합니다.</p>
          )}
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
          {isSubmit && IRDeckPreview.isError && (
            <p>5MB 이하의 PDF 파일을 올려주세요.</p>
          )}
          {pdfResponseMessage !== '' && <p>{pdfResponseMessage}</p>}
        </LabelContainer>
        <LabelContainer label="기업 소개 홈페이지">
          <TextInput
            id="landingPageLink"
            value={landingPageLink.value}
            placeholder="https://"
            disabled={isPending}
            onChange={(e) => {
              landingPageLink.onChange(e.target.value);
            }}
          />
          {isSubmit && landingPageLink.isError && (
            <p>https로 시작하는 홈페이지 링크를 입력해주세요.</p>
          )}
        </LabelContainer>
        <LabelContainer label="외부 소개 링크" id="externalDescriptionLink">
          {externalDescriptionLink.value.map((input, index) => (
            <div key={`external-link-${index}`}>
              <div>
                <LabelContainer label="제목">
                  <TextInput
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
                  <TextInput
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
          <Button
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
          <p>
            더벤처스, 잡코리아, 기사 링크 등 회사를 소개할 수 있는 기타 링크를
            첨부해주세요.
          </p>
          {isSubmit && externalDescriptionLink.isError && (
            <div>
              <p>유효한 링크를 입력해주세요.</p>
              <p>외부 소개 링크는 최대 5개까지 입력 가능합니다.</p>
            </div>
          )}
        </LabelContainer>
        <div>
          <Button onClick={handleClickCancelButton} disabled={isPending}>
            이전으로
          </Button>
          <SubmitButton onClick={handleSubmit} disabled={isPending}>
            다음으로
          </SubmitButton>
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
