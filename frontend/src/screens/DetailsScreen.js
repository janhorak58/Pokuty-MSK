import {
  deleteFine,
  getPlayerDetails,
  listFines,
  listPlayerFines,
  listPlayers,
  updateFine,
  updatePlayer,
} from "actions/Actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

function DetailsScreen() {
  let urlParams = useParams();

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

  const playerUpdate = useSelector((state) => state.playerUpdate);
  const { pu_error, PlayerUpdated, pu_loading } = playerUpdate;

  const fineDelete = useSelector((state) => state.fineDelete);
  const { fd_error, FineDeleted, fd_loading } = fineDelete;

  useEffect(() => {
    dispatch(listPlayerFines(urlParams.id));
    dispatch(getPlayerDetails(urlParams.id));
  }, [urlParams.id, dispatch]);

  useEffect(() => {
    if (PlayerFines) {
      let suma = 0;
      PlayerFines.map((pf) => (suma += pf.value));
      setTotal(suma);
    }
  }, [PlayerFines]);

  useEffect(() => {
    dispatch(listPlayerFines(urlParams.id));
    dispatch(getPlayerDetails(urlParams.id));
  }, [dispatch, FineUpdated, urlParams.id, FineDeleted, PlayerUpdated]);

  function deleteHandler(id) {
    let valid = window.confirm("Opravdu chceš odstranit tuto pokutu?");
    if (valid) {
      dispatch(deleteFine(id));
    }
  }

  function changeAmountPaid(e) {
    e.preventDefault();
    console.log(totalPaid);
    dispatch(
      updatePlayer(Player.id, Player.name, totalPaid)
    );
    setTotalPaid(0)
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
          <div className="payment-state-container">
            <h2>
              Celkem Zaplaceno: {Player && Player.amount_paid} / {total} Kč
            </h2>
            {userInfo && pu_error ? (
              <p>Něco je špatně</p>
            ) : userInfo && pu_loading ? (
              <p>Načítání...</p>
            ) : (
              userInfo && (
                <form onSubmit={changeAmountPaid} className="pay-form">
                  <input
                    onChange={(e) => setTotalPaid(e.target.value)}
                    type={"number"}
                    defaultValue={0}
                  />
                  <button>Zaplatit</button>
                </form>
              )
            )}
          </div>
          <div className="fines-list-container">
            <ul>
              {fu_error || fd_error ? (
                <p> Něco je špatně</p>
              ) : fu_loading || fd_loading ? (
                <p>Načítání...</p>
              ) : (
                PlayerFines &&
                PlayerFines.length > 0 &&
                PlayerFines.map((pf) => (
                  <li key={pf.id}>
                    {userInfo ? (
                      <Link className="tc-warning" to={`/upravit/${pf.id}`}>
                        {pf.reason}
                      </Link>
                    ) : (
                      <p>{pf.reason}</p>
                    )}
                    <p>{pf.value} Kč</p>
                    <p>{pf.created_at}</p>
                    {/* {userInfo && !pf.paid ? <Link onClick={() => togglePaidHandler(pf, true)} className="pay" to={`#`}>Zaplatit</Link> : userInfo && <Link onClick={() => togglePaidHandler(pf, false)} className="cancel" to={`#`}>Zrušit platbu</Link>  } */}
                    {userInfo && !pf.paid && (
                      <Link
                        onClick={() => deleteHandler(pf.id)}
                        className="cancel"
                        to={`#`}
                      >
                        Odstranit
                      </Link>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsScreen;
