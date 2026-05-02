/**
 * A converter for handling array properties in LitElement. This converter allows you to define a 
 * property as an array and have it automatically converted to and from a string attribute when used in HTML.
 * 
 * The fromAttribute function takes a comma-separated string and converts it into an array of strings, while the toAttribute function takes an array of strings and converts it back into a comma-separated string. This is useful for properties that need to be represented as arrays in JavaScript but as strings in HTML attributes.
 * 
 * Example usage:
 * 
 * @property({ type: Array, converter: arrayConverter })
 * myArray: string[] = [];
 * 
 * In this example, the myArray property will be automatically converted to and from a comma-separated string when used in HTML attributes.
 */
export const arrayConverter = {
      fromAttribute: (value: string | null): string[] => {
        // Convert the string attribute to an array property
        if (value) {
          return value.split(',').map(item => item.trim());
        }
        return [];
      },
      toAttribute: (value: string[]): string => {
        // Convert the array property to a string attribute (optional, for reflection)
        return value.join(',');
      }
    };