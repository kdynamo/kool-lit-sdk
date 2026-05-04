import { LitElement, html, css } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { BaseComponentMixin } from '../../../mixin/base/base-component/base-component.mixin';

/** Load the view only when the component is visible */
export const defaultLazyObserverInit: IntersectionObserverInit = {
    // Load slightly before it hits the viewport
    rootMargin: '50px',
};
export class LazyContent extends BaseComponentMixin(LitElement) {
  /**
   * === true, content is visible
   * 
   * === false, show loading slot
   */
  @state() private _isVisible = false;

  /**
   * access to the container
   */
  @query('#container') private _container!: HTMLElement;

  /**
   * initialization options for the intersection observer. Combines
   * with defaultLazyObserverInit
   * 
   */
  @property() initOptions: IntersectionObserverInit = {};

  /** stores the obersver */
  private _observer?: IntersectionObserver;

  static styles = css`
    :host { display: block; min-height: 100px; }
  `;

  firstUpdated() {
    const observerInit = { ...defaultLazyObserverInit, ...this.initOptions };
    // 1. Set up the Intersection Observer
    this._observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this._isVisible = true;
        console.log('isVisible', this._isVisible);
        this._observer?.disconnect(); // Stop observing after first load
      }
    }, observerInit); 

    this._observer.observe(this._container);
  }

  render() {
    return html`
      <div id="container">
        ${this._isVisible 
          ? html`<slot></slot>` 
          : html`<slot name="load">Loading...</slot>`}
      </div>
    `;
  }
}
customElements.define('load-view', LazyContent);