package com.pause.lfu.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;

import com.pause.lfu.domain.User;
import com.pause.lfu.service.user.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://uzuletter.site:3000")
public class KakaoController {
	private final UserService userService;

	// 카카오 로그인
	@GetMapping("/user/kakaoCallback")
	@CrossOrigin(origins = "http://52.79.90.119:3000")
	public ResponseEntity<?> kakaoLogin(@RequestParam(value="code")String code, HttpSession session, HttpServletResponse response) {
		String responses;
		String token = userService.getKakaoAccessToken(code);

		String id = userService.createKakaoUser(token);
		User user = userService.getUserByKakaoId(id);

		if(user == null) {
			HashMap<String, String> map = new HashMap<>();
			responses = "signUp";
			map.put("key", responses);
			map.put("id", id);
			return new ResponseEntity<>(map, HttpStatus.OK);
		}else{
			session.setAttribute("loginUser", user);
			String sessionId = session.getId();
			Cookie cookie = new Cookie("JSESSIONID", sessionId);
			cookie.setPath("/");
			response.addCookie(cookie);
			return new ResponseEntity<>(user, HttpStatus.OK);
		}
	}
}
