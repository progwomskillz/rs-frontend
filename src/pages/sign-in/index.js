import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "components/Loader";
import serviceAuth from "services/auth";
import s from "./index.module.scss";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const isButtonDisabled = !username || !password;

  const handleChangeInput = (value, handlerKey) => {
    const handlers = {
      username: setUsername,
      password: setPassword
    };
    handlers[handlerKey](value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    setIsLoading(true);

    serviceAuth.signIn(username, password)
      .then(() => navigate("/cabinet"))
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }

  return (
    <div className={s["sign-in"]}>
      <div className={s["sign-in__form-wrapper"]}>
        <div className="card">
          <div className="card-body">
            <form className={s["sign-in__form"]} onSubmit={handleSubmit}>
              <div className={`form-group ${s["sign-in__form-row"]}`}>
                <label htmlFor="sign-in-form__username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="sign-in-form__username"
                  placeholder="Username"
                  value={username}
                  onChange={e => handleChangeInput(e.target.value, "username")}
                />
              </div>
              <div className={`form-group ${s["sign-in__form-row"]}`}>
                <label htmlFor="sign-in-form__password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="sign-in-form__password"
                  placeholder="Password"
                  value={password}
                  onChange={e => handleChangeInput(e.target.value, "password")}
                />
              </div>
              <button
                type="submit"
                className={`btn btn-primary ${isButtonDisabled ? "disabled" : ""}`}
              >
                Sign in
              </button>
              {isError && (
                <p className="text-danger">Invalid creds</p>
              )}
            </form>
          </div>
        </div>
      </div>
      <Loader isOpen={isLoading} />
    </div>
  )
}

export default SignIn;
