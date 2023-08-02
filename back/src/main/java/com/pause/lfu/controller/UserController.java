package com.pause.lfu.controller;

import com.pause.lfu.domain.TokenDto;
import com.pause.lfu.domain.User;
import com.pause.lfu.service.security.SecurityService;
import com.pause.lfu.service.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://52.79.90.119:3000")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private SecurityService securityService;

	// 유저 회원가입 - 소셜로 바꾸기
	@PostMapping({"", "/"})
	public ResponseEntity<?> userAdd(@RequestBody User user) {
		int response = userService.addUser(user);

		if(response == 0){
			System.out.println("유저 회원가입 실패");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@DeleteMapping("/withdraw/{id}")
	public ResponseEntity<?> userRemove(@PathVariable("id") int id) {
		int response = userService.removeUser(id);

		if(response == 0){
			System.out.println("유저 탈퇴 실패");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		System.out.println("유저 탈퇴 성공");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/id/{id}")
	public ResponseEntity<?> userDetailById(@PathVariable("id") int id) {
		User response = userService.findUserById(id);

		if(response == null){
			System.out.println("아이디가 " + id + "인 유저 조회 실패");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/nickname/{nickname}")
	public ResponseEntity<?> userDetailByNickname(@PathVariable("nickname") String nickname) {
		User response = userService.findUserByNickname(nickname);

		if(response == null){
			System.out.println("닉네임이 " + nickname + "인 유저 조회 실패");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// 카카오 아이디로 유저 불러오기
	@GetMapping("/kakao/{id}")
	public ResponseEntity<?> userDetailByKakaoId(@PathVariable("id") String id) {
		User user = userService.findUserByKakaoId(id);

		if(user == null) {
			System.out.println("카카오 아이디가 " + id + "인 유저 조회 실패");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		}
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	// 디버깅용 user 전체 리스트
	@GetMapping({"", "/"})
	public ResponseEntity<?> userList() {
		return new ResponseEntity<>(userService.findAllUsers(), HttpStatus.OK);
	}

	@GetMapping("/login")
	public ResponseEntity login(@RequestParam String kakaoId) {
		TokenDto tokenDto = securityService.login(kakaoId);
		HttpHeaders headers = securityService.setTokenHeaders(tokenDto);
		return ResponseEntity.ok().headers(headers).body("{\"accessToken\": \"" + tokenDto.getAccessToken()+"\", \n\"refreshToken\": \""+ tokenDto.getRefreshToken()+"\"}");

	}

}
