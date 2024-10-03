package demo.mapper;

import demo.dto.UserDTO;
import demo.model.User;
import demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class UserMapper {
    @Autowired
    UserRepository userRepository;

    public static UserDTO toDTO(User user) {
        UserDTO dto = new UserDTO();

        dto.setGoogleUserId(user.getGoogleUserId());
        dto.setName(user.getName());
        dto.setPicture(user.getPicture());
        dto.setEmail(user.getEmail());
        dto.setCoin(user.getCoin());
        dto.setPremiumTime(user.getPremiumTime());
        dto.setCode(user.getCode());

        return dto;
    }
}
