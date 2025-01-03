package jij.marimoss.mypage.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import jij.marimoss.common.util.FileUtil;
import jij.marimoss.member.dto.Member;

public interface MyPageService {

	/**
	 * 내가 쓴 게시글 조회
	 * @param cp
	 * @param memberNo
	 * @return
	 */
	Map<String, Object> selectMyBoardList(int cp, int memberNo);

	
	
	/**
	 * 테마 업데이트
	 * @param memberNo
	 * @param theme
	 * @return
	 */
	String themeUpdate(int memberNo, MultipartFile theme);



	/**
	 * 프로필 업데이트
	 * @param memberNo
	 * @param profileImg
	 * @return
	 */
	String profileImgUpdate(int memberNo, MultipartFile profileImg);



	/**
	 * 이름 변경
	 * @param memberNo
	 * @param memeberNickname
	 * @return
	 */
	int nicknameChange(int memberNo, String memberNickname);


	/**
	 * 유저 정보
	 * @param memberNo
	 * @return
	 */
	Member selectMember(int memberNo);


	/**
	 * 해당 회원을 팔로우한 회원들 정보
	 * @param memberNo
	 * @return
	 */
	List<Member> selectFollowerList(int memberNo);


	/**
	 * 해당 회원이 팔로우한 회원 정보
	 * @param memberNo
	 * @return
	 */
	List<Member> selectfolloweeList(int memberNo);
		
}
