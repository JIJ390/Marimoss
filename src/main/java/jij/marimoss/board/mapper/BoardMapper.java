package jij.marimoss.board.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import jij.marimoss.main.dto.Board;

@Mapper
public interface BoardMapper {

	/**
	 * 게시글 등록
	 * @param board
	 * @return
	 */
	int boardInsert(Board board);

	
	
	int checkLike(			
			@Param("boardNo") int boardNo, 
			@Param("memberNo") int memberNo);

	int deleteLike(			
			@Param("boardNo") int boardNo, 
			@Param("memberNo") int memberNo);
	
	int insertLike(			
			@Param("boardNo") int boardNo, 
			@Param("memberNo") int memberNo);


	// 전체 좋아요 개수 세기
	int likeCount(int boardNo);

}
