package com.pause.lfu.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Follow {

	private int userId;
	private int followId;
	private Timestamp createdAt;

}
