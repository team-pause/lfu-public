package com.pause.lfu.utils;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;

import com.pause.lfu.domain.TokenDto;
import com.pause.lfu.domain.User;

import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MapUtil {

	public HashMap<String, Object> tokenAndUser(TokenDto token, User user) {
		HashMap<String, Object> tokenAndUser = new HashMap<>();
		tokenAndUser.put("Token", token);
		tokenAndUser.put("User", user);
		return tokenAndUser;
	}
}
