package co.com.sofka.questions.usecase;

import co.com.sofka.questions.mapper.MapperQuestion;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

@Service
@Validated
public class VerifyUserUseCase {

    private final QuestionRepository questionRepository;
    private final MapperQuestion mapperQuestion;

    public VerifyUserUseCase(QuestionRepository questionRepository, MapperQuestion mapperQuestion) {
        this.questionRepository = questionRepository;
        this.mapperQuestion = mapperQuestion;
    }

    public Mono<QuestionDTO> verifyUserQuestion(QuestionDTO questionDTO){
        return questionRepository.findByIdAndUserId(questionDTO.getId(), questionDTO.getUserId())
                .switchIfEmpty(Mono.error(new IllegalAccessException("Usuario no autorizado")))
                .flatMap(response -> responseQuestion(questionDTO));
    }

    private Mono<QuestionDTO> responseQuestion(QuestionDTO questionDTO){
        var response = mapperQuestion.questionDTOToquestion(questionDTO.getId()).apply(questionDTO);
        return questionRepository.save(response).map(mapperQuestion.questionToQuestion());
    }

}
