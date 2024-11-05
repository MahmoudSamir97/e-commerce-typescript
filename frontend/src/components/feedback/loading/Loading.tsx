import { TLoading } from "@types";
import {
  CategorySkeleton,
  CartSkeleton,
  ProductSkeleton,
  LottieHandler,
} from "@components/index";

const skeletonTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
};

type TLoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
  type: keyof typeof skeletonTypes;
};

const Loading = ({
  status,
  error,
  children,
  type = "category",
}: TLoadingProps) => {
  const Component = skeletonTypes[type];

  if (status === "pending") {
    return <Component />;
  }

  if (error) {
    return <LottieHandler type="error" message={error} />;
  }

  return <>{children}</>;
};

export default Loading;
