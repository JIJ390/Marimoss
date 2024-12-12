package jij.marimoss.main.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jij.marimoss.main.dto.Board;
import jij.marimoss.main.service.MainService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MainController {
	
	private final MainService service;

	// 메인 화면 이동 메서드
	@GetMapping("/")
	public String MaingPage (
			Model model) {
		
		int cp = 1;
		
		// 최초 12 개 게시글 가져오기
		Map<String, Object> firstBoard = service.selectBoardList(cp);
		
		// 각각 꺼내기
		model.addAttribute("boardList", firstBoard.get("boardList"));
		model.addAttribute("pagination", firstBoard.get("pagination"));
		
		return "main/main";
		
	}

	// 후속 게시글 가져오기
	@PostMapping("updateBoardList")
	public String updateBoardList (
			@RequestBody int cp,
			Model model
			) {
		
		// 후속 12 개 게시글 가져오기
		Map<String, Object> plusBoard = service.selectBoardList(cp);
		
		// 각각 꺼내기
		model.addAttribute("boardList", plusBoard.get("boardList"));
		model.addAttribute("pagination", plusBoard.get("pagination"));
		
		return "main/plusBoard";
	}
	
	
	// 모달 내부 내용 채우기 위한 게시글 정보 가져오는 메서드
	@PostMapping("updateModal")
	public String updateModal (
			@RequestBody int boardNo,
			Model model
			) {
		
		Board board = service.selectBoard(boardNo);
		
		model.addAttribute("board", board);
		
		return "main/boardModal";
		
	}
}
