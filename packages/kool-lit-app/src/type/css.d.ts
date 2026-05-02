export type CssClassBase = string | number;

export type CssConditionFunction = () => boolean;
export type CssConditionalResult = boolean | CssConditionFunction;
export type CssCondition = Record<string, CssConditionalResult>;
export type CssConditionOrString = CssClassBase | CssClassBase[] | CssCondition | string | undefined | null;
export type CssClass = CssConditionOrString | CssConditionOrString[];
export type StringOptional = string | null | undefined;
/**
 * Interface for the CSS variables with the CSS variable as the key
 * and the value stored as the value
 */
export type CssVarObject = Record<string, string>;