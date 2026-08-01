import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article>
      <!-- Optimized image with built-in lazy loading -->
      <img
        ngSrc="hero.jpg"
        width="800"
        height="600"
        alt="Product hero"
        priority>

      <h1>{{ product().name }}</h1>
      <p>{{ product().description }}</p>

      <!-- Deferrable view: load comment section when visible -->
      @defer (on viewport) {
        <app-comments [productId]="product().id" />
      } @placeholder {
        <div class="comment-placeholder">Loading comments...</div>
      } @loading (minimum 200ms) {
        <spinner />
      }

      <!-- Defer non-critical analytics -->
      @defer (on idle) {
        <app-analytics [productId]="product().id" />
      } @placeholder {
        <div></div>
      }
    </article>
  `,
})
export class ProductPageComponent {
  product = signal({
    id: 1,
    name: 'Widget',
    description: 'A useful widget.',
  });
}