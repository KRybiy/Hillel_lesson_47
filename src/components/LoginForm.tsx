import { useEffect, useState } from "react";
const LoginForm = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isLoginTouched, setIsLoginTouched] = useState<boolean>(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState<boolean>(false);

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value.trim());
  };

  const handleLoginBlur = () => {
    setIsLoginTouched(true);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value.trim());
  };

  const handlePasswordBlur = () => {
    setIsPasswordTouched(true);
  };

  const validateLogin = (login: string) => {
    if (login === "") {
      setLoginError("Login is required");
      return false;
    } else if (login.length < 3 || login.length > 15) {
      setLoginError("Login must be between 3 and 15 characters");
      return false;
    }

    setLoginError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (password === "") {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 6 || password.length > 15) {
      setPasswordError("Password must be between 3 and 15 characters");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid) {
      console.log(`Login: ${login}, Password: ${password}`);
    } else {
      console.log("Invalid form");
    }
  };

  useEffect(() => {
    if(isLoginTouched) {
      validateLogin(login);
    }
    if(isPasswordTouched) {
      validatePassword(password);
    }
    if (isLoginTouched && isPasswordTouched) {
      setIsFormValid(validateLogin(login) && validatePassword(password));
    }
  },[login, password, isLoginTouched, isPasswordTouched])
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="login" htmlFor="login">
            Login:
            <input
              id="login"
              type="text"
              value={login}
              onChange={handleLoginChange}
              onBlur={handleLoginBlur}
            />
          </label>
          {loginError && <p className="error">{loginError}</p>}
        </div>
        <div className="form-group">
          <label className="password" htmlFor="password">
            Password:
            <input
              id="password"
              type="text"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
            />
          </label>
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
        <button type="submit" disabled={!isFormValid}>Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
