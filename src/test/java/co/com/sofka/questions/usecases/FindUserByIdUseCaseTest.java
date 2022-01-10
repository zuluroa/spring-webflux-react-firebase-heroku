package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.User;
import co.com.sofka.questions.model.UserDto;
import co.com.sofka.questions.reposioties.UserRepository;
import co.com.sofka.questions.usecase.question.FindUserByIdUseCase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class FindUserByIdUseCaseTest {

    @MockBean
    private UserRepository repository;

    @SpyBean
    private FindUserByIdUseCase useCase;

    @Test
    void findUserTest(){
        var userDto = new UserDto("001", "David Zuluaga","zuluroa@gmail.com");

        var user = new User("001", "David Zuluaga","zuluroa@gmail.com");

        Mockito.when(repository.findById(user.getId())).thenReturn(Mono.just(user));

        var response = useCase.findUserById(userDto.getId());

        Assertions.assertEquals(response.block().getId(), "001");

    }
}