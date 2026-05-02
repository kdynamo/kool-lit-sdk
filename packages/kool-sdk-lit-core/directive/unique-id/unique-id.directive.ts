import { Directive, directive, type PartInfo, PartType } from 'lit/directive.js';
/**
 * UniqueIDDirective generates a unique ID for an element. It can be used in text expressions and will generate a unique ID using the crypto.randomUUID() method.
 * The generated ID can be prefixed and postfixed with custom strings.
 */
class UniqueIDDirective extends Directive {
  private _id?: string;

  constructor(partInfo: PartInfo) {
    super(partInfo);
    // Optional: Ensure it's only used in text positions
    if (partInfo.type !== PartType.CHILD) {
      throw new Error('UniqueID directive can only be used in text expressions');
    }
  }

  /**
   * Renders a unique ID with optional prefix and postfix.
   * 
   * @param prefix {string} Optional prefix for the generated ID, default is 'cmp-'
   * @param postfix {string} Optional postfix for the generated ID, default is ''
   * @returns {string}  A unique ID string
   */
  render(prefix: string = 'cmp-', postfix: string = ''): string {
    // Generate UUID only once
    if (!this._id) {
      this._id = `${prefix}${crypto.randomUUID()}${postfix}`;
    }
    return this._id;
  }
}

/** Exports the directive function */
export const uniqueId = directive(UniqueIDDirective);