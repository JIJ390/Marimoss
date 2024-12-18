package jij.marimoss.email.service;

public interface EmailService {

	/**
	 * 이메일 보내기
	 * @param string
	 * @param email
	 * @return
	 */
	int sendAuthKey(String string, String email);

}
