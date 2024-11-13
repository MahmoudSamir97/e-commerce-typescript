import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, signupTypes } from "@validations/signupSchema";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister, resetState } from "@store/features/auth/authSlice";

const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    trigger,
    getFieldState,
    formState: { errors: formErrors },
  } = useForm<signupTypes>({
    mode: "onBlur",
    resolver: zodResolver(signupSchema),
  });

  const {
    checkEmailAvailability,
    isEmailAvailable,
    enteredEmail,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();

  const submitForm: SubmitHandler<signupTypes> = (data) => {
    const { firstName, lastName, email, password } = data;

    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login?message=activate_account");
      });
  };

  const onBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      // check
      checkEmailAvailability(value);
    }

    if (isDirty && enteredEmail && !value.length) {
      resetCheckEmailAvailability();
    }
  };
  // Reset auth error and loading state
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    register,
    handleSubmit,
    formErrors,
    isEmailAvailable,
    submitForm,
    onBlurHandler,
  };
};

export default useRegister;
