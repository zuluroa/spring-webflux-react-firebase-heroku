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
public class UpdateUserUseCase {
    private final UserRepository userRepository;
    private final MapperUser mapperUser;

    public UpdateUserUseCase(UserRepository userRepository, MapperUser mapperUser) {
        this.userRepository = userRepository;
        this.mapperUser = mapperUser;
    }

    public Mono<UserDto> apply (UserDto userDto){
        return  userRepository.save(mapperUser.mapperToUser(userDto.getId()).apply(userDto))
                .map(user -> mapperUser.userToUserDto().apply(user));
    }
}
