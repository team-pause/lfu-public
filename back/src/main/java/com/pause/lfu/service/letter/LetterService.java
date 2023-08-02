package com.pause.lfu.service.letter;

import java.util.List;

import com.pause.lfu.domain.Letter;

public interface LetterService {

	int addLetter(Letter letter);

	List<Letter> findLettersByUserId(int userId);

	Letter findLetterByLetterId(int letterId);
	}
