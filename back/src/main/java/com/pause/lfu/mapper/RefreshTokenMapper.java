package com.pause.lfu.mapper;

import com.pause.lfu.domain.RefreshToken;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RefreshTokenMapper {

	/// insert
	void insertRefreshTokenObject(RefreshToken refreshTokenObject);

}
