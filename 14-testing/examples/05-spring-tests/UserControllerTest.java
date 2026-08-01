// 05 — Spring Boot testing (Java)

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.example.user.User;
import com.example.user.UserController;
import com.example.user.UserService;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void getUserReturns200() throws Exception {
        User user = new User(1L, "Alice");
        when(userService.findById(1L)).thenReturn(Optional.of(user));

        mockMvc.perform(get("/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Alice"));

        verify(userService).findById(1L);
    }

    @Test
    void getUserReturns404WhenNotFound() throws Exception {
        when(userService.findById(999L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/users/999"))
            .andExpect(status().isNotFound());
    }

    @Test
    void createUserReturns201() throws Exception {
        User user = new User(1L, "Alice");
        when(userService.save(any(User.class))).thenReturn(user);

        mockMvc.perform(post("/users")
                .contentType("application/json")
                .content("{\"name\":\"Alice\"}"))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").value(1));
    }
}

// Full integration test:
// @SpringBootTest
// @AutoConfigureMockMvc
// class UserApplicationIT {
//     @Autowired MockMvc mockMvc;
// }

// Repository test:
// @DataJpaTest
// class UserRepositoryTest {
//     @Container static PostgreSQLContainer<?> postgres;
// }