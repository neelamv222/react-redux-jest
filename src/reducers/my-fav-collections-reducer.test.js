import reducer from './my-fav-collections-reducer';
import * as types from '../constants';


describe('reducers', () => {
  it('should return the initial state', () => {
    const initState = { text: types.START_RANDOM_RATING };
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should handle API_ERROR', () => {
    expect(reducer({}, { type: types.API_ERROR })).toEqual({ data: undefined, isApiFail: true });
  });

  it('should handle STAR_CLICK when text of button is "Start Random Rating"', () => {
    const state = {
      text: types.START_RANDOM_RATING,
      data: [{ id: "1", name: "The Lightning Thief", rating: 3 }]
    };
    const expectedResult = {
      text: types.START_RANDOM_RATING,
      data: [{ id: "1", name: "The Lightning Thief", rating: 5 }],
      randomData: {
        randomItem: undefined,
        randomRating: undefined
      }
    };
    expect(reducer(state, { type: types.STAR_CLICK, payload: { id: "1", value: 5 } }))
      .toEqual(expectedResult);
  });

  it('should handle STAR_CLICK when text of button is "Stop Random Rating" ', () => {
    const state = {
      text: types.STOP_RANDOM_RATING,
      data: [{ id: "1", name: "The Lightning Thief", rating: 3 }]
    };
    const expectedResult = {
      text: types.STOP_RANDOM_RATING,
      data: [{ id: "1", name: "The Lightning Thief", rating: 5 }],
      randomData: {
        randomItem: "1",
        randomRating: 5
      }
    };
    expect(reducer(state, { type: types.STAR_CLICK, payload: { id: "1", value: 5 } }))
      .toEqual(expectedResult);
  });

  it('should handle TOGGLE_BTN_CLICKED when text of button is "Start Random Rating"', () => {
    const state = {
      text: types.START_RANDOM_RATING,
      data: [{ id: "1", name: "The Lightning Thief", rating: 3 }],
      randomData: {
        randomItem: "1",
        randomRating: 5
      }
    };

  expect(Object.keys(reducer(state, { type: types.TOGGLE_BTN_CLICKED}).randomData))
      .toHaveLength(3)
  });

  it('should handle TOGGLE_BTN_CLICKED when text of button is "Stop Random Rating"', () => {
    const state = {
      text: types.STOP_RANDOM_RATING,
      data: [{ id: "1", name: "The Lightning Thief", rating: 3 }],
      randomData: {
        randomItem: "1",
        randomRating: 5
      }
    };
    const expectedResult = {
      text: types.START_RANDOM_RATING,
      data: [{ id: "1", name: "The Lightning Thief", rating: 3 }],
      randomData: {}
  };

  expect(reducer(state, { type: types.TOGGLE_BTN_CLICKED}))
      .toEqual(expectedResult);
  });
});