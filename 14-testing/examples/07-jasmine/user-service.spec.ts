// 07 — Jasmine / Karma (TypeScript for Angular apps)

import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let repo: jasmine.SpyObj<UserRepository>;

  beforeEach(() => {
    const repoSpy = jasmine.createSpyObj('UserRepository', ['findById', 'save']);
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: repoSpy },
      ],
    });
    service = TestBed.inject(UserService);
    repo = TestBed.inject(UserRepository) as jasmine.SpyObj<UserRepository>;
  });

  it('returns the user when found', (done) => {
    const mockUser = { id: 1, name: 'Alice' };
    repo.findById.and.returnValue(of(mockUser));

    service.findById(1).subscribe((user) => {
      expect(user).toEqual(mockUser);
      expect(repo.findById).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('throws when user is null', () => {
    repo.findById.and.returnValue(of(null));

    expect(() => service.requireById(1)).toThrow();
  });

  it('returns all users', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    repo.findAll.and.returnValue(of(users));

    service.findAll().subscribe((result) => {
      expect(result.length).toBe(2);
      expect(result).toEqual(users);
    });
  });

  describe('save', () => {
    it('returns the saved user', () => {
      const user = { id: 1, name: 'Alice' };
      repo.save.and.returnValue(of(user));

      service.save(user).subscribe((result) => {
        expect(result).toEqual(user);
      });
    });

    it('throws on null', () => {
      expect(() => service.save(null)).toThrow();
    });
  });
});

// Component test:
// describe('UserComponent', () => {
//   let component: UserComponent;
//   let fixture: ComponentFixture<UserComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [UserComponent],
//     }).compileComponents();
//     fixture = TestBed.createComponent(UserComponent);
//     component = fixture.componentInstance;
//   });

//   it('renders user name', () => {
//     component.user = { id: 1, name: 'Alice' };
//     fixture.detectChanges();
//     expect(fixture.nativeElement.textContent).toContain('Alice');
//   });
// });

// Fake service (manual):
class FakeUserService {
  findById(id: number) {
    return of({ id, name: `User ${id}` });
  }
}