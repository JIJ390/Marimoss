package jij.marimoss.main.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import jij.marimoss.main.dto.Board;

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

}
