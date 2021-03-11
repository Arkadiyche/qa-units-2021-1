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

	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('order 1 > order 2', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});

	it('order 1 < order 2', () => {
		const order1 = {
			items: ['item1'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});
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

	it('same date count', () => {
		const order1 = {
			date: 1544356800000,
		};

		const order2 = {
			date: 1544356800000,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	it('order 1 older then order 2', () => {
		const order1 = {
			date: 1544356800001,
		};

		const order2 = {
			date: 1544356800000,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(-1);
	});

	it('order 2 older then order 1', () => {
		const order1 = {
			date: 1544356800000,
		};

		const order2 = {
			date: 1544356800001,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(1);
	});
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

