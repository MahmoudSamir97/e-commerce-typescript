import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@services/axios/axios-global";
import { axiosErrorHandler } from "@utils";

const Activation = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        try {
          await axios.post(`/auth/activation`, {
            activation_token,
          });
        } catch (err) {
          setError(axiosErrorHandler(err));
        }
      };
      sendRequest();
    }
  }, [activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p> {error}</p>
      ) : (
        <p>Your account has been created suceessfully!</p>
      )}
    </div>
  );
};

export default Activation;
