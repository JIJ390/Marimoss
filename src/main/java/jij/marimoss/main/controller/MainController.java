package jij.marimoss.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MainController {

	
	// 메인 화면 이동 메서드
	@GetMapping("/")
	public String MaingPage () {
		
		return "main/main";
		
	}
}
