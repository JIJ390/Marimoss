package jij.marimoss.email.service;

import java.util.Map;

public interface EmailService {

	/**
	 * 이메일 보내기
	 * @param authStatus
	 * @param email
	 * @return
	 */
	int sendAuthKey(String authStatus, String email);

	
	/**
	 * 이메일 인증
	 * @param map
	 * @return
	 */
	boolean checkAuthKey(Map<String, String> map);


	/**
	 * 임시 비밀번호 보내기
	 * @param memberEmail
	 * @param tempPw
	 * @return
	 */
	int sendTempPw(String memberEmail, String tempPw);


}
