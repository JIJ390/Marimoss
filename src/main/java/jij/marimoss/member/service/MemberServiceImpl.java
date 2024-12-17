package jij.marimoss.member.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jij.marimoss.member.dto.Member;
import jij.marimoss.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService{
	
	private final MemberMapper mapper;
	private final BCryptPasswordEncoder encoder;
	
	
	@Override
	public Member login(String memberEmail, String memberPassward) {
		
		Member loginMember = mapper.login(memberEmail);
		

		
		// 일치하는 이메일 없을 때
		if (loginMember == null) {

			return null;
		}
		
		// 일치하는 비밀번호 있을때
		if (memberPassward.equals(loginMember.getMemberPassward())) {
			return loginMember;
		}
		
		// 일치하는 비밀번호 없을때
		return null;
		
	}
}
