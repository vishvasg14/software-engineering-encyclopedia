import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let fixture: ComponentFixture<UserCardComponent>;
  let component: UserCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;

    // Set signal-based input
    fixture.componentRef.setInput('user', {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
    });

    fixture.detectChanges();
  });

  it('renders user name', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toContain('Alice');
  });

  it('emits deleted event on click', () => {
    let deletedId: number | undefined;
    component.deleted.subscribe((id) => (deletedId = id));
    component.onDelete();
    expect(deletedId).toBe(1);
  });
});