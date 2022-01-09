package co.com.sofka.questions.usecase.question;

import co.com.sofka.questions.mapper.MapperUser;
import co.com.sofka.questions.model.UserDto;
import co.com.sofka.questions.reposioties.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

@Service
@Validated
public class FindUserByIdUseCase {
    private final UserRepository userRepository;
    private final MapperUser mapperUser;

    public FindUserByIdUseCase(UserRepository userRepository, MapperUser mapperUser) {
        this.userRepository = userRepository;
        this.mapperUser = mapperUser;
    }

    public Mono<UserDto> findUserById(String id){
        return userRepository.findById(id)
                .map(user -> mapperUser.userToUserDto().apply(user));
    }
}
