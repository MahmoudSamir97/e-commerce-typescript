import { Suspense } from "react";
import LottieHandler from "../lottieHandler/LottieHandler";

type PageSuspenseFallbackProps = {
  children: React.ReactNode;
};

const PageSuspenseFallback = ({ children }: PageSuspenseFallbackProps) => {
  return (
    <Suspense
      fallback={
        <LottieHandler type="loading" message="Loading please wait..." />
      }
    >
      {children}
    </Suspense>
  );
};

export default PageSuspenseFallback;
