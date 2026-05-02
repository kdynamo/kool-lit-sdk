import { CssClass, CssVarObject } from '../../props/css.props'
import { dec2hex, isValueEmpty } from '../utility-value/utility-value'

export const SDK_PREFIX = 'k-';

/**
 * get hex value for color
 * @param value  can be either a number or percentage
 * @param percent === true, value is considered a percent. === false, value is decimal
 * @returns hex value
 * 
 * @example
 *   getColorHex(255); // returns 255;
 *   getColorHex(50, true); // returns 7f
 */
export const getColorHex = (value: number, percent: boolean = false): string => {
  let final = value
  if (percent) {
    final = Math.floor((value * 255) / 100)
  }
  return dec2hex(final)
}

/**
 * Allows classes to be added, as strings, arrays, or objects where the keys are the 
 * CSS classes and the values are either boolean or functions. This
 * function is typically used with the prop className
 * 
 * @param cssList array or classes in strings or objects with classes for keys and
 * booleans for whether the key is in the class
 * @return all of the classes
 *
 * @example
 * // classNames assigned to 'p-card p-card-card p-card-selected'.
 * const classNames = getCssClass([
 *  'p-card',
 * ['p-card-card'],
 * {
 *  'p-card-selected': true,
 *  'p-card-disabled': false
 * });
 */
export const getCssClass = (...args: CssClass[]): string => {
  let allCssClass: string = '';
  if (args) {
    const classes: string[] = args.flat().map((className: CssClass) => {
      const type = typeof className
      let calcClass = ''
      if (isValueEmpty(!className)) {
        /* empty */
      } else if (type === 'string' || type === 'number') {
        calcClass = className.toString();
      } else if (type === 'object') {
        const _classes = Array.isArray(className)
          ? className
          : Object.entries(className).map(([key, value]) => (value ? key : ''));
        const cssCondition = _classes.length ? 
           _classes.filter((c) => !!c) : 
           [];
        calcClass = cssCondition.join(' ');
      }
      return calcClass;
    })

    allCssClass = classes.join(' ').trim()
  }

  return allCssClass
}

/**
 * If window does not exist, typically when rendering on the server,
 * the function will false . Otherwise, it will return the selector if 
 * peovided or document.body if not.
 * 
 * @param selector DOM selector, defaults to document.body 
 * @returns false if window is not defined, ort he selector
 */
const getSafeSelector = (selector?: HTMLElement) => {
  if (typeof window === 'undefined') {
    return false
  }

  return !selector ? document.body : selector
}

/**
 * Retrieve CSS variable based on the selector
 * 
 * @param cssVar css variable to read
 * @param selector value based on the selector
 * @returns the value of the array
 */
export const getCssVar = (cssVar: string, selector?: HTMLElement, pseudoEl?: string): string => {
  let returnValue = ''
  const safeSelector = getSafeSelector(selector)

  if (!safeSelector) {
    return ''
  }

  const styles: CSSStyleDeclaration = pseudoEl
    ? window.getComputedStyle(safeSelector, pseudoEl)
    : window.getComputedStyle(safeSelector)

  const cssVarValid = getValidCssVar(cssVar)

  if (styles) {
    returnValue = styles.getPropertyValue(cssVarValid)
    if (returnValue) {
      returnValue = returnValue.trim()
    }
  }

  return returnValue
}

/**
 * Recursively finds the value assigned to the CSS variable.
 * 
 * @param cssVar CSS variable to get the value
 * @param selector The selector to check for the value
 * @param pseudoEl The optional pseudo element to get the value
 * @returns The recursive value if a value is found. Otherwise, 
 * return the original CSS variable
 */
export const getResolvedCssVar = (
  cssVar: string,
  selector?: HTMLElement,
  pseudoEl?: string
): string => {
  let color = cssVar
  const match: Record<string, boolean> = {}
  match[color] = false
  // Prevent recursive variables
  while (!match[color]) {
    if (!color.match(/^(--\S+)$/)) {
      const [, assignedVar] = color.match(/^var\((.*?)\)/) ?? [null, null]

      if (assignedVar) {
        if (match[assignedVar]) {
          console.warn(
            `WARN: Variable: ${cssVar} is recursively set. Returning original CSS Variable`
          )
          color = cssVar
          break
        }
        color = assignedVar
      } else {
        break
      }
    }
    match[color] = true
    color = getCssVar(color, selector, pseudoEl)
  }
  return color
}
/**
 * Updates the list of cssVars
 * @param cssVars Can either pass in an array of values or an object
 * with the CSS variables as keys.
 * @param selector value based on the selector
 * @returns an object with all of the colors specified in an
 * object with the CSS variables as keys
 */
export const getCssVars = (
  cssVars: CssVarObject | string[],
  selector?: HTMLElement,
  pseudoEl?: string
): CssVarObject => {
  const safeSelector = getSafeSelector(selector)

  if (!safeSelector) {
    return {}
  }

  const returnValue: CssVarObject = {}
  const listVars = getCssArray2object(cssVars)
  Object.keys(listVars).forEach((cssVar) => {
    const cssVarValid = getValidCssVar(cssVar)
    returnValue[cssVarValid] = getCssVar(cssVarValid, safeSelector, pseudoEl)
  })
  return returnValue
}

/**
 * Sets the CSS variable
 * @param cssVar css variable to read
 * @param value value to assign
 * @param selector the selector to assign it to
 */
export const setCssVar = (cssVar: string, value: string, selector?: HTMLElement): void => {
  const safeSelector = getSafeSelector(selector)

  if (!safeSelector) {
    return
  }

  const cssVarValid = getValidCssVar(cssVar)

  if (safeSelector.style.setProperty) {
    safeSelector.style.setProperty(cssVarValid, value)
  }
}

/**
 * Take in a object and assigns the keys as CSS variables to the value assigned
 * @param cssVars object with CSS variables as keys.
 * Example: { '--bg': '#ffffff', '--fg': '#000000' }
 * @param selector the selector to assign it to
 */
export const setCssVars = (cssVars: CssVarObject, selector?: HTMLElement): void => {
  const safeSelector = getSafeSelector(selector)

  if (!safeSelector) {
    return
  }

  Object.keys(cssVars).forEach((cssVar) => setCssVar(cssVar, cssVars[cssVar], safeSelector))
}

/**
 *
 * @param cssVar Returns the cssVariable name prefixed with -- if it is not passed in
 * @returns valid css variable name
 */
export const getValidCssVar = (cssVar: string): string => {
  let cssVarValid: string = cssVar
  if (!cssVar.startsWith('--')) {
    cssVarValid = `--${cssVar}`
  }
  return cssVarValid
}

/**
 * Converts a list of css variables in an object with the color list used as an object attribute
 *
 * @example UtilityTheme.array2object( [ 'color01', '--danger' ])
 * returns { '--color01': '', '--danger': ''}
 *
 * @param list list of css variables
 * @param defaultValue value to assign it to
 * @returns object with cssBVars as attributes
 */
export const getCssArray2object = (
  list: string[] | CssVarObject,
  defaultValue = ''
): CssVarObject => {
  if (!Array.isArray(list)) {
    return list
  }
  const returnValue: CssVarObject = {}
  list.forEach((item) => {
    returnValue[item] = defaultValue
  })
  return returnValue
}

/**
 * Will combine the segments with "-"
 * @param classSegments string sections to separate by "-"
 * @returns combined class
 * 
 * @example
 * getCssPrefixClass('title', 'header'); // returns k-title-header
 */
export const getCssJoinClass = (...classSegments: string[]): string => {
  const flattened = classSegments.flat(Infinity);
  const filtered = flattened.filter((classSegment: string) => (
    !isValueEmpty(classSegment)
  ));
  return (filtered.join('-'));
}

/**
 * Will add the SDK_PREFIX and combine the segments with "-"
 * @param classSegments string sections to separate by "-"
 * @returns combined class
 * 
 * @example
 * getCssPrefixClass('title', 'header'); // returns k-title-header
 */
export const getCssPrefixClass = (...classSegments: string[]): string => {
  return `${SDK_PREFIX}${getCssJoinClass.call(this, ...classSegments)}`;
}

