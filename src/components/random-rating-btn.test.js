import React from "react";
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import RandomRatingBtn from './random-rating-btn'
import {STOP_RANDOM_RATING} from "../constants";

Enzyme.configure({ adapter: new Adapter() })

function setup() {
const props = {
    toggleBtnText: STOP_RANDOM_RATING,
    onRandomRatingBtnClick: jest.fn()
}
  const enzymeWrapper = shallow(<RandomRatingBtn />)

  return {
    props,
    enzymeWrapper
  }
}

describe('Menu', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('button').hasClass('toggle-btn')).toBe(true);
    });
});
