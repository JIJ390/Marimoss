package jij.marimoss.email.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jij.marimoss.common.util.RedisUtil;
import jij.marimoss.email.service.EmailService;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("email")
@RequiredArgsConstructor
public class EmailController {
	
	public final RedisUtil redisUtil;
	
	public final EmailService service;
	
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
			@RequestBody String email) {
		
		return service.sendAuthKey("signUp", email);
	}
}
