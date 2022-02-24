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

import axios from "axios";

export const getPlayerDetails = (id) => async (dispatch) => {
    try {
      dispatch({
        type: PLAYER_DETAILS_REQUEST,
      });
  
  
      const { data } = await axios.get(
        `/api/player/${id}/`,
      );
  
      dispatch({
        type: PLAYER_DETAILS_SUCCESS,
        payload: data,
      });
    
    } catch (error) {
      dispatch({
        type: PLAYER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
export const listPlayers = () => async (dispatch) => {
    try {
      dispatch({
        type: PLAYER_LIST_REQUEST,
      });
  
  
      const { data } = await axios.get(
        `/api/player/all/`,
      );
  
      dispatch({
        type: PLAYER_LIST_SUCCESS,
        payload: data,
      });
    
    } catch (error) {
      dispatch({
        type: PLAYER_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  
export const listFines = () => async (dispatch) => {
    try {
      dispatch({
        type: FINE_LIST_REQUEST,
      });
  
  
      const { data } = await axios.get(
        `/api/fine/all/`,
      );
  
      dispatch({
        type: FINE_LIST_SUCCESS,
        payload: data,
      });
    
    } catch (error) {
      dispatch({
        type: FINE_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listPlayerFines = (id) => async (dispatch) => {
    try {
      dispatch({
        type: PLAYER_FINE_LIST_REQUEST,
      });
  
  
      const { data } = await axios.get(
        `/api/player/fines/${id}/`,
      );
  
      dispatch({
        type: PLAYER_FINE_LIST_SUCCESS,
        payload: data,
      });
    
    } catch (error) {
      dispatch({
        type: PLAYER_FINE_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const createPlayer = (name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLAYER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/player/create/",
      { name: name },
      config
    );

    dispatch({
      type: PLAYER_CREATE_SUCCESS,
      payload: true,
    });


    dispatch({
      type: PLAYER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLAYER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updatePlayer = (id, name, amount_paid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLAYER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/player/edit/",
      { id: id, name: name, amount_paid:amount_paid },
      config
    );

    dispatch({
      type: PLAYER_UPDATE_SUCCESS,
      payload: true,
    });


    dispatch({
      type: PLAYER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLAYER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const deletePlayer = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PLAYER_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        "/api/player/delete/",
        { id:id },
        config
      );
  
      dispatch({
        type: PLAYER_DELETE_SUCCESS,
        payload: true,
      });
  
  
      dispatch({
        type: PLAYER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PLAYER_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };



//   ------------------------------------------------------------------------------


export const createFine = ( playerId, reason, value) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FINE_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        "/api/fine/create/",
        { playerId:playerId, reason:reason, value:value },
        config
      );
  
      dispatch({
        type: FINE_CREATE_SUCCESS,
        payload: true,
      });
  
  
      dispatch({
        type: FINE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FINE_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const updateFine = (id, playerId, reason, value, paid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FINE_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        "/api/fine/edit/",
        { id: id, playerId:playerId, reason:reason, value:value, paid:paid },
        config
      );
  
      dispatch({
        type: FINE_UPDATE_SUCCESS,
        payload: true,
      });
  
  
      dispatch({
        type: FINE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FINE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  
  export const deleteFine = (id) => async (dispatch, getState) => {
      try {
        dispatch({
          type: FINE_DELETE_REQUEST,
        });
    
        const {
          userLogin: { userInfo },
        } = getState();
    
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
    
        const { data } = await axios.post(
          "/api/fine/delete/",
          { id:id },
          config
        );
    
        dispatch({
          type: FINE_DELETE_SUCCESS,
          payload: true,
        });
    
    
        dispatch({
          type: FINE_LIST_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: FINE_DELETE_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };