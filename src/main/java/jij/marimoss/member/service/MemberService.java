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

}
