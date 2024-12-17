package jij.marimoss.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletResponse;
import jij.marimoss.member.dto.Member;
import jij.marimoss.member.service.MemberService;
import lombok.RequiredArgsConstructor;

@SessionAttributes({"loginMember"})
@Controller
@RequestMapping("member")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService service;
	
	/**
	 * 로그인 자동 로그인 여부에 따라 쿠키 생성
	 * @param memberEmail
	 * @param memberPw
	 * @param autoLogin
	 * @param ra
	 * @param model
	 * @param resp
	 * @return
	 */
	@PostMapping("login")
	public String login(			
			@RequestParam("memberEmail") String memberEmail,
			@RequestParam("memberPassward")    String memberPassward,
			@RequestParam(name="autoLogin", required=false) String autoLogin,	// null 이 들어와도 오류 안나도록
			Model model,
			RedirectAttributes ra,
			HttpServletResponse resp
			) {
		
		Member loginMember = service.login(memberEmail, memberPassward);
		
		//로그인 실패 시
		if (loginMember == null) {
			ra.addFlashAttribute("message", "이메일 또는 비밀번호가 일치하지 않습니다");
			
			return "redirect:/";  
		}
		
		// 로그인 성공 시
		else {
			model.addAttribute("loginMember", loginMember);
			ra.addFlashAttribute("message", "로그인 되었습니다");
			
		}
		
		return "redirect:/";  //
	}
}
