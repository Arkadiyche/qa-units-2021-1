import React from 'react'
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';
import Order from "./Order";
import {fakeOrders} from "../data/fakeOrders";

configure({adapter: new Adapter()});

describe('Order.js', () => {
  beforeEach(() => {
    getDate.mockReturnValue("29 ноября, ср, 2000 год");
  });
  afterAll(() => {
    jest.resetModules();
  });

  it('without order', () => {
    const wrapper = shallow(<Order />);
    expect(wrapper.getElement()).toBeNull();
  });

  it('without shop and date', () => {
    let order = Object.assign({}, fakeOrders[0]);
    delete order.shop;
    delete order.date;
    const wrapper = shallow(<Order order={order}/>);
    expect(wrapper.getElement()).toBeNull();
  });

  it('without items', () => {
    let order = Object.assign({}, fakeOrders[0]);
    delete order.items;
    const wrapper = shallow(<Order order={order}/>);
    expect(wrapper).toEqual({});
  });

  it('with all params', () => {
    const order = fakeOrders[0]
    const wrapper = shallow(<Order order={order}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
