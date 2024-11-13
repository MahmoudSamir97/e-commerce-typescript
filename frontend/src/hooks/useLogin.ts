import { useEffect } from "react";
import { loginSchema, loginTypes } from "@validations/loginSchema";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetState } from "@store/features/auth/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

const useLogin = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginTypes>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  const submitForm: SubmitHandler<loginTypes> = (data) => {
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => navigate("/"));
  };

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);
  return {
    searchParams,
    errors,
    error,
    loading,
    register,
    handleSubmit,
    submitForm,
  };
};

export default useLogin;
