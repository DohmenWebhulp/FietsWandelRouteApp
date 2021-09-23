import { UPDATE_TOTAL } from "./action-types";

/// Set the initialState to null;
const initialState = {
    totalData: {},
};

function rootReducer(state = initialState, action) {
    if(action.type === UPDATE_TOTAL) {
      console.log({ reducer: action.payload })
      return Object.assign({}, state, {
        totalData: action.payload
      })
    }
    return state;
};


export default rootReducer;