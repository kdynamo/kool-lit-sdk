import { html, LitElement, nothing } from 'lit'
import { property, queryAssignedElements } from 'lit/decorators.js';
import type { Constructor } from '../../../type/mixin';
import type { CssClass } from '../../../type/css';
import { cssClassConverter } from '../../../converter/css-class/css-class.converter';
import { BaseComponentMixin } from '../base-component/base-component.mixin';
import { styleMap, type StyleInfo } from 'lit/directives/style-map.js';
import { BaseTitleMixin } from '../base-title/base-title.mixin';
import { getCssClass } from '../../../utility';

export const BaseHeaderMixin =
  <T extends Constructor<LitElement>>(superClass: T) => {
    /**
     * BaseHeaderComponent is a mixin that extends the BaseComponent and adds properties and methods specific to header components. It
     * includes properties for header, id prefix and postfix, and CSS classes, as well as a render method for the base structure of the header.
     */
    class BaseHeaderComponent extends BaseTitleMixin(superClass) {

      @queryAssignedElements({ slot: 'title' })
      accessor headElements!: HTMLElement[] = [];

      @queryAssignedElements({ slot: 'sub-head' })
      accessor subHeadElements!: HTMLElement[] = [];

      /**
       * The header text to be displayed in the header component. The value to be overidden if the header slot it used.
       */
      @property({ type: String })
      accessor header: string = '';


      /**
       * The CSS classes for the header element.
       */
      @property({ type: String, converter: cssClassConverter })
      accessor headerClass: CssClass = '';

      /**
       * The inline styles for the header element.
       */
      @property({ type: Object })
      accessor headerStyle: Readonly<StyleInfo> = {};

      /**
       * === true, header is closable, showing a close icon in the header
       * 
       * === false, header is not closable, hiding the close icon in the header
       */
      @property({ type: Boolean })
      accessor closable: boolean = false;

      /**
       * === true, content can be expanded or collapsed, showing an expand/collapse icon in the header
       * 
       * === false, content cannot be expanded or collapsed, hiding the expand/collapse icon in the header
       */
      @property({ type: Boolean })
      accessor expandable: boolean = false;
       
      /**
       * === true, content  is expanded, showing the content and the collapse icon in the header
       * 
       * === false, content is collapsed, hiding the content and showing the expand icon in the header
       */
      @property({ type: Boolean })
      accessor expand: boolean = true;


      /**
       * Triggered when the expand/collapse icon is clicked. It toggles the expand property and updates the component to reflect the change in the UI.
       * The expand property determines whether the content of the header is expanded or collapsed, and the UI will show the appropriate icon and content based on its value.
       * If expandable is false, this handler will not have any effect as the expand/collapse icon will not be rendered.
       */
      expandHandler() {
        this.expand = !this.expand;
        this.requestUpdate();
      }

      closeHandler() {
        this.dispatchEvent(new CustomEvent('close', { detail: { message: 'Header closed' } }));
        this.visible = false;
      }


      constructor(...args: any[]) {
        super(...args);
      }

      renderHeader() {
        const headerClasses = getCssClass('k-header', this.headerClass);
        const bannerClasses = getCssClass('k-header-banner', this.headerClass);
        const expandIcon = this.expandable ? html`<button class="${this.expand ? 'k-shrink' : 'k-expand'}" @click="${this.expandHandler}">${this.expand ? '-' : '+'}</button>` : nothing;
        const closeIcon = this.closable ? html`<button class="k-close" @click="${this.closeHandler}">X</button>"` : nothing;
        const expandContent: boolean = (!this.expandable || this.expand);
        console.log('header render', this.expand, (!this.expandable || this.expand), expandContent);
        return html`
        <header class="${headerClasses}" style="${this.headerStyle}">
            ${this.expandable ? html`<slot name="icon">${expandIcon}</slot>` : nothing}
            <slot name="title">${html`${this.renderTitle()}`}</slot>
            <slot name="action"><slot>
            ${this.closable ? html`<slot name="icon">${closeIcon}</slot>` : nothing}
        </header>
        ${expandContent ? html`<slot></slot>` : nothing}
    `}
        
    }
    return BaseHeaderComponent as Constructor<BaseHeaderComponent> & T as T;;
  }
