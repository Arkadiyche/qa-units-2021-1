import React from 'react'
import {sortByDate, sortByItemCount, sortOrders} from './sortOrders';

describe('sortByItemCount function', () => {
	test.each([
		[{items: ['null', '123312']}, null],
		[null, {items: ['null', '123312']}],
		[{items: ['null', '123312']}, false],
		[true, {items: ['null', '123312']}],
		[{items: null}, {items: ['null', '123312']}],
		[{items: ['null', '123312']}, {items: null}],
		[{date: 13221331212}, {items: ['null', '123312']}],
		[{items: ['null', '123312']}, {date: 13221331212}],
	])('invalid args', (order1, order2) => {
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(0);
	})

	test.each([ 
		[{items: ['item1', 'item2']}, {items: ['1', '2']}, 0],
		[{items: ['item1', 'item2']}, {items: ['1']}, 1], 
		[{items: ['item1']}, {items: ['1', '2']}, -1], 
	])('valid args', (order1, order2, expected) => {
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(expected);
	})
});

describe('sortByDate function', () => {
	test.each([
		[null, {date: 1544356800000}],
		[{date: 1544356800000}, null],
		[true, {date: 1544356800000}],
		[{date: 1544356800000}, false],
		[{date: null}, {date: 1544356800000}],
		[{date: 1544356800000}, {date: null}],
		[{items: ['2', '3']}, {date: 1544356800000}],
		[{date: 1544356800000}, {items: ['1', '2']}],
	])('invalid args', (order1, order2) => {
		const result = sortByDate(order1, order2);
		expect(result).toBe(0);
	})

	test.each([ 
		[{date: 1544356800000}, {date: 1544356800000}, 0],
		[{date: 1544356800000}, {date: 1544356800001}, 1], 
		[{date: 1544356800001}, {date: 1544356800000}, -1], 
	])('valid args', (order1, order2, expected) => {
		const result = sortByDate(order1, order2);
		expect(result).toBe(expected);
	})
});

describe('sortOrders function', () => {
	it('call sort func', () => {
		const orders = [];
		const func = jest.fn()
		sortOrders(orders, func)
		expect(func).toHaveBeenCalledTimes(0);
	});

	it('call sort func', () => {
		const orders = [
			{items: ['1']},
			{items: ['3', '2']},
		];
		const func = null
		sortOrders(orders, func)
		expect(orders).toEqual([
			{items: ['1']},
			{items: ['3', '2']},
		]);
	});
});

