package com.pause.lfu.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CustomException extends RuntimeException {
	StatusCode statusCode;
}