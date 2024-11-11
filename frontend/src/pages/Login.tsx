import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Heading } from "@components/index";
import Input from "@components/forms/input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginTypes } from "@validations/loginSchema";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useAppDispatch } from "@store/hooks";
import { actAuthLogin } from "@store/features/auth/authSlice";

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
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
    console.log(data, "data");
  };
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
            {/* <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="text" name="email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" />
            </Form.Group> */}
            <Button variant="info" type="submit" className="text-white">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
