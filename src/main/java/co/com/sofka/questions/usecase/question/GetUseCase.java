package co.com.sofka.questions.usecase.question;

import co.com.sofka.questions.mapper.MapperAnswer;
import co.com.sofka.questions.mapper.MapperQuestion;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

import java.util.Objects;
import java.util.function.Function;

@Service
@Validated
public class GetUseCase implements Function<String, Mono<QuestionDTO>> {
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final MapperQuestion mapperQuestion;
    private final MapperAnswer mapperAnswer;

    public GetUseCase(QuestionRepository questionRepository, AnswerRepository answerRepository, MapperQuestion mapperQuestion, MapperAnswer mapperAnswer) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.mapperQuestion = mapperQuestion;
        this.mapperAnswer = mapperAnswer;
    }

    @Override
    public Mono<QuestionDTO> apply(String id) {
        Objects.requireNonNull(id, "Id is required");
        return questionRepository.findById(id)
                .map(mapperQuestion.questionToQuestion())
                .flatMap(mapQuestionAggregate());
    }

    private Function<QuestionDTO, Mono<QuestionDTO>> mapQuestionAggregate() {
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
