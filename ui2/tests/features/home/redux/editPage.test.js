import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_EDIT_PAGE_BEGIN,
  HOME_EDIT_PAGE_SUCCESS,
  HOME_EDIT_PAGE_FAILURE,
  HOME_EDIT_PAGE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  editPage,
  dismissEditPageError,
  reducer,
} from '../../../../src/features/home/redux/editPage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/editPage', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when editPage succeeds', () => {
    const store = mockStore({});

    return store.dispatch(editPage())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_EDIT_PAGE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_EDIT_PAGE_SUCCESS);
      });
  });

  it('dispatches failure action when editPage fails', () => {
    const store = mockStore({});

    return store.dispatch(editPage({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_EDIT_PAGE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_EDIT_PAGE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissEditPageError', () => {
    const expectedAction = {
      type: HOME_EDIT_PAGE_DISMISS_ERROR,
    };
    expect(dismissEditPageError()).toEqual(expectedAction);
  });

  it('handles action type HOME_EDIT_PAGE_BEGIN correctly', () => {
    const prevState = { editPagePending: false };
    const state = reducer(
      prevState,
      { type: HOME_EDIT_PAGE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editPagePending).toBe(true);
  });

  it('handles action type HOME_EDIT_PAGE_SUCCESS correctly', () => {
    const prevState = { editPagePending: true };
    const state = reducer(
      prevState,
      { type: HOME_EDIT_PAGE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editPagePending).toBe(false);
  });

  it('handles action type HOME_EDIT_PAGE_FAILURE correctly', () => {
    const prevState = { editPagePending: true };
    const state = reducer(
      prevState,
      { type: HOME_EDIT_PAGE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editPagePending).toBe(false);
    expect(state.editPageError).toEqual(expect.anything());
  });

  it('handles action type HOME_EDIT_PAGE_DISMISS_ERROR correctly', () => {
    const prevState = { editPageError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_EDIT_PAGE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editPageError).toBe(null);
  });
});

