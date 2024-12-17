package jij.marimoss.member.mapper;

import org.apache.ibatis.annotations.Mapper;

import jij.marimoss.member.dto.Member;

@Mapper
public interface MemberMapper {

	/**
	 * 이메일이 일치하는 모든 회원의 비밀 번호
	 * @param memberEmail
	 * @return
	 */
	Member login(String memberEmail);

}
