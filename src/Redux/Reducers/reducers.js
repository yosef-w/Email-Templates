// reducers.js
import { SAVE_EMAIL_TEMPLATE } from '../Actions';

const initialState = {
  emailTemplates: [],
};

const emailReducer = (state = initialState, action) => {
    switch (action.type) {
      case SAVE_EMAIL_TEMPLATE:
        console.log('Previous State:', state);
        console.log('Action:', action);
        const newState = {
          ...state,
          emailTemplates: state.emailTemplates.concat(action.payload),
        };
        console.log('New State:', newState);
        return newState;
      default:
        return state;
    }
  };
  

export default emailReducer;
