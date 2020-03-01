import initialState from './initialState';
import { reducer as searchByTagsReducer } from './searchByTags';
import { reducer as viewPageReducer } from './viewPage';
import { reducer as addPageReducer } from './addPage';
import { reducer as editPageReducer } from './editPage';

const reducers = [
  searchByTagsReducer,
  viewPageReducer,
  addPageReducer,
  editPageReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
