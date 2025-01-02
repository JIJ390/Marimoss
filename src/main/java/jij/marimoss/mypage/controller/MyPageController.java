package jij.marimoss.mypage.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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

import jij.marimoss.member.dto.Member;
import jij.marimoss.mypage.service.MyPageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("myPage")
@RequiredArgsConstructor
@Slf4j
public class MyPageController {
	
	private final MyPageService service;

	
	/**
	 * 내가 쓴 게시글 조회
	 * @param loginMember
	 * @return
	 */
	@GetMapping("myPageView")
	public String myPageView(
			@SessionAttribute("loginMember") Member loginMember,
			Model model) {
		
		int memberNo = loginMember.getMemberNo();
		
		int cp = 1;
		
		// 최초 12 개 게시글 가져오기
		Map<String, Object> firstBoard = service.selectMyBoardList(cp, memberNo);
		
		// 각각 꺼내기
		model.addAttribute("boardList", firstBoard.get("boardList"));
		model.addAttribute("pagination", firstBoard.get("pagination"));
		model.addAttribute("boardCount", firstBoard.get("boardCount"));
		
		log.debug("boardCount : {}", firstBoard.get("boardCount"));
		
		return "myPage/myPage";
	}
	
	
	
	
	
	// 후속 게시글 가져오기
	@PostMapping("updateMyBoardList")
	public String updateBoardList (
			@SessionAttribute("loginMember") Member loginMember,
			@RequestBody int cp,
			Model model
			) {
		
		int memberNo = loginMember.getMemberNo();
		
		// 후속 12 개 게시글 가져오기
		Map<String, Object> plusBoard = service.selectMyBoardList(cp, memberNo);
		
		// 각각 꺼내기
		model.addAttribute("boardList", plusBoard.get("boardList"));
		model.addAttribute("pagination", plusBoard.get("pagination"));
		
		return "main/plusBoard";
	}
	
	
	/**
	 * 내가 쓴 게시글 조회
	 * @param loginMember
	 * @return
	 */
	@GetMapping("memberPageView")
	public String memberPageView(
			@RequestParam("memberNo") int memberNo,
			Model model) {
		
		int cp = 1;
		
		Member memberStatus = service.selectMember(memberNo);
		
		// 최초 12 개 게시글 가져오기
		Map<String, Object> firstBoard = service.selectMyBoardList(cp, memberNo);
		
		// 각각 꺼내기
		model.addAttribute("memberStatus", memberStatus);
		model.addAttribute("boardList", firstBoard.get("boardList"));
		model.addAttribute("pagination", firstBoard.get("pagination"));
		model.addAttribute("boardCount", firstBoard.get("boardCount"));
		
		return "myPage/memberPage";
	}
	
	
	// 후속 게시글 가져오기
	@PostMapping("updateMemberBoardList")
	public String updateMemberBoardList (
			@RequestBody Map<String, String> obj,
			Model model
			) {
		
		int memberNo = Integer.parseInt(obj.get("memberNo"));
		int cp = Integer.parseInt(obj.get("lastCp"));
		
		log.debug("memberNo", memberNo);
		
		// 후속 12 개 게시글 가져오기
		Map<String, Object> plusBoard = service.selectMyBoardList(cp, memberNo);
		
		// 각각 꺼내기
		model.addAttribute("boardList", plusBoard.get("boardList"));
		model.addAttribute("pagination", plusBoard.get("pagination"));
		
		return "main/plusBoard";
	}
	
	
	
	@PutMapping("themeUpdate")
	@ResponseBody
	public String themeUpdate (
			@SessionAttribute("loginMember") Member loginMember,
			@RequestParam("theme") MultipartFile theme
			) {
		
		int memberNo = loginMember.getMemberNo();
		
		String themeUrl = service.themeUpdate(memberNo, theme);
		
		// 동기화
		loginMember.setMemberTheme(themeUrl);
		
		return themeUrl;
		
	}
	
	
	
	
	
	/**
	 * 프로필 이미지 수정
	 * @param loginMember
	 * @param profileImg
	 * @param model
	 * @return
	 */
	@PutMapping("profileImgUpdate")
	@ResponseBody
	public String profileImgUpdate (
			@SessionAttribute("loginMember") Member loginMember,
			@RequestParam("profileImg") MultipartFile profileImg
			) {
		
		int memberNo = loginMember.getMemberNo();
		
		String profileUrl = service.profileImgUpdate(memberNo, profileImg);
		
		// 동기화
		loginMember.setMemberProfile(profileUrl);
		
		return profileUrl;
		
	}
	
	
	
	@PutMapping("nicknameChange")
	@ResponseBody
	public int nicknameChange (
			@SessionAttribute("loginMember") Member loginMember,
			@RequestBody String memberNickname
			) {
		
		int memberNo = loginMember.getMemberNo();
		
		int result = service.nicknameChange(memberNo, memberNickname);
		
		// 동기화
		loginMember.setMemberNickname(memberNickname);
		
		return result;
		
	}
	
	
	
	
	
}
