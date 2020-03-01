import {
  HOME_ADD_PAGE_BEGIN,
  HOME_ADD_PAGE_SUCCESS,
  HOME_ADD_PAGE_FAILURE,
  HOME_ADD_PAGE_DISMISS_ERROR,
} from './constants';

import Ook from "../../../lib/class.ook.js";

var ook = new Ook();
ook.setup();

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function addPage(args = {}) {
  return (dispatch,getState) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_ADD_PAGE_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.    
      var doRequest;     
  
 
      doRequest = ook.addPage(args.page_content,args);    
      doRequest.then(
        (res) => {
          dispatch({
            type: HOME_ADD_PAGE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_ADD_PAGE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissAddPageError() {
  return {
    type: HOME_ADD_PAGE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_ADD_PAGE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        addPagePending: true,
        addPageResult : null,
        addPageError: null,
      };

    case HOME_ADD_PAGE_SUCCESS:
      // The request is success
      return {
        ...state,
        addPageResult : action.data,
        addPagePending: false,
        addPageError: null,
      };

    case HOME_ADD_PAGE_FAILURE:
      // The request is failed
      return {
        ...state,
        
        addPagePending: false,
        addPageError: action.data.error,
      };

    case HOME_ADD_PAGE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        addPageError: null,
      };

    default:
      return state;
  }
}
