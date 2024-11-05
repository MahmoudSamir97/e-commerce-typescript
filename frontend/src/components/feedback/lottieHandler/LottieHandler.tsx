import Lottie from "lottie-react";
import notFound from "@assets/lottieFiles/notFound.json";
import empty from "@assets/lottieFiles/empty.json";
import error from "@assets/lottieFiles/error.json";
import loading from "@assets/lottieFiles/loading.json";
import styles from "./styles.module.css";
const { msg, errorMsg } = styles;

const lottieMap = {
  notFound,
  empty,
  error,
  loading,
};

type LottieHandlerProps = {
  type: keyof typeof lottieMap;
  message?: string;
};

const LottieHandler = ({ type, message }: LottieHandlerProps) => {
  const lottie = lottieMap[type];

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <Lottie animationData={lottie} style={{ width: "400px" }} />
      {message && (
        <h3 className={`${msg} ${type === "error" && errorMsg}`}>{message}</h3>
      )}
    </div>
  );
};

export default LottieHandler;
