package com.pause.lfu.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Letter {

	private int id;
	private String sendUserName;
	private int receiveUserId;
	private String color;
	private String shape;
	private String content;
	private boolean isRead; // todo 이거 7월 이후로 디비 바꾸는 걸로 가능한지 알아보기 https://masonb.tistory.com/45
	private Timestamp createdAt;

}
