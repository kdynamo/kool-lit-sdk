import { html, LitElement, nothing } from 'lit'
import { property, queryAssignedElements } from 'lit/decorators.js';
import type { Constructor } from '../../../type/mixin';
import type { CssClass } from '../../../type/css';
import { cssClassConverter } from '../../../converter/css-class/css-class.converter';
import { BaseComponentMixin } from '../base-component/base-component.mixin';
import { styleMap, type StyleInfo } from 'lit/directives/style-map.js';

export const BaseTitleMixin =
  <T extends Constructor<LitElement>>(superClass: T) => {
    /**
     * BaseTitleComponent is a mixin that extends the BaseComponent and adds properties and methods specific to title components. It
     * includes properties for title, id prefix and postfix, and CSS classes, as well as a render method for the base structure of the title.
     */
    class BaseTitleComponent extends BaseComponentMixin(superClass) {
      @queryAssignedElements({ slot: 'head' })
      accessor headElements!: HTMLElement[] = [];

      @queryAssignedElements({ slot: 'sub-head' })
      accessor subHeadElements!: HTMLElement[] = [];

      /**
       * The title text to be displayed in the title component. The value to be overidden if the title slot it used.
       */
      @property({ type: String })
      accessor head: string = '';

      /**
       * The CSS classes for the header element.
       */
      @property({ type: String, converter: cssClassConverter })
      accessor headClass: CssClass = '';

      @property({ type: Object })
      accessor headStyle: Readonly<StyleInfo> = {};

      /**
       * The subheader text to be displayed in the title component. The value to be overidden if the subheader slot it used.
       */
      @property({ type: String })
      accessor subHead: string = '';

      @property({ type: String, converter: cssClassConverter })
      accessor subHeadClass: CssClass = '';

      constructor(...args: any[]) {
        super(...args);
      }

      /**
       * Pass it either the header or subheader slot to render the title. If both slots are used, it will render both the header and subheader. If neither slot is used, it will render the head and subHead properties.
       * The content slot is available for any additional content that needs to be rendered in the title component, such as icons or buttons.
       * @returns 
       */
      renderTitle() {
        return html`<div id=${this.id} class="${this.className}" style="${this.style}">
          ${this.headElements.length > 0 ? html`<div class="header ${this.headClass}" style=${styleMap(this.headStyle)}>
            <slot name="header">${this.head}</slot>
          </div>` : nothing}
          ${this.subHeadElements.length > 0 ? html`<div class="subheader ${this.subHeadClass}">
            <slot name="sub-head">${this.subHead}</slot>
          </div>` : nothing}
          <slot></slot>
        </div>`;
      }
    }
    return BaseTitleComponent as Constructor<BaseTitleComponent> & T as T;
  }
