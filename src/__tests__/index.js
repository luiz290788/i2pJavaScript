/* @flow */
/* eslint-env jest */

import calculate from '../index';

describe('expression executor', () => {

  test('should execute sum with two numbers', () => {
    expect(calculate('5 + 5')).toBe(10);
  });

  test('should execute sum with three number', () => {
    expect(calculate('5 + 5 + 5')).toBe(15);
  });

  test('should execute sum with four number', () => {
    expect(calculate('5 + 10 + 15 + 20')).toBe(50);
  });

  test('should subtract with two numbers', () => {
    expect(calculate('10 - 5')).toBe(5);
  });

  test('should multiply', () => {
    expect(calculate('10 * 5')).toBe(50);
  });

  test('should divede', () => {
    expect(calculate('10 / 5')).toBe(2);
  });

  test('should respect precedence', () => {
    expect(calculate('2 + 10 * 5')).toBe(52);
    expect(calculate('2 * 10 + 5')).toBe(25);
  });

  test('should execute complex expressions', () => {
    expect(calculate('10 * 20 + 5 * 5 + 3')).toBe(228);
    expect(calculate('10 * 20 + 6 * 5 / 3')).toBe(210);
    expect(calculate('10 * 20 * 6 * 5 / 3')).toBe(2000);
    expect(calculate('18 + 3 * 20 / 4 + 16 / 8 * 2')).toBe(37);
    expect(calculate('18 + 3 * 20 / 4 + 16 / 8 * 2')).toBe(37);
  });

});
