import { useState } from "react";
import { toast } from 'react-toastify';
import Loader from "components/Loader";
import serviceUsers from "services/users";
import utilConstants from "utils/constants";
import s from "./index.module.scss";

const UsersCreate = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isShowRolesDropdown, setIsShowRolesDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const isButtonDisabled = !username || !password || !firstName || !lastName;

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);
    serviceUsers.create(
      username,
      password,
      firstName,
      lastName,
      utilConstants.availableRolesForCreation[roleIndex].value
    ).then(() => {
      setUsername("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setRoleIndex(0);
      toast.success("Created!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }).catch(
      ({ response }) => setErrors(response.data)
    ).finally(
      () => setIsLoading(false)
    );
  }

  const handleChangeInput = (value, handlerKey) => {
    const handlers = {
      username: setUsername,
      password: setPassword,
      firstName: setFirstName,
      lastName: setLastName
    };
    handlers[handlerKey](value);
  }

  return (
    <div className={s["users-create__form-wrapper"]}>
      <div className="card">
        <div className="card-body">
          <form className={s["users-create__form"]} onSubmit={handleSubmit}>
            <div className={`form-group ${s["users-create__form-row"]}`}>
              <label htmlFor="users-create-form__username">Username</label>
              <input
                type="text"
                className="form-control"
                id="users-create-form__username"
                placeholder="Username"
                value={username}
                onChange={e => handleChangeInput(e.target.value, "username")}
              />
            </div>
            <div className={`form-group ${s["users-create__form-row"]}`}>
              <label htmlFor="users-create-form__password">Password</label>
              <input
                type="text"
                className="form-control"
                id="users-create-form__password"
                placeholder="Password"
                value={password}
                onChange={e => handleChangeInput(e.target.value, "password")}
              />
            </div>
            <div className={`form-group ${s["users-create__form-row"]}`}>
              <label htmlFor="users-create-form__first-name">First name</label>
              <input
                type="text"
                className="form-control"
                id="users-create-form__first-name"
                placeholder="First name"
                value={firstName}
                onChange={e => handleChangeInput(e.target.value, "firstName")}
              />
            </div>
            <div className={`form-group ${s["users-create__form-row"]}`}>
              <label htmlFor="users-create-form__last-name">Last name</label>
              <input
                type="text"
                className="form-control"
                id="users-create-form__last-name"
                placeholder="Last name"
                value={lastName}
                onChange={e => handleChangeInput(e.target.value, "lastName")}
              />
            </div>
            <div className="dropdown" onClick={() => setIsShowRolesDropdown(isShowRolesDropdown => !isShowRolesDropdown)}>
              <button className="btn btn-secondary dropdown-toggle" type="button">
                Role: {utilConstants.availableRolesForCreation[roleIndex].title}
              </button>
              <div className={`dropdown-menu ${isShowRolesDropdown ? "show" : ""}`}>
                {
                  utilConstants.availableRolesForCreation.map((availableRoleForCreation, index) => (
                    <p
                      className="dropdown-item"
                      key={index}
                      onClick={() => setRoleIndex(index)}
                      style={{cursor: "pointer"}}
                    >
                      {availableRoleForCreation.title}
                    </p>
                  ))
                }
              </div>
            </div>
            <button
              type="submit"
              className={`btn btn-primary ${isButtonDisabled ? "disabled" : ""}`}
            >
              Create
            </button>
            {Object.keys(errors || {}).map(key => (
              <div>
                <p className="text-danger" index={key}>{key}:</p>
                <ul className="text-danger">
                  {errors[key].map(error => (
                    <li index={error.key}>{error.message}</li>
                  ))}
                </ul>
              </div>
            ))}
          </form>
        </div>
      </div>
      <Loader isOpen={isLoading} />
    </div>
  )
}

export default UsersCreate;
