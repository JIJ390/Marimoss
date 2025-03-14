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

	/**
	 * 해당 회원을 팔로우한 회원들 정보(팔로위)(추종자들)
	 * @param memberNo
	 * @return
	 */
	List<Member> selectFollowerList(int memberNo);

	/**
	 * 해당 회원'이' 팔로우한 회원들 정보
	 * @param memberNo
	 * @return
	 */
	List<Member> selectfolloweeList(int memberNo);

	/**
	 * 이메일 공개 여부 변경
	 * @param memberNo
	 * @return
	 */
	int emailFlChange(int memberNo);

	/**
	 * 변경 후 문자 가져우기
	 * @param memberNo
	 * @return
	 */
	String selectEmailFl(int memberNo);
	
	/**
	 * 활동 내역 공개 여부 변경
	 * @param memberNo
	 * @return
	 */
	int activeFlChange(int memberNo);
	
	/**
	 * 변경 후 문자 가져오기
	 * @param memberNo
	 * @return
	 */
	String selectActiveFl(int memberNo);

	/**
	 * 팔로우 공개 여부 변경
	 * @param memberNo
	 * @return
	 */
	int followFlChange(int memberNo);

	/**
	 * 변경 후 문자 가져우기
	 * @param memberNo
	 * @return
	 */
	String selectFollowFl(int memberNo);



}
