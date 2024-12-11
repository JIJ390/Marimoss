package jij.marimoss.main.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
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
	 * @return
	 */
	List<Board> selectBoardList(RowBounds rowBounds);

}
