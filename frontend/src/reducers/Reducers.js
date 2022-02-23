import {
  PLAYER_FINE_LIST_REQUEST,
  PLAYER_FINE_LIST_SUCCESS,
  PLAYER_FINE_LIST_FAIL,

  PLAYER_DETAILS_REQUEST,
  PLAYER_DETAILS_SUCCESS,
  PLAYER_DETAILS_FAIL,
  
  PLAYER_LIST_REQUEST,
  PLAYER_LIST_SUCCESS,
  PLAYER_LIST_FAIL,
  PLAYER_CREATE_REQUEST,
  PLAYER_CREATE_SUCCESS,
  PLAYER_CREATE_FAIL,
  PLAYER_UPDATE_REQUEST,
  PLAYER_UPDATE_SUCCESS,
  PLAYER_UPDATE_FAIL,
  PLAYER_DELETE_REQUEST,
  PLAYER_DELETE_SUCCESS,
  PLAYER_DELETE_FAIL,
  FINE_LIST_REQUEST,
  FINE_LIST_SUCCESS,
  FINE_LIST_FAIL,
  FINE_CREATE_REQUEST,
  FINE_CREATE_SUCCESS,
  FINE_CREATE_FAIL,
  FINE_UPDATE_REQUEST,
  FINE_UPDATE_SUCCESS,
  FINE_UPDATE_FAIL,
  FINE_DELETE_REQUEST,
  FINE_DELETE_SUCCESS,
  FINE_DELETE_FAIL,
} from "../constants/Constants";

export const playerDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PLAYER_DETAILS_REQUEST:
      return { pdt_loading: true };

    case PLAYER_DETAILS_SUCCESS:
      return { pdt_loading: false, Player: action.payload };

    case PLAYER_DETAILS_FAIL:
      return { pdt_loading: false, pdt_error: action.payload };

    default:
      return state;
  }
};

export const playerFineListReducer = (state = {}, action) => {
  switch (action.type) {
    case PLAYER_FINE_LIST_REQUEST:
      return { pfl_loading: true };

    case PLAYER_FINE_LIST_SUCCESS:
      return { pfl_loading: false, PlayerFines: action.payload };

    case PLAYER_FINE_LIST_FAIL:
      return { pfl_loading: false, pfl_error: action.payload };

    default:
      return state;
  }
};

export const playerListReducer = (state = {}, action) => {
    switch (action.type) {
      case PLAYER_LIST_REQUEST:
        return { pl_loading: true };
  
      case PLAYER_LIST_SUCCESS:
        return { pl_loading: false, Players: action.payload };
  
      case PLAYER_LIST_FAIL:
        return { pl_loading: false, pl_error: action.payload };
  
      default:
        return state;
    }
  };

  export const playerCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PLAYER_CREATE_REQUEST:
        return { pc_loading: true, PlayerCreated: false };
  
      case PLAYER_CREATE_SUCCESS:
        return { pc_loading: false, PlayerCreated: true };
  
      case PLAYER_CREATE_FAIL:
        return { pc_loading: false, pc_error: action.payload, PlayerCreated: false };
  
      default:
        return state;
    }
  };

  
  export const playerUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case PLAYER_UPDATE_REQUEST:
        return { pu_loading: true, PlayerUpdated: false };
  
      case PLAYER_UPDATE_SUCCESS:
        return { pu_loading: false, PlayerUpdated: true };
  
      case PLAYER_UPDATE_FAIL:
        return { pu_loading: false, pu_error: action.payload, PlayerUpdated: false };
  
      default:
        return state;
    }
  };

  export const playerDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PLAYER_DELETE_REQUEST:
        return { pd_loading: true, PlayerDeleted: false };
  
      case PLAYER_DELETE_SUCCESS:
        return { pd_loading: false, PlayerDeleted: true };
  
      case PLAYER_DELETE_FAIL:
        return { pd_loading: false, pd_error: action.payload, PlayerDeleted: false };
  
      default:
        return state;
    }
  };



  export const fineListReducer = (state = {}, action) => {
    switch (action.type) {
      case FINE_LIST_REQUEST:
        return { fl_loading: true };
  
      case FINE_LIST_SUCCESS:
        return { fl_loading: false, Fines: action.payload };
  
      case FINE_LIST_FAIL:
        return { fl_loading: false, fl_error: action.payload };
  
      default:
        return state;
    }
  };

  export const fineCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case FINE_CREATE_REQUEST:
        return { fc_loading: true, FineCreated: false };
  
      case FINE_CREATE_SUCCESS:
        return { fc_loading: false, FineCreated: true };
  
      case FINE_CREATE_FAIL:
        return { fc_loading: false, fc_error: action.payload, FineCreated: false };
  
      default:
        return state;
    }
  };

  
  export const fineUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case FINE_UPDATE_REQUEST:
        return { fu_loading: true, FineUpdated: false };
  
      case FINE_UPDATE_SUCCESS:
        return { fu_loading: false, FineUpdated: true };
  
      case FINE_UPDATE_FAIL:
        return { fu_loading: false, fu_error: action.payload, FineUpdated: false };
  
      default:
        return state;
    }
  };

  export const fineDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case FINE_DELETE_REQUEST:
        return { fd_loading: true, FineDeleted: false };
  
      case FINE_DELETE_SUCCESS:
        return { fd_loading: false, FineDeleted: true };
  
      case FINE_DELETE_FAIL:
        return { fd_loading: false, fd_error: action.payload, FineDeleted: false };
  
      default:
        return state;
    }
  };
