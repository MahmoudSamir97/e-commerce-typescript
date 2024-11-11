import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { isString } from "@types";

const Activation = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState<boolean | string>(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        try {
          const response = await axios.post(`/auth/activation`, {
            activation_token,
          });
          console.log(response, "response");
        } catch (error) {
          console.log(error, " error");
          if (isString(error)) {
            setError(error);
          }
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
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created suceessfully!</p>
      )}
    </div>
  );
};

export default Activation;
