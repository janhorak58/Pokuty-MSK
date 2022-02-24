import { listFines, listPlayers } from "actions/Actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function HomeScreen() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { ul_error, userInfo, ul_loading } = userLogin;

  const playerList = useSelector((state) => state.playerList);
  const { pl_error, Players, pl_loading } = playerList;

  const fineList = useSelector((state) => state.fineList);
  const { fl_error, Fines, fl_loading } = fineList;

  useEffect(() => {
    dispatch(listPlayers());
    dispatch(listFines());
  }, [dispatch]);

  function countFines(id) {
    let suma = 0;
    let myFines;
    if (Fines) {
      if (id === 0) {
         myFines = Fines;
      } else {
         myFines = Fines.filter((f) => f.player === id);
      }
      myFines.map((mf) => (suma += mf.value));
    }

    return suma;
  }

  function countPaidFines(id) {
    let suma = 0;
    let myPlayers;
    if (Players) {
      if (id === 0) {
         myPlayers = Players
      } else {
         myPlayers = Players.filter((p) => p.id === id);
      }
      myPlayers.map((p) => (suma += p.amount_paid));
    }

    return suma;
  }

  return (
    <div className="home-container">
      <h2 className="tc-warning">Vybráno: {countPaidFines(0)} Kč</h2>

      <h1>Pokuty za celý tým: {countFines(0)} Kč</h1>
      {ul_error || pl_error || fl_error ? (
        <h2>Něco se nepovedlo</h2>
      ) : ul_loading || pl_loading || fl_loading ? (
        <h3>Načítání...</h3>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Jméno</th>
              <th>Placeno / Pokuty Celkem</th>
            </tr>
          </thead>
          <tbody>
            {Players &&
              Players.length > 0 &&
              Players.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link to={`/hrac/${p.id}`}>{p.name}</Link>
                  </td>
                  <td>{countPaidFines(p.id)} / {countFines(p.id)} Kč</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HomeScreen;
