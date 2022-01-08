package co.com.sofka.questions.usecase.question;

import co.com.sofka.questions.mapper.MapperAnswer;
import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.services.SendEmailService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
@Validated
public class AddAnswerUseCase implements SaveAnswer, SendEmailService {
    private final AnswerRepository answerRepository;
    private final MapperAnswer mapperUtils;
    private final GetUseCase getUseCase;
    private final JavaMailSender javaMailSender;

    public AddAnswerUseCase(AnswerRepository answerRepository, MapperAnswer mapperUtils, GetUseCase getUseCase,JavaMailSender javaMailSender) {
        this.answerRepository = answerRepository;
        this.mapperUtils = mapperUtils;
        this.getUseCase = getUseCase;
        this.javaMailSender = javaMailSender;
    }

    @Override
    public Mono<String> sendEmail(String to, String subject, String body) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("zuluroa@gmail.com");
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(body);
        javaMailSender.send(simpleMailMessage);
        return Mono.just("Email sent");
    }

    public Mono<QuestionDTO> apply(AnswerDTO answerDTO) {
        Objects.requireNonNull(answerDTO.getQuestionId(), "Id of the answer is required");
        return getUseCase.apply(answerDTO.getQuestionId()).flatMap(question ->
                answerRepository.save(mapperUtils.answerDtoToAnswer().apply(answerDTO))
                        .map(answer -> {
                            question.getAnswers().add(answerDTO);
                            var res = sendEmail(answerDTO.getUserEmail(), "Tienes una nueva respuesta a tu pregunta",
                                    "Vuelve a Questions Sofka-u para revisar tu nueva respuesta! "
                                            + question.getQuestion());
                            return question;
                        })
        );
    }


}
