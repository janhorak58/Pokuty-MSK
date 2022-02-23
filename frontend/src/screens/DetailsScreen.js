import {
  deleteFine,
  getPlayerDetails,
  listFines,
  listPlayerFines,
  listPlayers,
  updateFine,
} from "actions/Actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

function DetailsScreen() {
  let urlParams = useParams();
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { ul_error, userInfo, ul_loading } = userLogin;

  const playerFineList = useSelector((state) => state.playerFineList);
  const { pfl_error, PlayerFines, pfl_loading } = playerFineList;

  const playerDetails = useSelector((state) => state.playerDetails);
  const { pdt_error, Player, pdt_loading } = playerDetails;

  const fineUpdate = useSelector((state) => state.fineUpdate);
  const { fu_error, FineUpdated, fu_loading } = fineUpdate;

  const fineDelete = useSelector((state) => state.fineDelete);
  const { fd_error, FineDeleted, fd_loading } = fineDelete;

  useEffect(() => {
    dispatch(listPlayerFines(urlParams.id));
    dispatch(getPlayerDetails(urlParams.id));
  }, [urlParams.id, dispatch]);

  useEffect(() => {
    if (PlayerFines) {
      let suma = 0;
      let sumaPaid = 0;
      PlayerFines.map((pf) => (suma += pf.value));
      PlayerFines.map((pf) => (pf.paid ? (sumaPaid += pf.value) : sumaPaid));
      setTotalPaid(sumaPaid);
      setTotal(suma);
    }
  }, [PlayerFines]);

  useEffect(() => {
    dispatch(listPlayerFines(urlParams.id));

  }, [dispatch, FineUpdated, urlParams.id, FineDeleted])
  

  function togglePaidHandler(pf, paid) {
    dispatch(updateFine(pf.id, pf.player, pf.reason, pf.value, paid))

  }

  function deleteHandler(id) {
    let valid = window.confirm("Opravdu chceš odstranit tuto pokutu?")
    if (valid) {
      dispatch(deleteFine(id))

  
  }
  }

  return (
    <div className="details-container">
      {ul_error || pfl_error || pdt_error ? (
        <h2>Něco se nepovedlo</h2>
      ) : ul_loading || pfl_loading || pdt_loading ? (
        <h3>Načítání...</h3>
      ) : (
        <div className="details-content-container">
          <Link to="/">Zpět</Link>
          <h1>{Player && Player.name}</h1>
          <h2>
            Celkem Zaplaceno: {totalPaid} / {total} Kč
          </h2>
          <div className="fines-list-container">
            <ul>
              {fu_error || fd_error? <p> Něco je špatně</p> : fu_loading || fd_loading ? <p>Načítání...</p> : PlayerFines &&
                PlayerFines.length > 0 &&
                PlayerFines.map((pf) => (
                  <li key={pf.id}>
                    {userInfo ? (
                      <Link className="tc-warning" to={`/upravit/${pf.id}`}>{pf.reason}</Link>
                    ) : (
                      <p>{pf.reason}</p>
                    )}
                    <p className={pf.paid ? "tc-success" : "tc-danger"}>
                      {pf.value} Kč
                    </p>
                    <p>{pf.created_at}</p>
                    {userInfo && !pf.paid ? <Link onClick={() => togglePaidHandler(pf, true)} className="pay" to={`#`}>Zaplatit</Link> : userInfo && <Link onClick={() => togglePaidHandler(pf, false)} className="cancel" to={`#`}>Zrušit platbu</Link>  }
                    {userInfo &&  !pf.paid && <Link onClick={() => deleteHandler(pf.id)} className="cancel" to={`#`}>Odstranit</Link>}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsScreen;
