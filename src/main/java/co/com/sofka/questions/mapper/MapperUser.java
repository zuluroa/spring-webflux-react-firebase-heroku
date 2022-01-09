package co.com.sofka.questions.mapper;

import co.com.sofka.questions.collections.User;
import co.com.sofka.questions.model.UserDto;
import com.mongodb.Function;
import org.springframework.stereotype.Component;

@Component
public class MapperUser {

    public Function<User, UserDto> userToUserDto() {
        return entity -> new UserDto(
                entity.getId(),
                entity.getDisplayName(),
                entity.getEmail()
        );
    }

    public Function<UserDto, User> mapperToUser(String id) {
        return updateUser -> {
            var user = new User(
                    id,
                    updateUser.getDisplayName(),
                    updateUser.getEmail()
            );
            return user;
        };
    }
}
