import { SET_USER_NAME } from '../Actions';

const initialState = {
    userName: ''
};

const nameReducer = (state = initialState, action) => {
    console.log('Previous state:', state);  // Log the state before the update
    console.log('Reducer Action:', action); // Log the entire action object

    switch (action.type) {
        case SET_USER_NAME:
            console.log('Setting user name to:', action.payload); // Log the payload specifically
            const newState = {
                ...state,
                userName: action.payload
            };
            console.log('New state:', newState); // Log the state after the update
            return newState;
        default:
            return state;
    }
};
export default nameReducer;
