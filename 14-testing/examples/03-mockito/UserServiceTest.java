// 03 — Mockito (Java)

import org.junit.jupiter.api.*;
import org.mockito.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

class UserServiceTest {

    @Mock
    private UserRepository repo;

    @InjectMocks
    private UserService service;

    @Captor
    private ArgumentCaptor<String> idCaptor;

    @Test
    void findUserReturnsUser() {
        // Arrange
        when(repo.findById("1")).thenReturn(Optional.of(new User("1", "Alice")));

        // Act
        Optional<User> result = service.findById("1");

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Alice", result.get().getName());
        verify(repo).findById("1");
    }

    @Test
    void findUserReturnsEmptyWhenNotFound() {
        when(repo.findById("999")).thenReturn(Optional.empty());

        Optional<User> result = service.findById("999");

        assertFalse(result.isPresent());
        verify(repo).findById("999");
    }

    @Test
    void saveUserCallsRepositorySave() {
        User user = new User("1", "Alice");
        service.save(user);

        verify(repo).save(user);
        verifyNoMoreInteractions(repo);
    }

    @Test
    void saveUserThrowsOnNull() {
        assertThrows(IllegalArgumentException.class, () -> service.save(null));
        verifyNoInteractions(repo);
    }

    @Test
    void argumentCaptorExample() {
        service.findById("alice");
        verify(repo).findById(idCaptor.capture());
        assertEquals("alice", idCaptor.getValue());
    }

    @Test
    void verifyNeverCalled() {
        service.findById("1");
        verify(repo, never()).save(any());
    }

    @Test
    void verifyTimes() {
        service.findById("1");
        service.findById("1");
        verify(repo, times(2)).findById("1");
    }

    @Test
    void answerStub() {
        // Custom answer
        when(repo.findById(anyString())).thenAnswer(inv -> {
            String id = inv.getArgument(0);
            return Optional.of(new User(id, "User-" + id));
        });

        User u1 = service.findById("1").get();
        assertEquals("User-1", u1.getName());
    }
}

// Service under test
class UserService {
    private final UserRepository repo;
    public UserService(UserRepository repo) { this.repo = repo; }
    public Optional<User> findById(String id) { return repo.findById(id); }
    public void save(User user) {
        if (user == null) throw new IllegalArgumentException();
        repo.save(user);
    }
}

interface UserRepository {
    Optional<User> findById(String id);
    void save(User u);
}

class User {
    private final String id, name;
    User(String id, String name) { this.id = id; this.name = name; }
    String getName() { return name; }
}