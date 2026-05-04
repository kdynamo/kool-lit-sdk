import { css, html, LitElement, nothing } from 'lit'
import { property, queryAssignedElements } from 'lit/decorators.js';
import type { Constructor } from '../../../type/mixin';
import type { CssClass } from '../../../type/css';
import { cssClassConverter } from '../../../converter/css-class/css-class.converter';
import { BaseComponentMixin } from '../base-component/base-component.mixin';
import { BaseHeaderMixin } from '../base-header/base-header.mixin';

export const BasePanelMixin =
  <T extends Constructor<LitElement>>(superClass: T) => {

    /**
     * BasePanelComponent is a mixin that extends the BaseComponent and adds properties and methods specific to panel components. It 
     * includes properties for header, id prefix and postfix, and CSS classes, as well as a render method for the base structure of the panel.
     */
    class BasePanelComponent extends BaseHeaderMixin(superClass) {
    static styles = [
    // Include base styles
    ...BaseHeaderMixin.styles || [],
    css`
      :host { border: 1px solid #ccc; border-radius: 4px; padding: 1rem; }
      .panel-header { font-weight: bold; margin-bottom: 1rem; border-bottom: 1px solid #eee; }
    `
  ];
    @queryAssignedElements({ slot: 'header' })
    accessor headerElements: HTMLElement[] = [];
 
    @queryAssignedElements({ slot: 'footer' })
    accessor footerElements: HTMLElement[] = [];    

    /**
     * additional content, typically icons, added to the header
     */
    @property({ type: Object })
    accessor headerToolbar: HTMLElement | undefined = undefined;

    /**
     * === true, content can be collapsed
     * 
     * === false, content cannot be collapsed
     */
    @property({ type: Boolean })
    accessor collapsible: boolean = false;

    /**
     * === true, show the close icon
     * 
     * === false, hide the show icon
     */
    @property({ type: Boolean })
    accessor closeVisible: boolean = false;

    /**
     * === true, show the collapse/expand icon
     * 
     * === false, hide the collapse/expand icon
     */
    @property({ type: Boolean })
    accessor collapseVisible: boolean = false;

      constructor(...args: any[]) {
        super(args);
      }
      public renderPanel() {
        return html`<div id=${this.id} class="${this.className}" style="${this.style}">
        ${this.headerElements.length > 0 ? html`<div class="panel-header">
          <slot name="header"></slot>
          ${this.headerToolbar ? html`<div class="header-toolbar">${this.headerToolbar}</div>` : nothing}
        </div>` : nothing}
        <slot></slot>
        ${this.footerElements.length > 0 ? html`<div class="panel-footer"><slot name="footer"></slot></div>` : nothing}

    </div>`;
      }
    }
    return BasePanelComponent as Constructor<BasePanelComponent> & T as T;
  }
