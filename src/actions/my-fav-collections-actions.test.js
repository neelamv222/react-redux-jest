import * as actions from './my-fav-collections-actions';
import * as types from '../constants';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('async actions', () => {
  beforeEach(() => {
  moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('get the data using COLLECTION_LIST async action call Success Case', async (done) => {
    const mockData = {
      data: {
        "id" : "1",
        "name" : "The Lightning Thief",
        "rating" : 2
      }
    }
    const url = "books";
    moxios.stubRequest(`${url}.json`, {
      status: 200,
      response: mockData
    });
    const expectedActions = [{ type: types.COLLECTION_LIST, payload: mockData}];
    const store = mockStore({});
    await store.dispatch(actions.getCollectionData('books'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('get the data using COLLECTION_LIST async action call Fail Case', async (done) => {

    const url = "abc";
    moxios.stubRequest(`${url}.json`, {
      status: 404
    });
    const expectedActions = [{ type: types.API_ERROR}];
    const store = mockStore({});
    await store.dispatch(actions.getCollectionData(url))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
 });

describe('actions', () => {
  it('should create an action for random rating button click', () => {
    const expectedAction = {
      type: types.TOGGLE_BTN_CLICKED
    }
    expect(actions.handleToggleBtnClick()).toEqual(expectedAction);
  });

  it('should create an action for star click', () => {
    const expectedAction = {
      type: types.STAR_CLICK,
      payload: {value: 3, id: "1"}
    }
    expect(actions.starClickAction(3, "1")).toEqual(expectedAction);
  });
});