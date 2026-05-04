import { css, html, LitElement, nothing } from 'lit'
import { property } from 'lit/decorators.js';
import type { Constructor } from '../../../type/mixin';
import type { CssClass } from '../../../type/css';
import { cssClassConverter } from '../../../converter/css-class/css-class.converter';
import { uniqueId } from '../../../directive/unique-id/unique-id.directive';
import { classNames } from '../../../directive/class-name/class-name.directive';
import { getCssClass } from '../../../utility';

export const BaseComponentMixin =
  <T extends Constructor<LitElement>>(superClass: T) => {
    class BaseComponent extends superClass {
      static styles = [
        // Base styles
        css`
      :host { display: block; box-sizing: border-box; }
      :host([loading]) { opacity: 0.5; pointer-events: none; }
    `
      ];
      /**
       * element id
       */
      @property({ type: String}) accessor id: string = '';

      /**
       * id prefix
       */
      @property({ type: String })
      accessor idPre: string = 'cmp-';

      /**
       * id postfix
       */
      @property({ type: String })
      accessor idPost: string = '';

      /**
       * Specifies CSS classes to be added to the component. It can be a string, an array of strings, or an object where the keys are class names and the values are booleans indicating whether the class should be applied.
       */
      @property({
        type: Array, converter: cssClassConverter
      })
      accessor classes: CssClass[] = [''];

      /**
       * === true, show the loading state of the component, typically with reduced opacity and disabled interactions
       * 
       * === false, show the normal state of the component
       * 
       * The loading state is useful for indicating that the component is performing an action or waiting for data, providing visual feedback to users.
       */
      @property({ type: Boolean, reflect: true })
      accessor loading = false;

      /**
       * === true, the component is visible and rendered in the DOM
       */
      @property({ type: Boolean, reflect: true })
      accessor visible = true;

      constructor(...args: any[]) {
        super(args);
        if (this.id === '') {
          this.id = uniqueId(this.idPre, this.idPost) as string;
        }
      }
      renderBase() {
        const elClasses = getCssClass(this.classes, BaseComponent.styles);
        return html`<div id=${this.id} class="${elClasses}" style="${this.style}">
          ${this.visible ? html`<slot></slot>` : nothing}
    </div>`;
      }
    }
    return BaseComponent as Constructor<BaseComponent> & T as T;
  }
