package co.com.sofka.questions.usecase;

import co.com.sofka.questions.mapper.MapperAnswer;
import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

@Service
@Validated
public class VerifyAnswerVoteUseCase {

    private final AnswerRepository answerRepository;
    private final MapperAnswer mapperAnswer;

    public VerifyAnswerVoteUseCase(AnswerRepository answerRepository, MapperAnswer mapperAnswer) {
        this.answerRepository = answerRepository;
        this.mapperAnswer = mapperAnswer;
    }

    public Mono<AnswerDTO> verifyAnswerVote(AnswerDTO answerDTO){
        return answerRepository.findByUserAndId(answerDTO.getId(), answerDTO.getUserId())
                .switchIfEmpty(Mono.error(new IllegalAccessException("Usuario no autorizado")))
                .flatMap(response -> {
                    if (answerDTO.getVote() == 0){
                        responseAnswer(answerDTO);
                    }
                    return Mono.error(new IllegalStateException("El usuario ya votó"));
                });
    }

    private Mono<AnswerDTO> responseAnswer(AnswerDTO answerDTO){
        var response = mapperAnswer.answerDtoToAnswer().apply(answerDTO);
        return answerRepository.save(response).map(mapperAnswer.answerToAnswerDto());
    }

}
