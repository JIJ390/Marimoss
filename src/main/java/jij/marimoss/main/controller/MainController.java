package jij.marimoss.main.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;

import jij.marimoss.main.dto.Board;
import jij.marimoss.main.dto.Comment;
import jij.marimoss.main.service.MainService;
import jij.marimoss.member.dto.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MainController {
	
	private final MainService service;

	// 메인 화면 이동 메서드
	@GetMapping("/")
	public String MainPage (
			@SessionAttribute(value="loginMember", required=false) Member loginMember,
			Model model) {
		
		// 로그인 안했을때 존재할 수 없는 회원 번호 입력
		int memberNo = -1;
		
		if(loginMember != null) {
			memberNo = loginMember.getMemberNo();
		}
		
		int cp = 1;
		
		// 최초 12 개 게시글 가져오기
		Map<String, Object> firstBoard = service.selectBoardList(cp, memberNo);
		
		// 각각 꺼내기
		model.addAttribute("boardList", firstBoard.get("boardList"));
		model.addAttribute("pagination", firstBoard.get("pagination"));
		
		return "main/main";
		
	}
	
	// 홈버튼 클릭 시 메인화면 구성
	@GetMapping("homeView")
	public String homeView (
			@SessionAttribute(value="loginMember", required=false) Member loginMember,
			Model model) {
		
		// 로그인 안했을때 존재할 수 없는 회원 번호 입력
		int memberNo = -1;
		
		if(loginMember != null) {
			memberNo = loginMember.getMemberNo();
		}
		
		int cp = 1;
		
		// 최초 12 개 게시글 가져오기
		Map<String, Object> firstBoard = service.selectBoardList(cp, memberNo);
		
		// 각각 꺼내기
		model.addAttribute("boardList", firstBoard.get("boardList"));
		model.addAttribute("pagination", firstBoard.get("pagination"));
		
		return "main/homeView";
		
	}
	
	

	// 후속 게시글 가져오기
	@PostMapping("updateBoardList")
	public String updateBoardList (
			@SessionAttribute(value="loginMember", required=false) Member loginMember,
			@RequestBody int cp,
			Model model
			) {
		
		// 로그인 안했을때 존재할 수 없는 회원 번호 입력
		int memberNo = -1;
		
		if(loginMember != null) {
			memberNo = loginMember.getMemberNo();
		}
		
		// 후속 12 개 게시글 가져오기
		Map<String, Object> plusBoard = service.selectBoardList(cp, memberNo);
		
		// 각각 꺼내기
		model.addAttribute("boardList", plusBoard.get("boardList"));
		model.addAttribute("pagination", plusBoard.get("pagination"));
		
		return "main/plusBoard";
	}
	
	
	// 모달 내부 내용 채우기 위한 게시글 정보 가져오는 메서드
	@PostMapping("updateModal")
	public String updateModal (
			@RequestBody int boardNo,
			@SessionAttribute(value="loginMember", required=false) Member loginMember,
			Model model
			) {

		// 로그인 안했을때 존재할 수 없는 회원 번호 입력
		int memberNo = -1;
		
		if(loginMember != null) {
			memberNo = loginMember.getMemberNo();
		}
		
		Board board = service.selectBoard(boardNo, memberNo);
		
		List<Comment> commentList = service.selectCommentList(boardNo);
		
		log.debug("commentList : {}", commentList);
		
		model.addAttribute("board", board);
		model.addAttribute("commentList", commentList);
		
		return "main/boardModal";
		
	}
	
	
	
	
	// 검색 시 메인화면 구성
	@GetMapping("searchView")
	public String searchView (
			@SessionAttribute(value="loginMember", required=false) Member loginMember,
			@RequestParam("searchKey") String searchKey,
			Model model) {
		
		// 로그인 안했을때 존재할 수 없는 회원 번호 입력
		int memberNo = -1;
		
		if(loginMember != null) {
			memberNo = loginMember.getMemberNo();
		}
		
		int cp = 1;
		
		// 최초 12 개 게시글 가져오기
		Map<String, Object> firstBoard = service.selectSearchList(cp, memberNo, searchKey);
		
		// 각각 꺼내기
		model.addAttribute("boardList", firstBoard.get("boardList"));
		model.addAttribute("pagination", firstBoard.get("pagination"));
		model.addAttribute("searchKey", searchKey);
		
		return "main/homeView";
		
	}
	
	
	// 후속 게시글 가져오기
	@PostMapping("updateSearchList")
	public String updateSearchList (
			@SessionAttribute(value="loginMember", required=false) Member loginMember,
			@RequestParam("searchKey") String searchKey,
			@RequestBody int cp,
			Model model
			) {
		
		// 로그인 안했을때 존재할 수 없는 회원 번호 입력
		int memberNo = -1;
		
		if(loginMember != null) {
			memberNo = loginMember.getMemberNo();
		}
		
		// 후속 12 개 게시글 가져오기
		Map<String, Object> firstBoard = service.selectSearchList(cp, memberNo, searchKey);
		
		// 각각 꺼내기
		model.addAttribute("boardList", firstBoard.get("boardList"));
		model.addAttribute("pagination", firstBoard.get("pagination"));
		model.addAttribute("searchKey", searchKey);
		
		return "main/plusBoard";
	}
	
	
	
	// 정렬 시 메인화면 구성
	@GetMapping("rankView")
	public String rankView (
			@SessionAttribute(value="loginMember", required=false) Member loginMember,
			@RequestParam("rankTime") String rankTime,
			Model model) {
		
		// 로그인 안했을때 존재할 수 없는 회원 번호 입력
		int memberNo = -1;
		
		if(loginMember != null) {
			memberNo = loginMember.getMemberNo();
		}
		
		int cp = 1;
		
		// 최초 12 개 게시글 가져오기
		Map<String, Object> firstBoard = service.selectRankList(cp, memberNo, rankTime);
		
		// 각각 꺼내기
		model.addAttribute("boardList", firstBoard.get("boardList"));
		model.addAttribute("pagination", firstBoard.get("pagination"));
		model.addAttribute("rankTime", rankTime);
		
		return "main/rankView";
		
	}
	
	
	
	// 후속 게시글 가져오기
	@PostMapping("updateRankList")
	public String updateRankList (
			@SessionAttribute(value="loginMember", required=false) Member loginMember,
			@RequestParam("rankTime") String rankTime,
			@RequestBody int cp,
			Model model
			) {
		
		
		// 로그인 안했을때 존재할 수 없는 회원 번호 입력
		int memberNo = -1;
		
		if(loginMember != null) {
			memberNo = loginMember.getMemberNo();
		}
		
		// 후속 12 개 게시글 가져오기
		Map<String, Object> firstBoard = service.selectRankList(cp, memberNo, rankTime);
		
		// 각각 꺼내기
		model.addAttribute("boardList", firstBoard.get("boardList"));
		model.addAttribute("pagination", firstBoard.get("pagination"));
		model.addAttribute("rankTime", rankTime);
		
		return "main/plusRankBoard";
	}
	
	
}
