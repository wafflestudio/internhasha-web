export type PretotypeAddUserRequest = {
  email: string;
  isSubscribed: boolean;
};

export type PretotypeAddUserResponse = {
  email: string;
  isSubscribed: boolean;
  createdAt: string;
};
