package jij.marimoss.mypage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import jij.marimoss.main.dto.Board;
import jij.marimoss.member.dto.Member;

@Mapper
public interface MyPageMapper {

	/**
	 * 전체 내가 쓴 글 숫자 조회
	 * @return
	 */
	int selectMyBoardCount(int memberNo);

	/**
	 * 내가 쓴 글 12개 조회
	 * @param rowBounds
	 * @param memberNo
	 * @return
	 */
	List<Board> selectMyBoardList(RowBounds rowBounds, int memberNo);

	/**
	 * 테마 수정
	 * @param memberNo
	 * @param themeUrl
	 * @return
	 */
	int themeUpdate(
			@Param("memberNo") int memberNo,
			@Param("themeUrl") String themeUrl);

	/**
	 * 프로필 수정
	 * @param memberNo
	 * @param profileUrl
	 * @return
	 */
	int profileImgUpdate(
			@Param("memberNo") int memberNo,
			@Param("profileUrl") String profileUrl);

	
	/**
	 * 이름 변경
	 * @param memberNo
	 * @param memeberNickname
	 * @return
	 */
	int nicknameChange(
			@Param("memberNo") int memberNo,
			@Param("memberNickname") String memberNickname);

	/**
	 * 회원 정보 가져오기
	 * @param memberNo
	 * @return
	 */
	Member selectMember(int memberNo);

}
