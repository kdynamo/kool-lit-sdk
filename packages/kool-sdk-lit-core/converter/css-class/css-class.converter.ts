import type { CssClass } from "../../type/css";
import { getCssClass } from "../../utility/utility-css/utility-css";

/**
 * Converter for CSS classes, allowing for flexible input formats such as strings, 
 * arrays, and objects.
 * 
 * This converter is designed to be used with Lit's property decorator, enabling
 * developers to easily assign CSS classes to their components in a variety of formats. 
 * The fromAttribute function takes a string input, parses it as JSON, and then processes it through the getCssClass utility function to return a properly formatted string of CSS classes. The toAttribute function simply converts the CssClass input back into a JSON string for storage in an attribute.
 * 
 * Example usage:
 * 
 * @property({ type: String, converter: cssClassConverter })
 * myClass: CssClass = '';
 * 
 * In this example, the myClass property can accept a string, an array of strings, or an object where the keys are class names and the values are booleans indicating whether the class should be included. The converter will handle the conversion to and from a string attribute seamlessly.
 * 
 * @see getCssClass for more details on how CSS classes are processed.
 * @see CssClass for the types of inputs that can be accepted.
 * @see Lit's property decorator for how to use this converter in a component.
 * 
 * @param value The string value from the attribute, expected to be a JSON string representing the CSS classes.
 * @returns A string of CSS classes that can be applied to an element.
 */
export const cssClassConverter = {
    fromAttribute(value: string): CssClass {
        const parsed: CssClass =  JSON.parse(value);
        return getCssClass(parsed);
    },
    toAttribute(value: CssClass): string {
        return (JSON.stringify(value));
    }

}