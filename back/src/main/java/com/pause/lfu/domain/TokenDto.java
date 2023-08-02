package com.pause.lfu.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class TokenDto {

	private String grantType;   // Bearer
	private String accessToken;
	private String refreshToken;
	private Long accessTokenExpiresIn;
}