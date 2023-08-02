package com.pause.lfu.mapper;

import java.util.List;

import com.pause.lfu.domain.User;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

	/// insert
	int insertUser(User user);

	/// delete
	int deleteUser(int id);

	/// select
	User selectUserByKakaoId(String kakaoId);
	User selectUserById(int id);
	User selectUserByNickname(String nickname);
	List<User> selectAllUsers();

}
