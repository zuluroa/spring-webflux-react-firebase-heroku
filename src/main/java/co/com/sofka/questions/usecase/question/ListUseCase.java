package co.com.sofka.questions.usecase.question;

import co.com.sofka.questions.mapper.MapperQuestion;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Flux;

import java.util.function.Supplier;

@Service
@Validated
public class ListUseCase implements Supplier<Flux<QuestionDTO>> {
    private final QuestionRepository questionRepository;
    private final MapperQuestion mapperQuestion;

    public ListUseCase(MapperQuestion mapperQuestion, QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
        this.mapperQuestion = mapperQuestion;
    }

    @Override
    public Flux<QuestionDTO> get() {
        return questionRepository.findAll()
                .map(mapperQuestion.questionToQuestion());
    }

}
