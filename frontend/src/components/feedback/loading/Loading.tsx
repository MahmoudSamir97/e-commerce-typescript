import { TLoading } from "@types";

type TLoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
};

const Loading = ({ status, error, children }: TLoadingProps) => {
  if (status === "pending") {
    return <p>Getting elemnts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <>{children}</>;
};

export default Loading;
