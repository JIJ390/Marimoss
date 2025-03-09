package jij.marimoss.member.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import jij.marimoss.member.dto.Member;

@Mapper
public interface MemberMapper {

	/**
	 * 이메일이 일치하는 모든 회원의 비밀 번호
	 * @param memberEmail
	 * @return
	 */
	Member login(String memberEmail);

	/**
	 * 이메일 중복 검사
	 * @param memeberEmail
	 * @return count 
	 */
	int emailCheck(String memeberEmail);

	/**
	 * 회원 가입
	 * @param signUpMember
	 * @return
	 */
	int signUp(Member signUpMember);

	/**
	 * 팔로우 되어있는지 확인
	 * @param memberNo
	 * @param loginMemberNo
	 * @return
	 */
	int followCheck(
			@Param("memberNo") int memberNo,
			@Param("loginMemberNo") int loginMemberNo);

	/**
	 * 팔로우 삭제
	 * @param memberNo
	 * @param loginMemberNo
	 * @return
	 */
	int unfollow(
			@Param("memberNo") int memberNo,
			@Param("loginMemberNo") int loginMemberNo);

	/**
	 * 팔로우 등록
	 * @param memberNo
	 * @param loginMemberNo
	 * @return
	 */
	int follow(
			@Param("memberNo") int memberNo,
			@Param("loginMemberNo") int loginMemberNo);

	
	/**
	 * 비밀 번호 변경
	 * @param memberEmail
	 * @param encPw
	 * @return
	 */
	int pwChange(
			@Param("memberEmail") String memberEmail, 
			@Param("encPw") String encPw);

}
