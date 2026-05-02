import { nothing } from "lit"

/**
 * Returns true if value is:
 * * null
 * * undefined
 * * empty string
 * * empty array
 * * empty object (contains no keys)
 *
 * @param value Evaluated value
 * @returns === true, if empty. === false, otherwise.
 */
export const isValueEmpty = (value: unknown) => {
  let empty: boolean = value !== false && (!!value === false || value === '')
  if (!empty) {
    if (Array.isArray(value)) {
      empty = value.length === 0
    } else if (typeof value === 'object') {
      empty = Object.keys(value ?? {}).length === 0
    }
  }
  return empty
}

/**
 * convert a decimal value to a hex value, padded to padStart characters
 *
 * @param decValue Evaluated decimal value
 * @param padStart The minimum number of hex digits for the returned value
 * @returns hexidecimal value
 */
export const dec2hex = (decValue = 255, padStart: number = 2): string => {
  return decValue.toString(16).padStart(padStart, '0')
}

/**
 * convert a hexidecimal value to a decimal value
 * @param hexValue Evaluated hex value
 * @param max Maximum decimal value
 * @returns converted decimal value if less than max. Otherwise, return max
 */
export const hex2dec = (hexValue: string, max: number = 255) => {
  const decimal: number = parseInt(hexValue, 16)
  return Math.min(decimal, max)
}

/**
 * Checks if an object is iterable
 * @param obj {unknown} The object to check
 * @returns === true, if the object is iterable. === false, otherwise.
 */
export const isIterable = (obj: unknown ): obj is Iterable<unknown> => {
  // Checks for null and undefined
  if (obj === null) {
    return false;
  }
  // Checks if the Symbol.iterator property is a function
  return ((typeof obj === 'object') && (Symbol.iterator in obj) && typeof obj[Symbol.iterator] === 'function');
}