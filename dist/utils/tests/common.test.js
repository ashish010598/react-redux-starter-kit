import { throwException, isBlank } from '../common';
describe('Common Utils', () => {
  it('should throw an exception if an error message is passed on to f(throwException)', () => {
    expect(() => throwException('Error!')).toThrow();
  });
  it('should return true only if the given value is null or undefined or "" or [] or {} or NaN', () => {
    expect(isBlank(undefined)).toBe(true);
    expect(isBlank(null)).toBe(true);
    expect(isBlank('')).toBe(true);
    expect(isBlank([])).toBe(true);
    expect(isBlank({})).toBe(true);
    expect(isBlank(NaN)).toBe(true);
    expect(isBlank(0)).toBe(false);
    expect(isBlank(false)).toBe(false);
  });
});