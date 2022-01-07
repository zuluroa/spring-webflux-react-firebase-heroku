package co.com.sofka.questions.usecase.question;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.mapper.MapperQuestion;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

import java.util.Objects;


@Service
@Validated
public class UpdateUseCase implements SaveQuestion {
    private final QuestionRepository questionRepository;
    private final MapperQuestion mapperQuestion;

    public UpdateUseCase(MapperQuestion mapperQuestion, QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
        this.mapperQuestion = mapperQuestion;
    }

    @Override
    public Mono<String> apply(QuestionDTO dto) {
        Objects.requireNonNull(dto.getId(), "Id of the question is required");
        return questionRepository
                .save(mapperQuestion.questionDTOToquestion(dto.getId()).apply(dto))
                .map(Question::getId);
    }


}
