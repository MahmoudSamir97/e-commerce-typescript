import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import { Heading } from "@components/index";
import Input from "@components/forms/input/Input";
import useLogin from "@hooks/useLogin";

const Login = () => {
  const {
    searchParams,
    errors,
    loading,
    register,
    handleSubmit,
    submitForm,
    error,
  } = useLogin();

  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get("message") === "activate_account" && (
            <Alert variant="success">
              please check your email to activate your account!
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="Email address"
              name="email"
              register={register}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password?.message}
            />
            <Button variant="info" type="submit" className="text-white">
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

export default Login;
