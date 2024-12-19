package jij.marimoss.member.service;

import jij.marimoss.member.dto.Member;

public interface MemberService {

	/**
	 * 로그인
	 * @param memberEmail
	 * @param memberPassward
	 * @return loginMember
	 */
	Member login(String memberEmail, String memberPassward);

	/**
	 * 자동 로그
	 * @param memberEmail
	 * @return
	 */
	Member autoLogin(String memberEmail);

	
	/**
	 * 이메일 중복 검사
	 * @param memeberEmail
	 * @return
	 */
	int emailCheck(String memeberEmail);

	/**
	 * 회원 가입
	 * @param signUpMember
	 * @return
	 */
	Member signUp(Member signUpMember);

}
