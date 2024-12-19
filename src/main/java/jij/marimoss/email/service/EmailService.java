package jij.marimoss.email.service;

import java.util.Map;

public interface EmailService {

	/**
	 * 이메일 보내기
	 * @param string
	 * @param email
	 * @return
	 */
	int sendAuthKey(String string, String email);

	
	/**
	 * 이메일 인증
	 * @param map
	 * @return
	 */
	boolean checkAuthKey(Map<String, String> map);

}
