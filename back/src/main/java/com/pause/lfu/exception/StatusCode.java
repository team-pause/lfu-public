package com.pause.lfu.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum StatusCode {

	/* 200 : 요청 성공 */
	SUCCESS(HttpStatus.OK, "요청에 성공하였습니다."),
	USER_CREATED(HttpStatus.CREATED, "회원가입에 성공하셨습니다."),
	LOGIN_SUCCESS(HttpStatus.OK, "로그인에 성공하셨습니다."),
	LOGOUT_SUCCESS(HttpStatus.OK, "로그아웃에 성공하셨습니다."), // todo 로그아웃 구현해야하는가?
	USABLE_EMAIL(HttpStatus.OK, "사용 가능한 이메일입니다."),
	TOKEN_REISSUED(HttpStatus.OK, "토큰이 재발급되었습니다."),







	/* 400 BAD_REQUEST : 잘못된 요청 */
	INVALID_PASSWORD(HttpStatus.BAD_REQUEST, "유효하지 않은 비밀번호입니다."),
	INVALID_EMAIL(HttpStatus.BAD_REQUEST, "유효하지 않은 이메일입니다."),

	INVALID_DATE(HttpStatus.BAD_REQUEST, "유효하지 않은 날짜입니다."),

	/* 401 UNAUTHORIZED : 인증되지 않은 사용자 */
	EMAIL_ALREADY_EXISTS(HttpStatus.UNAUTHORIZED, "이미 존재하는 이메일입니다."),
	INVALID_TOKEN_SIGNATURE(HttpStatus.UNAUTHORIZED, "유효하지 않은 JWT 서명 입니다"),
	EXPIRED_AUTH_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 JWT 토큰 입니다"),
	UNSUPPORTED_AUTH_TOKEN(HttpStatus.UNAUTHORIZED, "지원되지 않는 JWT 토큰 입니다"),
	INVALID_AUTH_TOKEN(HttpStatus.UNAUTHORIZED, "잘못된 JWT 토큰 입니다"),

	/* 403 FORBIDDEN : 컨텐츠에 접근할 권리가 없음 */


	/* 404 NOT_FOUND : Resource를 찾을 수 없음 */
	USERNAME_NOT_FOUND(HttpStatus.NOT_FOUND, "로그인된 사용자만 접근할 수 있습니다."),
	USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 정보의 사용자를 찾을 수 없습니다."),
	VALIDATION_FAILURE(HttpStatus.NOT_FOUND, "입력값이 올바르지 않습니다."),

	/* 409 : CONFLICT : Resource의 현재 상태와 충돌. 보통 중복된 데이터 존재 */
	DUPLICATE_RESOURCE(HttpStatus.CONFLICT, "데이터가 이미 존재합니다."),

	/* 500 : Internal Server Error : 웹 사이트 서버에 문제가 있음을 의미하지만 서버는 정확한 문제에 대해 더 구체적으로 설명할 수 없습니다. */
	NUMBER_FORMAT_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "잘못된 형변환 입니다."),


	;

	private final HttpStatus httpStatus;
	private final String message;
}