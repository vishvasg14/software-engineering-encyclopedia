import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject, signal } from '@angular/core';

// Default strategy: checked on every CD cycle
@Component({
  selector: 'app-default',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  template: `<div>{{ count() }}</div>`,
})
export class DefaultStrategyComponent {
  count = signal(0);
}

// OnPush with signals: only re-renders when signal changes
@Component({
  selector: 'app-onpush',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div>{{ count() }}</div>`,
})
export class OnPushComponent {
  count = signal(0);
}

// OnPush with mutable state: requires manual markForCheck
@Component({
  selector: 'app-manual',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div>{{ count }}</div>`,
})
export class ManualChangeDetectionComponent {
  count = 0;
  private cdr = inject(ChangeDetectorRef);

  increment() {
    this.count++;
    this.cdr.markForCheck(); // manually trigger CD
  }
}