package jij.marimoss.member.service;

import java.util.Map;

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

	
	/**
	 * 상태 확인 후 팔로우 삭제, 등록
	 * @param memberNo
	 * @param loginMemberNo
	 * @return
	 */
	String followChange(int memberNo, int loginMemberNo);

	/**
	 * 비밀번호 변경
	 * @param memeberEmail
	 * @param prePassward
	 * @param newPassward
	 * @return
	 */
	int pwChange(String memberEmail, String prePassward, String newPassward);

	/**
	 * 회원 탈퇴
	 * @param memberEmail
	 * @param memberPw
	 * @return
	 */
	int memberDel(String memberEmail, String memberPw);

	/**
	 * 임시 비밀번호 생성 후 발급
	 * @param memberEmail
	 * @return
	 */
	String sendTempPw(String memberEmail);


}
