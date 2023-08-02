package com.pause.lfu.config.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.extern.slf4j.Slf4j;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import com.pause.lfu.domain.TokenDto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtProvider {

	private final Key key;
	private static final String AUTHORITIES_KEY = "auth";
	private static final String BEARER_TYPE = "bearer";
	private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30; //access 30분
	private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7; //refresh 7일

	public JwtProvider(@Value("${spring.jwt.secret}") String secretKey) {
		byte[] keyBytes= Decoders.BASE64.decode(secretKey);
		this.key = Keys.hmacShaKeyFor(keyBytes);
	}

	public TokenDto generateTokenDto(String email) {

		long now = (new Date()).getTime();

		// Access Token 생성
		Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
		String accessToken = Jwts.builder()
				.setSubject(email) //payload "sub" : "name"
				.claim(AUTHORITIES_KEY, "ROLE_USER") //payload "auth" : "ROLE_USER"
				.setExpiration(accessTokenExpiresIn) //payload "exp" : 1234567890 (10자리)
				.signWith(key, SignatureAlgorithm.HS512) //header "alg" : 해싱 알고리즘 HS512
				.compact();

		// Refresh Token 생성
		String refreshToken = Jwts.builder()
				.setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
				.signWith(key, SignatureAlgorithm.HS512)
				.compact();

		return TokenDto.builder()
				.grantType(BEARER_TYPE)
				.accessToken(accessToken)
				.accessTokenExpiresIn(accessTokenExpiresIn.getTime())
				.refreshToken(refreshToken)
				.build();
	}

	public Authentication getAuthentication(String accessToken) {

		Claims claims = parseClaims(accessToken);

		if (claims.get(AUTHORITIES_KEY) == null) {
			throw new RuntimeException("권한 정보가 없는 토큰입니다.");
		}

		Collection<? extends GrantedAuthority> authorities =
				Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
						.map(SimpleGrantedAuthority::new)
						.collect(Collectors.toList());

		UserDetails principal = new User(claims.getSubject(), "", authorities);

		return new UsernamePasswordAuthenticationToken(principal, "", authorities);
	}

	public boolean validateToken(String token) {

		try{
			Jwts.parserBuilder()
					.setSigningKey(key)
					.build()
					.parseClaimsJws(token);
			return true;
		} catch (SecurityException | MalformedJwtException | ExpiredJwtException | UnsupportedJwtException |
				 IllegalArgumentException e) {
			/* 커스텀 에러처리 */
			System.out.println(e.getMessage());
		}
		return false;
	}

	private Claims parseClaims(String accessToken) {
		try {
			return Jwts.parserBuilder()
					.setSigningKey(key)
					.build()
					.parseClaimsJws(accessToken)
					.getBody();
		} catch (ExpiredJwtException e) {
			return e.getClaims();
		}
	}
}