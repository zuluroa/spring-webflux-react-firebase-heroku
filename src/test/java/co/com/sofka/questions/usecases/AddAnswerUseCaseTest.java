package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.usecase.question.AddAnswerUseCase;
import co.com.sofka.questions.usecase.question.GetUseCase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

@SpringBootTest
class AddAnswerUseCaseTest {

    @MockBean
    private GetUseCase getUseCase;

    @MockBean
    private AnswerRepository repository;

    @SpyBean
    private AddAnswerUseCase addAnswerUseCase;

    @Test
    void addAnswerTest() {

        var questionDTO = new QuestionDTO("001", "¿Test OK?", "OPEN", "TECHNOLOGY", "zuluroa@gmail", "photoUrl.com");
        var answerDTO = new AnswerDTO("xxx", "1234", "001", "test ok","prueba@gmnail.com","photoUrl.com");

        var answer = new Answer();
        answer.setId("xxx");
        answer.setQuestionId("001");
        answer.setUserId("1234");
        answer.setAnswer("test ok");
        answer.setPhotoUrl("photoUrl.com");

        Mockito.when(repository.save(Mockito.any(Answer.class))).thenReturn(Mono.just(answer));
        Mockito.when(getUseCase.apply(Mockito.anyString())).thenReturn(Mono.just(questionDTO));

        var resultDTO = addAnswerUseCase.apply(answerDTO);
        var resultQuestionDTO = resultDTO.block();

        assert resultQuestionDTO != null;
        Assertions.assertEquals(resultQuestionDTO.getId(), questionDTO.getId());
        Assertions.assertEquals(resultQuestionDTO.getQuestion(), questionDTO.getQuestion());
        Assertions.assertEquals(resultQuestionDTO.getAnswers().get(0).getQuestionId(), answerDTO.getQuestionId());

    }
}