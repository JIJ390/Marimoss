package jij.marimoss.board.mapper;

import org.apache.ibatis.annotations.Mapper;

import jij.marimoss.main.dto.Board;

@Mapper
public interface BoardMapper {

	/**
	 * 게시글 등록
	 * @param board
	 * @return
	 */
	int boardInsert(Board board);

}
