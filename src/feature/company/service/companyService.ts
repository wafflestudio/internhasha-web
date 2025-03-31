import type { Apis } from '@/api';
import type { LocalServerDTO } from '@/api';
import type { Domain } from '@/entities/company';
import type { Link } from '@/entities/link';
import type { Paginator } from '@/entities/paginator';
import type { BriefPost, JobMinorCategory } from '@/entities/post';
import type { ServiceResponse } from '@/entities/response';

export type CompanyService = {
  getMyPosts({
    page,
    roles,
    status,
    token,
  }: {
    page?: number;
    roles?: JobMinorCategory[];
    status?: 0 | 1 | 2;
    token: string;
  }): ServiceResponse<{
    posts: BriefPost[];
    paginator: Paginator;
  }>;
  getMyCompanys({ token }: { token: string }): ServiceResponse<BriefPost[]>;
  getMyInfo({
    token,
  }: {
    token: string;
  }): ServiceResponse<LocalServerDTO.CompanyResponse>;
  createCompany({
    token,
    companyEstablishedYear,
    domain,
    headcount,
    location,
    slogan,
    detail,
    profileImageKey,
    companyInfoPDFKey,
    landingPageLink,
    links,
    tags,
  }: {
    token: string;
    companyEstablishedYear: number;
    domain: Domain;
    headcount: number;
    location: string;
    slogan: string;
    detail: string;
    profileImageKey: string;
    companyInfoPDFKey?: string;
    landingPageLink?: string;
    links?: Link[];
    tags?: {
      tag: string;
    }[];
  }): ServiceResponse<LocalServerDTO.CompanyResponse>;
};

export const implCompanyService = ({
  apis,
}: {
  apis: Apis;
}): CompanyService => ({
  getMyPosts: async ({ page, roles, status: employing, token }) => {
    const params = {
      page,
      roles,
      employing,
    };
    const { status, data } = await apis['GET /post/position/me']({
      params,
      token,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
  getMyCompanys: async ({ token }) => {
    const { status, data } = await apis['GET /post/company/me']({ token });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
  getMyInfo: async ({ token }) => {
    const { status, data } = await apis['GET /company/me']({ token });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
  createCompany: async ({
    token,
    companyEstablishedYear,
    domain,
    headcount,
    location,
    slogan,
    detail,
    profileImageKey,
    companyInfoPDFKey,
    landingPageLink,
    links,
    tags,
  }) => {
    const { status, data } = await apis['PUT /company/me']({
      token,
      body: {
        companyEstablishedYear,
        domain,
        headcount,
        location,
        slogan,
        detail,
        profileImageKey,
        companyInfoPDFKey,
        landingPageLink,
        links,
        tags,
      },
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
});
