import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_VIEW_PAGE_BEGIN,
  HOME_VIEW_PAGE_SUCCESS,
  HOME_VIEW_PAGE_FAILURE,
  HOME_VIEW_PAGE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  viewPage,
  dismissViewPageError,
  reducer,
} from '../../../../src/features/home/redux/viewPage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/viewPage', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when viewPage succeeds', () => {
    const store = mockStore({});

    return store.dispatch(viewPage())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_VIEW_PAGE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_VIEW_PAGE_SUCCESS);
      });
  });

  it('dispatches failure action when viewPage fails', () => {
    const store = mockStore({});

    return store.dispatch(viewPage({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_VIEW_PAGE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_VIEW_PAGE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissViewPageError', () => {
    const expectedAction = {
      type: HOME_VIEW_PAGE_DISMISS_ERROR,
    };
    expect(dismissViewPageError()).toEqual(expectedAction);
  });

  it('handles action type HOME_VIEW_PAGE_BEGIN correctly', () => {
    const prevState = { viewPagePending: false };
    const state = reducer(
      prevState,
      { type: HOME_VIEW_PAGE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.viewPagePending).toBe(true);
  });

  it('handles action type HOME_VIEW_PAGE_SUCCESS correctly', () => {
    const prevState = { viewPagePending: true };
    const state = reducer(
      prevState,
      { type: HOME_VIEW_PAGE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.viewPagePending).toBe(false);
  });

  it('handles action type HOME_VIEW_PAGE_FAILURE correctly', () => {
    const prevState = { viewPagePending: true };
    const state = reducer(
      prevState,
      { type: HOME_VIEW_PAGE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.viewPagePending).toBe(false);
    expect(state.viewPageError).toEqual(expect.anything());
  });

  it('handles action type HOME_VIEW_PAGE_DISMISS_ERROR correctly', () => {
    const prevState = { viewPageError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_VIEW_PAGE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.viewPageError).toBe(null);
  });
});

