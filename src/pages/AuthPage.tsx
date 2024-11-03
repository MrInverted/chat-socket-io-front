import { Alert, Button, Input, Typography } from 'antd';
import { Link, } from "react-router-dom";
import { useAuthForm } from "./Auth.hook";

interface IProps {
  type: "login" | "register";
  title: string;
}



function AuthPage({ type, title }: IProps) {
  const {
    onSubmit,
    onLoginChange,
    onPasswordChange,
    registerLogin,
    registerPassword,
    getValues,
    isLoading,
    isError,
  } = useAuthForm({ type });

  return (
    <>
      <Typography.Title className="text-center mb-5">
        {title}
      </Typography.Title>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 max-w-96 mx-auto"
      >
        <Input
          size="large"
          placeholder="login"
          value={getValues("login")}
          onChange={onLoginChange}
          {...registerLogin}
        />

        <Input.Password
          size="large"
          placeholder="password"
          value={getValues("password")}
          onChange={onPasswordChange}
          {...registerPassword}
        />

        <Button
          size="large"
          type="primary"
          loading={isLoading}
          iconPosition={"end"}
          htmlType="submit"
        >
          Submit
        </Button>

        {isError && (
          <Alert
            message={isError}
            type="error"
            showIcon
          />
        )}
      </form>

      <div className="text-center mt-5">
        <p>
          <Typography.Text>If you don't have an account - <Link to="/register">/register</Link></Typography.Text>
        </p>
        <p>
          <Typography.Text>If you already have an account - <Link to="/login">/login</Link></Typography.Text>
        </p>
      </div>
    </>
  )
}

export default AuthPage;