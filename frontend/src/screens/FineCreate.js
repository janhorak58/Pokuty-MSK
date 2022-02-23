import { createFine, listPlayers } from "actions/Actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function FineCreate() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [reason, setReason] = useState("");
  const [value, setValue] = useState(0);
  const [playerId, setPlayerId] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { ul_error, userInfo, ul_loading } = userLogin;

  const playerList = useSelector((state) => state.playerList);
  const { pl_error, Players, pl_loading } = playerList;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      dispatch(listPlayers());
    }
  }, [navigate, userInfo, dispatch]);

  useEffect(() => {
    console.log(value);
    console.log(playerId);
    console.log(reason);
  }, [value, playerId, reason]);

  function createFineHandler() {
      dispatch(createFine(playerId, reason, value))
      navigate("/")
  }

  return (
    <div className="container">
      <h1>Přidat Pokutu</h1>
      <form onSubmit={createFineHandler} className="fine-edit-form">
        <div>
          <label>Komu</label>
          {pl_error ? (
            <p>Něco je špatně</p>
          ) : pl_loading ? (
            <p>Načítání...</p>
          ) : (
            <select
              defaultValue={"default"}
              onChange={(e) => setPlayerId(e.target.value)}
            >
              <option value={"default"}>Vyber Hráče</option>
              {Players && Players.length > 0 && Players.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <label>Za Co?</label>
          <textarea
            onChange={(e) => setReason(e.target.value)}
            placeholder="Důvod pokuty"
          />
        </div>

        <div>
          <label>Kolik?</label>
          <input
            onChange={(e) => setValue(e.target.value)}
            type="number"
            step={5}
            defaultValue={50}
          />
        </div>
        <button type="submit">Přidat Pokutu</button>
      </form>
    </div>
  );
}

export default FineCreate;
