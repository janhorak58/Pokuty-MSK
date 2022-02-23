import React, { useEffect, useState } from "react";
import Loader from "components/Loader";
import Message from "components/Message";
import { useDispatch, useSelector } from "react-redux";

import { loginUser, logoutUser } from "actions/userActions";

function LoginScreen() {
    const dispatch = useDispatch();

  const [l_email, setL_email] = useState("");
  const [l_password, setL_password] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { ul_error, userInfo, ul_loading } = userLogin;

  useEffect(() => {}, []);

  function loginUserHandler(e) {
    e.preventDefault();
    dispatch(loginUser(l_email, l_password));
  }

  function logoutUserHandler(e) {
    e.preventDefault();
    dispatch(logoutUser());
  }

  return (
    <div className="login-container">
      {userInfo ? (
        <div>
          <h2>Ahoj {userInfo.email}</h2>
          <button onClick={logoutUserHandler}>Odhlásit se</button>
        </div>
      ) : (
        <div>
          {ul_loading ? (
            <Loader />
          ) : ul_error ? (
            <Message message={ul_error} />
          ) : (
            <form onSubmit={loginUserHandler}>
              <div className="form-group">
                <label htmlFor="l_email">Email</label>
                <input type="email" id="l_email"  onChange={(e) =>setL_email(e.target.value)} value={l_email}/>
              </div>
              <div className="form-group">
                <label htmlFor="l_name">Heslo</label>
                <input type="password" id="l_password"  onChange={(e) =>setL_password(e.target.value)} value={l_password}/>
              </div>{" "}
              <button type="submit">Přihlásit se</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default LoginScreen