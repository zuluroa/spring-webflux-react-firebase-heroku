package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.mapper.MapperQuestion;
import co.com.sofka.questions.reposioties.QuestionRepository;
import co.com.sofka.questions.usecase.question.ListUseCase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;

import static org.mockito.Mockito.*;

@SpringBootTest
class ListUseCaseTest {

    @MockBean
    QuestionRepository repository;

    @SpyBean
    ListUseCase listUseCase;


    @BeforeEach
    public void setup(){
        MapperQuestion mapperQuestion = new MapperQuestion();
        repository = mock(QuestionRepository.class);
        listUseCase = new ListUseCase(mapperQuestion, repository);
    }

    @Test
    void getValidationTest(){
        var question =  new Question();
        question.setUserId("xxxx-xxxx");
        question.setType("tech");
        question.setCategory("software");
        question.setQuestion("¿Que es java?");
        when(repository.findAll()).thenReturn(Flux.just(question ));

        StepVerifier.create(listUseCase.get())
                .expectNextMatches(questionDTO -> {
                    assert questionDTO.getUserId().equals("xxxx-xxxx");
                    assert questionDTO.getCategory().equals("software");
                    assert questionDTO.getQuestion().equals("¿Que es java?");
                    assert questionDTO.getType().equals("tech");
                    return true;
                })
                .verifyComplete();

        verify(repository).findAll();
    }

}