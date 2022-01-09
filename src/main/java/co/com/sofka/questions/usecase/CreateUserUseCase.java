package co.com.sofka.questions.usecase;

import co.com.sofka.questions.collections.User;
import co.com.sofka.questions.mapper.MapperUser;
import co.com.sofka.questions.model.UserDto;
import co.com.sofka.questions.reposioties.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

@Service
@Validated
public class CreateUserUseCase {
    private final UserRepository userRepository;
    private final MapperUser mapperUser;

    public CreateUserUseCase(UserRepository userRepository, MapperUser mapperUser) {
        this.userRepository = userRepository;
        this.mapperUser = mapperUser;
    }

    public Mono<String> apply (UserDto userDto){
        System.out.println("CreateUserUseCase-->"+ userDto.toString());
        return userRepository.findById(userDto.getId())
                .switchIfEmpty(userRepository.save(mapperUser.mapperToUser(userDto.getId()).apply(userDto)))
                .map(User::getId);
    }
}
