import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_ADD_PAGE_BEGIN,
  HOME_ADD_PAGE_SUCCESS,
  HOME_ADD_PAGE_FAILURE,
  HOME_ADD_PAGE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  addPage,
  dismissAddPageError,
  reducer,
} from '../../../../src/features/home/redux/addPage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/addPage', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addPage succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addPage())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_ADD_PAGE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_ADD_PAGE_SUCCESS);
      });
  });

  it('dispatches failure action when addPage fails', () => {
    const store = mockStore({});

    return store.dispatch(addPage({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_ADD_PAGE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_ADD_PAGE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAddPageError', () => {
    const expectedAction = {
      type: HOME_ADD_PAGE_DISMISS_ERROR,
    };
    expect(dismissAddPageError()).toEqual(expectedAction);
  });

  it('handles action type HOME_ADD_PAGE_BEGIN correctly', () => {
    const prevState = { addPagePending: false };
    const state = reducer(
      prevState,
      { type: HOME_ADD_PAGE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addPagePending).toBe(true);
  });

  it('handles action type HOME_ADD_PAGE_SUCCESS correctly', () => {
    const prevState = { addPagePending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_PAGE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addPagePending).toBe(false);
  });

  it('handles action type HOME_ADD_PAGE_FAILURE correctly', () => {
    const prevState = { addPagePending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_PAGE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addPagePending).toBe(false);
    expect(state.addPageError).toEqual(expect.anything());
  });

  it('handles action type HOME_ADD_PAGE_DISMISS_ERROR correctly', () => {
    const prevState = { addPageError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_ADD_PAGE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addPageError).toBe(null);
  });
});

