type Link = {
  link: string;
  description: string;
};

export type Applicant = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userRole: string;
  snuMail?: string;
  enrollYear: number;
  department: string;
  positions?: string[];
  slogan?: string;
  explanation?: string;
  stacks?: string[];
  imageKey?: string;
  cvKey?: string;
  portfolioKey?: string;
  links?: Link[];
};
