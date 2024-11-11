import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@components/index";
import { signupSchema, signupTypes } from "@validations/signupSchema";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import Input from "@components/forms/input/Input";
import { actAuthRegister } from "@store/features/auth/authSlice";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    trigger,
    getFieldState,
    formState: { errors },
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

  return (
    <>
      <Heading title="User Registeration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="First name"
              name="firstName"
              register={register}
              error={errors.firstName?.message}
            />
            <Input
              label="Last name"
              name="lastName"
              register={register}
              error={errors.lastName?.message}
            />
            <Input
              label="Email address"
              name="email"
              register={register}
              error={
                errors.email?.message
                  ? errors.email?.message
                  : isEmailAvailable === "notAvailable"
                  ? "This email is already in use!"
                  : isEmailAvailable === "failed"
                  ? "Error from the server."
                  : ""
              }
              onBlur={onBlurHandler}
              formText={
                isEmailAvailable === "pending"
                  ? "We're currently checking the availability of this email address. Please wait a moment."
                  : ""
              }
              success={
                isEmailAvailable === "available"
                  ? "This email is available for use."
                  : ""
              }
            />
            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password?.message}
            />
            <Input
              label="Confirm password"
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword?.message}
            />
            <Button
              variant="info"
              type="submit"
              className="text-white"
              disabled={
                isEmailAvailable === "pending" || loading === "pending"
                  ? true
                  : false
              }
            >
              {loading === "pending" ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Submit"
              )}
            </Button>
            {error && (
              <p style={{ color: "#dc3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
