package jij.marimoss.mypage.service;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import jij.marimoss.common.util.FileUtil;

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
		
}
