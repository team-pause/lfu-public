package com.pause.lfu.service.user;

import java.util.List;

import com.pause.lfu.domain.User;

public interface UserService {

	int addUser(User user);

	int removeUser(int id);

	User findUserById(int id);

	User findUserByNickname(String nickname);

	List<User> findAllUsers();

	String getKakaoAccessToken(String code);

	String createKakaoUser(String token);

	User getUserByKakaoId(String id);

	User findUserByKakaoId(String id);
}
