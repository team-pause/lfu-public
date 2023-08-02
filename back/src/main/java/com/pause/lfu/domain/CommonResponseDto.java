package com.pause.lfu.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

import com.pause.lfu.exception.StatusCode;

@Getter
@AllArgsConstructor
public class CommonResponseDto<T> {

	private boolean result;
	private Status status;
	private T output;


	public static <T> CommonResponseDto<T> success(StatusCode statusCode, T output) {
		return new CommonResponseDto<>(true, new Status(statusCode.getHttpStatus().toString(), statusCode.getMessage()), output);
	}

	public static <T> CommonResponseDto<T> fail(StatusCode statusCode) {
		return new CommonResponseDto<>(false, new Status(statusCode.getHttpStatus().toString(),statusCode.getMessage()), null);
	}

	@Getter
	@AllArgsConstructor
	static class Status {
		private String code;
		private String msg;
	}
}