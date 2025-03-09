package jij.marimoss.email.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jij.marimoss.common.util.RedisUtil;
import jij.marimoss.email.service.EmailService;
import jij.marimoss.member.service.MemberService;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("email")
@RequiredArgsConstructor
public class EmailController {
	
	public final RedisUtil redisUtil;
	
	public final EmailService service;
	
	public final MemberService memberService;
	
	// 레디스 확인하기
	@ResponseBody
	@GetMapping("redisTest")	// localhost/email/redisTest?key=name&value=홍길동
	public int redisTest(	
			@RequestParam("key") String key,
			@RequestParam("value") String value) {
		
		
		// 전달 받은 key, value 를 redis에 set 하기
		redisUtil.setValue(key, value, 60);	// 60 초 후에 만료
		
		return 1;
	}
	
	
	/**
	 * 인증 번호 발송
	 * @param email : 입력된 이메일
	 * @return 성공 1, 실패 0
	 */
	@ResponseBody
	@PostMapping("sendAuthKey")
	public int sendAuthKey (
			@RequestBody Map<String, String> emailObj) {
		
		String email = emailObj.get("inputEmail");
		String authStatus = emailObj.get("authStatus");
		
		return service.sendAuthKey(authStatus, email);
	}
	
	
	@ResponseBody
	@PostMapping("checkAuthKey")
	public boolean checkAuthKey(
			@RequestBody Map<String, String> map
			) {
		
		return service.checkAuthKey(map);
		
	}
	
	
	/**
	 * 일치하는지 확인 후 일치하면 비밀번호 변경
	 * @param map
	 * @return
	 */
	@ResponseBody
	@PostMapping("checkAuthKeyPwFind")
	public boolean checkAuthKeyPwFind(
			@RequestBody Map<String, String> map
			) {
		
		boolean result = service.checkAuthKey(map);
		
		String memberEmail = map.get("email");
		
		// result 값 성공 유무에 따라 다른 수행
		if (result) {
			// 일치할 때 임시 비밀번호 발급 
			String tempPw = memberService.sendTempPw(memberEmail);
			
			int result2 = service.sendTempPw(memberEmail, tempPw);
			
		}
		
		
		return result;
	}
	
}
