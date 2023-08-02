package com.pause.lfu.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

	private int id;
	private String kakaoId;
	private String naverId;
	private String nickname;
	private String color;
	private String shape;
	private Timestamp createdAt;
	private boolean withdraw;
	private boolean dDayLogin;

}
