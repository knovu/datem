import { toEnv, toPort } from '..';
import { Env } from '../../@types';

describe('toPort', () => {
    it('should convert a valid string number to a port', () => {
        expect(toPort('8080')).toBe(8080);
    });

    it('should convert a valid string number to a port at the lower boundary', () => {
        expect(toPort('0')).toBe(0);
    });

    it('should convert a valid string number to a port at the upper boundary', () => {
        expect(toPort('65535')).toBe(65535);
    });

    it('should throw an error when the value is not a string', () => {
        expect(() => toPort(8080)).toThrow('Port value must be a string');
        expect(() => toPort(null)).toThrow('Port value must be a string');
        expect(() => toPort(undefined)).toThrow('Port value must be a string');
        expect(() => toPort([])).toThrow('Port value must be a string');
        expect(() => toPort({})).toThrow('Port value must be a string');
    });

    it('should throw an error when the string is not a valid number', () => {
        expect(() => toPort('not-a-number')).toThrow('Port value must be a valid number');
        expect(() => toPort('')).toThrow('Port value must be a valid number');
        expect(() => toPort('abc')).toThrow('Port value must be a valid number');
    });

    it('should throw an error when the port is less than the minimum value', () => {
        expect(() => toPort('-1')).toThrow('Port value must be between 0 and 65535');
    });

    it('should throw an error when the port is greater than the maximum value', () => {
        expect(() => toPort('65536')).toThrow('Port value must be between 0 and 65535');
    });
});

describe('toEnv', () => {
    it('should convert "PRODUCTION" to Env.PRODUCTION', () => {
        expect(toEnv('PRODUCTION')).toBe(Env.PRODUCTION);
    });

    it('should convert "production" to Env.PRODUCTION', () => {
        expect(toEnv('production')).toBe(Env.PRODUCTION);
    });

    it('should convert "DEVELOPMENT" to Env.DEVELOPMENT', () => {
        expect(toEnv('DEVELOPMENT')).toBe(Env.DEVELOPMENT);
    });

    it('should convert "development" to Env.DEVELOPMENT', () => {
        expect(toEnv('development')).toBe(Env.DEVELOPMENT);
    });

    it('should throw an error for unsupported values', () => {
        const unsupportedValues = [null, undefined, '', 'test', 'dev'];

        unsupportedValues.forEach((value) => {
            expect(() => toEnv(value)).toThrow(Error);
            expect(() => toEnv(value)).toThrow(
                `Unsupported environment value: ${value}. Defaulting to development.`,
            );
        });
    });

    it('should throw an error for numeric values', () => {
        expect(() => toEnv(123)).toThrow(Error);
        expect(() => toEnv(123)).toThrow(
            'Unsupported environment value: 123. Defaulting to development.',
        );
    });

    it('should throw an error for boolean values', () => {
        expect(() => toEnv(true)).toThrow(Error);
        expect(() => toEnv(true)).toThrow(
            'Unsupported environment value: true. Defaulting to development.',
        );
        expect(() => toEnv(false)).toThrow(Error);
        expect(() => toEnv(false)).toThrow(
            'Unsupported environment value: false. Defaulting to development.',
        );
    });
});
