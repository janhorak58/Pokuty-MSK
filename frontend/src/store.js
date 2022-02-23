import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "reducers/userReducers";
import {
  playerFineListReducer,
  playerListReducer,
  playerCreateReducer,
  playerUpdateReducer,
  playerDeleteReducer,
  fineListReducer,
  fineCreateReducer,
  fineUpdateReducer,
  fineDeleteReducer,
  playerDetailsReducer,
} from "reducers/Reducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,

  playerFineList: playerFineListReducer,
  playerList: playerListReducer,
  playerCreate: playerCreateReducer,
  playerUpdate: playerUpdateReducer,
  playerDelete: playerDeleteReducer,
  playerDetails:playerDetailsReducer,

  fineList: fineListReducer,
  fineCreate: fineCreateReducer,
  fineUpdate: fineUpdateReducer,
  fineDelete: fineDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  courseList: [],
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
