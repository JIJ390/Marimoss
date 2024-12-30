package jij.marimoss.board.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import jij.marimoss.board.service.BoardService;
import jij.marimoss.main.dto.Board;
import jij.marimoss.member.dto.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("board")
@RequiredArgsConstructor
@Slf4j
public class BoardController {
	
	private final BoardService service;

	// 등록 화면 불러오기
	@GetMapping("insertView")
	public String boardInsertView () {
		return "board/boardInsert";
	}
	
	
	// 게시글 등록 
	@PostMapping("insert")
	@ResponseBody
	public int boardInsert (
			@RequestParam("paint") MultipartFile paint,
			@RequestParam("boardTitle") String boardTitle,
			@RequestParam("boardContent") String boardContent,
			@SessionAttribute("loginMember") Member loginMember
			) {
		
		int memberNo = loginMember.getMemberNo();
		
		int result = service.boardInsert(paint, boardTitle, boardContent, memberNo);
		
		return result;
	}
	
	
	// 좋아요 변경
	@PostMapping("likeChange")
	@ResponseBody
	public Map<String, String> likeChange(
			@RequestBody int boardNo,
			@SessionAttribute("loginMember") Member loginMember
			) {
		
		int memberNo = loginMember.getMemberNo();
		
		Map<String, String> result = service.likeChange(boardNo, memberNo);
		
		return result;
		
	}
	
	
	
	// 댓글 등록
	@PostMapping("insertComment")
	@ResponseBody
	public int insertComment(
			@RequestBody Map<String, String> commentObj,
			@SessionAttribute("loginMember") Member loginMember
			) {
		
		int memberNo = loginMember.getMemberNo();
		
		int result = service.insertComment(commentObj, memberNo);
		
		return result;
		
	}
	
	// 댓글 삭제
	@PutMapping("deleteComment")
	@ResponseBody
	public int deleteComment(
			@RequestBody int commentNo
			) {
		
		int result = service.deleteComment(commentNo);
		
		return result;
		
	}
	
	
	
	// 게시글 삭제
	@PutMapping("deleteBoard")
	@ResponseBody
	public int deleteBoard(
			@RequestBody int boardNo
			) {
		
		int result = service.deleteBoard(boardNo);
		
		return result;
		
	}
	
	
	// 수정 화면 불러오기
	@PostMapping("updateView")
	public String boardUpdateView (
			@RequestBody int boardNo,
			Model model) {
		
		Board board = service.boardUpdateView(boardNo);
		
		model.addAttribute("board", board);
		
		return "board/boardUpdate";
	}
	
	
	// 게시글 수정
	@PutMapping("update")
	@ResponseBody
	public int boardUpdate (
			@RequestParam(name="paint", required=false) MultipartFile paint,
			@RequestParam("boardTitle") String boardTitle,
			@RequestParam("boardContent") String boardContent,
			@RequestParam("boardNo") int boardNo,
			@SessionAttribute("loginMember") Member loginMember
			) {
		
		Board board = new Board();
		
		board.setBoardTitle(boardTitle);
		board.setBoardContent(boardContent);
		board.setBoardNo(boardNo);
		
		int result = service.boardUpdate(paint, board);
		
		return result;
	}
}
