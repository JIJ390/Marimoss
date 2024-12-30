package jij.marimoss.main.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import jij.marimoss.main.dto.Board;
import jij.marimoss.main.dto.Comment;

@Mapper
public interface MainMapper {

	/**
	 * 전체 게시글 숫자 세기
	 * @return
	 */
	int selectBoardCount();

	/**
	 * 최초 12 개 가져오기
	 * @param rowBounds
	 * @param memberNo 
	 * @return
	 */
	List<Board> selectBoardList(
			@Param("rowBounds") RowBounds rowBounds, 
			@Param("memberNo") int memberNo);

	/**
	 * 모달 채우기 + 추후 댓글, 회원 정보 다 가져와야 함!!
	 * @param boardNo
	 * @param memberNo 
	 * @return
	 */
	Board selectBoard(
			@Param("boardNo") int boardNo, 
			@Param("memberNo") int memberNo);

	/**
	 * 댓글 목록
	 * @param boardNo
	 * @return
	 */
	List<Comment> selectCommentList(int boardNo);

	/**
	 * 검색 개수 세기
	 * @param searchKey
	 * @return
	 */
	int selectSearchCount(String searchKey);

	/**
	 * 검색 목록
	 * @param rowBounds
	 * @param memberNo
	 * @param searchKey
	 * @return
	 */
	List<Board> selectSearchList(
			@Param("rowBounds") RowBounds rowBounds, 
			@Param("memberNo") int memberNo,
			@Param("searchKey") String searchKey);

	
	
	
	/**
	 * 순위
	 * @param rankTime 
	 * @return
	 */
	int selectRankCount(String rankTime);

	/**
	 * 랭킹
	 * @param rowBounds
	 * @param memberNo
	 * @param rankTime
	 * @return
	 */
	List<Board> selectRankList(
			@Param("rowBounds") RowBounds rowBounds, 
			@Param("memberNo") int memberNo,
			@Param("rankTime") String rankTime);
			

}
