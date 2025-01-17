type UserDTO = {
  id: string;
  snuMail: string;
  username: string;
  phoneNumber?: string;
  isAdmin: boolean;
  localId?: string;
  googleId?: string;
};

export type ResumeDTO = {
  id: string;
  postId: string;
  author: UserDTO;
  content: string;
  phoneNumber: string;
  createdAt: string;
};

export type ResumeResponse = ResumeDTO;

export type ResumeListResponse = [coffees: ResumeDTO[]];
