package co.com.sofka.questions.usecase;

import co.com.sofka.questions.mapper.MapperAnswer;
import co.com.sofka.questions.mapper.MapperQuestion;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.function.Function;

@Service
@Validated
public class FinAllByCategory implements Function<String, Flux<QuestionDTO>> {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final MapperQuestion mapperQuestion;
    private final MapperAnswer mapperAnswer;

    public FinAllByCategory(QuestionRepository questionRepository, AnswerRepository answerRepository, MapperQuestion mapperQuestion, MapperAnswer mapperAnswer) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.mapperQuestion = mapperQuestion;
        this.mapperAnswer = mapperAnswer;
    }

    @Override
    public Flux<QuestionDTO> apply(String category) {
        return questionRepository.findByCategory(category)
                .map(mapperQuestion.questionToQuestion())
                .flatMap(responseAnswer());
    }

    private Function<QuestionDTO, Mono<QuestionDTO>> responseAnswer() {
        return questionDTO ->
                Mono.just(questionDTO).zipWith(
                        answerRepository.findAllByQuestionId(questionDTO.getId())
                                .map(mapperAnswer.answerToAnswerDto())
                                .collectList(),
                        (question, answers) -> {
                            question.setAnswers(answers);
                            return question;
                        }
                );
    }
}
