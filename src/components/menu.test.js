import React from "react";
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { NavLink } from "react-router-dom";
import Menu from './menu'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const enzymeWrapper = shallow(<Menu />)

  return {
    enzymeWrapper
  }
}

describe('Menu', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('nav').hasClass('navbar')).toBe(true);
    expect(enzymeWrapper.find('h1').hasClass('navbar-brand')).toBe(true);
    expect(enzymeWrapper.find('ul').hasClass('navbar-nav')).toBe(true);
    });

    it('should pass correect props to NavLink child component', () => {
        const { enzymeWrapper} = setup();
        expect(enzymeWrapper.find(NavLink).first().props().to).toEqual("/");
        expect(enzymeWrapper.find(NavLink).last().props().to).toEqual("/foods");
    });
});
