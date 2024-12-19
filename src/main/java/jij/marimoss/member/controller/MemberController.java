package jij.marimoss.member.controller;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jij.marimoss.member.dto.Member;
import jij.marimoss.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@SessionAttributes({"loginMember"})
@Controller
@RequestMapping("member")
@RequiredArgsConstructor
@Slf4j
@PropertySource("classpath:/config.properties")
public class MemberController {
	
	@Value("${jwt.secret}") 
	private String jwtSecretKey; 

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
		
		log.debug("autoLogin : {}", autoLogin);
		
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
			
				
			//Keys.hmacShaKeyFor는 Base64로 인코딩된 키를 처리
			//키를 적절히 인코딩/디코딩해야 함
			Key key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecretKey));
			
      String token = Jwts.builder()
          .setSubject(memberEmail) // 사용자 이메일을 JWT의 subject로 설정
          .setIssuedAt(new Date()) // 토큰 생성 시간
          .setExpiration(new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000)) // 만료 시간
          .signWith(key) // 서명 알고리즘과 비밀 키 설정
          .compact(); // JWT 생성 완료
				
      Cookie cookie = new Cookie("authToken", token);
      cookie.setHttpOnly(true);   // JavaScript 접근 방지
      cookie.setSecure(true);     // HTTPS 연결에서만 사용
      cookie.setPath("/");        // 애플리케이션 전역에서 사용
				
      // Cookie 가 유지되는 시간(수명) 설정
			if (autoLogin == null) { // 체크 X
				cookie.setMaxAge(0); // 만들어지자 마자 만료
														 // == 기존에 쿠키가 있으면 덮어씌우고 없어짐
														 // 체크 여부에 따라 기존 쿠키를 지울수도 있기 때문!
			} else {
				cookie.setMaxAge(60*60*24*7); // 일주일 유효
			}
			
			// 4. resp 객체에 추가해서 클라이언트에 전달
			resp.addCookie(cookie);
      
		}
		
		return "redirect:/";  //
	}
	
	
	@GetMapping("logout")
	public String logout(
			HttpServletResponse resp,
			SessionStatus status) {
		
    Cookie cookie = new Cookie("authToken", null);
    cookie.setHttpOnly(true);   // JavaScript 접근 방지
    cookie.setSecure(true);     // HTTPS 연결에서만 사용
    cookie.setPath("/");    
    cookie.setMaxAge(0); 
    
    // 빈쿠기 할당 즉시 만료
    resp.addCookie(cookie);
			
		status.setComplete();
		
		return "redirect:/";
	}
	
	
	
	/**
	 * 이메일 중복 검사
	 * @param memeberEmail
	 * @return
	 */
	@GetMapping("emailCheck")
	@ResponseBody
	public int emailCheck(
			@RequestParam("email") String memeberEmail) {
		
		int count = service.emailCheck(memeberEmail);
		
		log.debug("count : {}", count);
		
		return count;
	}
	
	
	@PostMapping("signUp")
	public String signUp (
			@ModelAttribute Member signUpMember,
			Model model,
			RedirectAttributes ra
			) {
		
		// 회원 가입 성공 시 즉시 로그인 되도록 정보 가져오기
		Member member = service.signUp(signUpMember);
		
		if (member != null) {
			model.addAttribute("loginMember", member);
			ra.addFlashAttribute("message", member.getMemberNickname() + " 님 marimoss 가입을 환영합니다");
			
		}
		
		else {
			ra.addFlashAttribute("message", "회원 가입 오류");
		}
		
		
		return "redirect:/";
	}
	
	
}
