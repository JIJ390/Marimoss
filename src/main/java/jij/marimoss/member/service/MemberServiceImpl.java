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
		
		// 비밀 번호 불일치 시
		if (!encoder.matches(memberPassward, loginMember.getMemberPassward())) {
			return null;
		}
		
		// 로그인 성공 / 결과 반환
		return loginMember;
		
	}
	
	
	
	// 자동 로그인
	@Override
	public Member autoLogin(String memberEmail) {
		
		Member loginMember = mapper.login(memberEmail);
		
		return loginMember;
	}
	
	// 이메일 중복 검사
	@Override
	public int emailCheck(String memeberEmail) {
		return mapper.emailCheck(memeberEmail);
	}
	
	
	// 회원 가입
	@Override
	public Member signUp(Member signUpMember) {
		
		// 비밀번호 암호화
		String encPw = encoder.encode(signUpMember.getMemberPassward());
		signUpMember.setMemberPassward(encPw);
		
		int result = mapper.signUp(signUpMember);
		
		// 가입 성공 시 로그인 정보 반환
		if (result == 1) {
			return mapper.login(signUpMember.getMemberEmail());
		}
		
		return null;
	}
	
	
	// 팔로우 확인 후 등록 / 삭제
	@Override
	public String followChange(int memberNo, int loginMemberNo) {
		
		int followCount = mapper.followCheck(memberNo, loginMemberNo);
		String followResult = null;
		
		if (followCount > 0) {
			// 팔로우 존재 시 삭제
			int result = mapper.unfollow(memberNo, loginMemberNo);
			followResult = "unfollow";
					
		} else {
			// 팔로우 실행
			int result = mapper.follow(memberNo, loginMemberNo);
			followResult = "follow";
		}
		
		
		return followResult;
	}
	
	
	
	@Override
	public int pwChange(String memberEmail, String prePassward, String newPassward) {
		
		Member loginMember = mapper.login(memberEmail);
		
		// 일치하는 이메일 없을 때
		if (loginMember == null) {
			return 3;
		}
		
		// 비밀 번호 불일치 시
		if (!encoder.matches(prePassward, loginMember.getMemberPassward())) {
			return 4;
		}
		
		// 로그인 성공 / 비밀 번호 변경
		
		// 비밀번호 암호화
		String encPw = encoder.encode(newPassward);
		
		int result = mapper.pwChange(memberEmail, encPw);
		
		return result;
	}
}
