import axios from "axios";
import { useState } from "react";

type TStatus = "idle" | "pending" | "available" | "notAvailable" | "failed";

const useCheckEmailAvailability = () => {
  const [isEmailAvailable, setIsEmailAvailable] = useState<TStatus>("idle");
  const [enteredEmail, setEnteredEmail] = useState<string | null>(null);

  const checkEmailAvailability = async (email: string) => {
    setIsEmailAvailable("pending");
    setEnteredEmail(email);
    try {
      const response = await axios.get(`/user/getuser/${email}`);

      if (!response.data.user) {
        setIsEmailAvailable("available");
      } else {
        setIsEmailAvailable("notAvailable");
      }
    } catch (error) {
      setIsEmailAvailable("failed");
    }
  };

  const resetCheckEmailAvailability = () => {
    setIsEmailAvailable("idle");
    setEnteredEmail(null);
  };
  return {
    checkEmailAvailability,
    enteredEmail,
    isEmailAvailable,
    resetCheckEmailAvailability,
  };
};

export default useCheckEmailAvailability;
