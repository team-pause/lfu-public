package com.pause.lfu.config;

import lombok.RequiredArgsConstructor;

import com.pause.lfu.config.security.jwt.CustomAccessDeniedHandler;
import com.pause.lfu.config.security.jwt.CustomAuthenticationEntryPoint;
import com.pause.lfu.config.security.jwt.JwtAuthenticationFilter;
import com.pause.lfu.config.security.jwt.JwtProvider;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtProvider jwtProvider;
	private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
	private final CustomAccessDeniedHandler customAccessDeniedHandler;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf().disable()
				.httpBasic().disable()
				.formLogin().disable()
				.headers()
				.frameOptions()
				.sameOrigin()
				.and()
				.cors() // CORS 에러 방지용

				// 세션을 사용하지 않을거라 세션 설정을 Stateless 로 설정
				.and()
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)

				// 접근 권한 설정부
				.and().authorizeHttpRequests()
				.requestMatchers(HttpMethod.OPTIONS).permitAll() // CORS Preflight 방지
				.requestMatchers("/", "/h2-console/**", "/user/**", "/letter/**").permitAll()
				.anyRequest().authenticated()

				// JWT 토큰 예외처리부
				.and()
				.exceptionHandling()
				.authenticationEntryPoint(customAuthenticationEntryPoint)
				.accessDeniedHandler(customAccessDeniedHandler)
				.and()
				.addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
}