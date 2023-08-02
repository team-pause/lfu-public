package com.pause.lfu.mapper;

import java.util.List;

import com.pause.lfu.domain.Letter;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LetterMapper {

	/// insert
	int insertLetter(Letter letter);

	/// select
	List<Letter> selectLettersByUserId(int userId);
	Letter selectLetterByLetterId(int letterId);

}
