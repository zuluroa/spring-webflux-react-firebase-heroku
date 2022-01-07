package co.com.sofka.questions.reposioties;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface QuestionRepository extends ReactiveCrudRepository<Question, String> {
    Flux<Question> findByUserId(String userId);
    Mono<Question> findByIdAndUserId(String userId, String id);
    Flux<Question> findByCategory (String category);
}
