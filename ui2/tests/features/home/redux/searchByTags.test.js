import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_SEARCH_BY_TAGS_BEGIN,
  HOME_SEARCH_BY_TAGS_SUCCESS,
  HOME_SEARCH_BY_TAGS_FAILURE,
  HOME_SEARCH_BY_TAGS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  searchByTags,
  dismissSearchByTagsError,
  reducer,
} from '../../../../src/features/home/redux/searchByTags';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/searchByTags', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when searchByTags succeeds', () => {
    const store = mockStore({});

    return store.dispatch(searchByTags())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEARCH_BY_TAGS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEARCH_BY_TAGS_SUCCESS);
      });
  });

  it('dispatches failure action when searchByTags fails', () => {
    const store = mockStore({});

    return store.dispatch(searchByTags({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEARCH_BY_TAGS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEARCH_BY_TAGS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSearchByTagsError', () => {
    const expectedAction = {
      type: HOME_SEARCH_BY_TAGS_DISMISS_ERROR,
    };
    expect(dismissSearchByTagsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_SEARCH_BY_TAGS_BEGIN correctly', () => {
    const prevState = { searchByTagsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_BY_TAGS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchByTagsPending).toBe(true);
  });

  it('handles action type HOME_SEARCH_BY_TAGS_SUCCESS correctly', () => {
    const prevState = { searchByTagsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_BY_TAGS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchByTagsPending).toBe(false);
  });

  it('handles action type HOME_SEARCH_BY_TAGS_FAILURE correctly', () => {
    const prevState = { searchByTagsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_BY_TAGS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchByTagsPending).toBe(false);
    expect(state.searchByTagsError).toEqual(expect.anything());
  });

  it('handles action type HOME_SEARCH_BY_TAGS_DISMISS_ERROR correctly', () => {
    const prevState = { searchByTagsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_BY_TAGS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchByTagsError).toBe(null);
  });
});

