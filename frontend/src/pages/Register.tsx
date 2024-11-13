import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { Heading } from "@components/index";
import Input from "@components/forms/input/Input";
import useRegister from "@hooks/useRegister";

const Register = () => {
  const {
    loading,
    error,
    register,
    handleSubmit,
    formErrors,
    isEmailAvailable,
    submitForm,
    onBlurHandler,
  } = useRegister();

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
              error={formErrors.firstName?.message}
            />
            <Input
              label="Last name"
              name="lastName"
              register={register}
              error={formErrors.lastName?.message}
            />
            <Input
              label="Email address"
              name="email"
              register={register}
              error={
                formErrors.email?.message
                  ? formErrors.email?.message
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
              error={formErrors.password?.message}
            />
            <Input
              label="Confirm password"
              name="confirmPassword"
              type="password"
              register={register}
              error={formErrors.confirmPassword?.message}
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
