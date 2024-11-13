import axios from "@services/axios/axios-global";
import { useAppDispatch } from "@store/hooks";
import { setAccessToken } from "@store/features/auth/authSlice";

const useRefreshToken = () => {
  const dispatch = useAppDispatch();

  const refresh = async () => {
    const response = await axios.get("auth/refresh-token", {
      withCredentials: true,
    });

    dispatch(setAccessToken(response.data.accessToken));

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
