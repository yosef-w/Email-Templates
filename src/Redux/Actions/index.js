// actions.js
export const SAVE_EMAIL_TEMPLATE = 'SAVE_EMAIL_TEMPLATE';

export const saveEmailTemplate = (data) => {
  return {
    type: SAVE_EMAIL_TEMPLATE,
    payload: data,
  };
};



export const SET_USER_NAME = 'SET_USER_NAME';

export const setUserName = (name) => {
    return {
        type: SET_USER_NAME,
        payload: name
    };
};