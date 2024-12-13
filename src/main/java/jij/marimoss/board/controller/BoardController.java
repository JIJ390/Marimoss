package jij.marimoss.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import jij.marimoss.board.service.BoardService;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("board")
@RequiredArgsConstructor
public class BoardController {
	
	private final BoardService service;

	// 등록 화면 불러오기
	@GetMapping("insertView")
	public String BoardInsertView () {
		return "board/boardInsert";
	}
	
	
	// 게시글 등록 
	@PostMapping("insert")
	@ResponseBody
	public String BoardInsert (
			@RequestParam("paint") MultipartFile paint,
			@RequestParam("boardTitle") String boardTitle,
			@RequestParam("boardContent") String boardContent
			) {
		// 로그인 회원정보 추가해야함!!
		
		int memberNo = 1;
		
		int result = service.boardInsert(paint, boardTitle, boardContent, memberNo);
		
		
		return "1";
	}
	
	
	
	
}
