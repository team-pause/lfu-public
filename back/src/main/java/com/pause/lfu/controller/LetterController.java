package com.pause.lfu.controller;

import java.util.List;

import com.pause.lfu.domain.Letter;
import com.pause.lfu.service.letter.LetterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/letter")
@CrossOrigin("http://52.79.90.119:3000")
public class LetterController {

	@Autowired
	private LetterService letterService;

	@PostMapping({"", "/"})
	public ResponseEntity<?> letterAdd(@RequestBody Letter letter) {
		int response = letterService.addLetter(letter);

		if(response == 0) {
			System.out.println("편지 작성 실패");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<?> letterListByUserId(@PathVariable int userId){
		List<Letter> response = letterService.findLettersByUserId(userId);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/{letterId}")
	public ResponseEntity<?> letterByLetterId(@PathVariable int letterId) {
		Letter response = letterService.findLetterByLetterId(letterId);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
