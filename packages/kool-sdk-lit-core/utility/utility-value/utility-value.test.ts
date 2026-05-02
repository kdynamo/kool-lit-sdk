import { dec2hex, hex2dec, isValueEmpty } from "./utility-value";

describe('utility-value', () => {
    it('isValueEmpty check for empty values', () => {
        expect(isValueEmpty('')).toBe(true);
        expect(isValueEmpty([])).toBe(true);
        expect(isValueEmpty(undefined)).toBe(true);
        expect(isValueEmpty(null)).toBe(true);
        expect(isValueEmpty({})).toBe(true);
    });

    it('isValueEmpty check for not empty values', () => {
        expect(isValueEmpty('d')).toBe(false);
        expect(isValueEmpty(['f'])).toBe(false);
        expect(isValueEmpty(1)).toBe(false);
        expect(isValueEmpty(false)).toBe(false);
        expect(isValueEmpty({ value: 1})).toBe(false);
    });

    it('dec2hex 0 - 255', () => {
        expect(dec2hex(0)).toBe('00');
        expect(dec2hex(126)).toBe('7e');
        expect(dec2hex(255)).toBe('ff');
    });

    it('dec2hex padding 4', () => {
        expect(dec2hex(0, 4)).toBe('0000');
        expect(dec2hex(126, 4)).toBe('007e');
        expect(dec2hex(255, 4)).toBe('00ff');
        expect(dec2hex(10000, 4)).toBe('2710');
    });

    it('hex2dec', () => {
        expect(hex2dec('ff')).toBe(255);
        expect(hex2dec('00000')).toBe(0);
        expect(hex2dec('7e')).toBe(126);
    });
    
    it('hex2dec max value', () => {
        expect(hex2dec('2710')).toBe(255);
        expect(hex2dec('2710', 30000)).toBe(10000);
    });
});