package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.usecase.answer.DeleteAnswerUseCase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class DeleteAnswerUseCaseTest {

    @MockBean
    AnswerRepository answerRepository;

    @SpyBean
    DeleteAnswerUseCase deleteAnswerUseCase;

    @Test
    void deleteAnswerTest(){

        var answerDto = new AnswerDTO(
                "abc",
                "123",
                "007",
                "Java",
                "photoUrl.com"
        );

        Mockito.when(answerRepository.deleteById(answerDto.getId())).thenReturn(Mono.empty());

        var response = deleteAnswerUseCase.apply(answerDto.getId()).thenReturn(Mono.empty());

        Assertions.assertEquals(response.block(), Mono.empty());
    }

}