package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import co.com.sofka.questions.usecase.question.CreateUseCase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CreateUseCaseTest {

    @MockBean
    private QuestionRepository questionRepository;

    @SpyBean
    private CreateUseCase createUseCase;

    @Test
    void createQuestion(){

        var questionDto = new QuestionDTO(
                "1",
                "¿Qué es SpingBoot?",
                "OPEN",
                "SOFTWARE DEVELOPMENT"
        );

        var question = new Question();
        question.setId("001");
        question.setQuestion("¿En que año");


        Mockito.when(questionRepository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));

        var response = createUseCase.apply(questionDto);

        Assertions.assertEquals(response.block(), "001");

    }
}