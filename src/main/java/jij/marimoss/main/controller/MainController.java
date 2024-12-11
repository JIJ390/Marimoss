package jij.marimoss.main.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

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
		
		// 최초 12 개 게시글 가져오기
		Map<String, Object> firstBoard = service.selectFirstBoard();
		
		// 각각 꺼내기
		model.addAttribute("boardList", firstBoard.get("boardList"));
		model.addAttribute("pagination", firstBoard.get("pagination"));
		
		return "main/main";
		
	}
}
