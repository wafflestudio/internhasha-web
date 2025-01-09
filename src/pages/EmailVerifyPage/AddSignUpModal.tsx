type AddSignUpModalProps = {
  addType: 'LOCAL' | 'GOOGLE';
};

export const AddSignUpModal = ({ addType }: AddSignUpModalProps) => {
  return <div>{addType}</div>;
};
