package com.pause.lfu.service.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.pause.lfu.config.security.jwt.JwtProvider;
import com.pause.lfu.domain.RefreshToken;
import com.pause.lfu.domain.TokenDto;
import com.pause.lfu.domain.User;
import com.pause.lfu.mapper.RefreshTokenMapper;
import com.pause.lfu.mapper.UserMapper;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class SecurityService {

	private final UserMapper userMapper;
	private final RefreshTokenMapper refreshTokenMapper;
	private final JwtProvider jwtProvider;

	@Transactional
	public TokenDto login(String id) {
		User user = userMapper.selectUserByKakaoId(id);

		log.info("[login] 계정을 찾았습니다. " + user);

		TokenDto tokenDto = jwtProvider.generateTokenDto(id);

		RefreshToken refreshToken = RefreshToken.builder()
				.key((long) user.getId())
				.token(tokenDto.getRefreshToken())
				.build();
		refreshTokenMapper.insertRefreshTokenObject(refreshToken);
		return tokenDto;
	}

	public HttpHeaders setTokenHeaders(TokenDto tokenDto) {
		HttpHeaders headers = new HttpHeaders();
		ResponseCookie cookie = ResponseCookie.from("RefreshToken", tokenDto.getRefreshToken())
				.path("/")
				.maxAge(60*60*24*7) // 쿠키 유효기간 7일로 설정
				.secure(true)
				.sameSite("None")
				.httpOnly(true)
				.build();
		headers.add("Set-cookie", cookie.toString());
		headers.add("Authorization", tokenDto.getAccessToken());

		return headers;
	}
}