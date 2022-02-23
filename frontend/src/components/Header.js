import { logoutUser } from "actions/userActions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin);
  const { ul_error, userInfo, ul_loading } = userLogin;

  function logoutHandler() {
    dispatch(logoutUser())
  }
  return (
    <div className="header-container">
      <LinkContainer to="/">
        <img src="../media/images/msk_logo.svg" alt="MSK Logo" />
      </LinkContainer>
      <h2>Pokuty MSK Dorost 2022</h2>
      {ul_error ? <p>Něco je špatně</p> : ul_loading ? <p>Načítání...</p> : userInfo && <Link to="/pridat-pokutu">Přidat Pokutu</Link>}
      {/* {ul_error ? <p>Něco je špatně</p> : ul_loading ? <p>Načítání...</p> : userInfo && <Link to="/pridat-hrace">Přidat Hráče</Link>} */}
      {ul_error ? <p>Něco je špatně</p> : ul_loading ? <p>Načítání...</p> : userInfo ? <Link onClick={logoutHandler} to="/">Odhlásit se</Link> : <Link to="/login">Přihlášení</Link>}
    </div>
  );
}

export default Header;
