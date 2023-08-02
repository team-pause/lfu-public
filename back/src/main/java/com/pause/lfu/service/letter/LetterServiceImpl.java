package com.pause.lfu.service.letter;

import java.util.List;

import com.pause.lfu.domain.Letter;
import com.pause.lfu.mapper.LetterMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LetterServiceImpl implements LetterService {

	@Autowired
	LetterMapper letterMapper;


	@Override
	public int addLetter(Letter letter) {
		return letterMapper.insertLetter(letter);
	}

	@Override
	public List<Letter> findLettersByUserId(int userId) {
		return letterMapper.selectLettersByUserId(userId);
	}

	@Override
	public Letter findLetterByLetterId(int letterId) {
		return letterMapper.selectLetterByLetterId(letterId);
	}

}
