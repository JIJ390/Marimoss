package jij.marimoss.main.service;

import java.util.List;
import java.util.Map;

import jij.marimoss.main.dto.Board;
import jij.marimoss.main.dto.Comment;

public interface MainService {

	/**
	 * 최초 12 개 게시글 목록 + 페이지 네이션
	 * @param memberNo 
	 * @return firstBoard
 	 */
	Map<String, Object> selectBoardList(int cp, int memberNo);

	/**
	 * 모달 채우기 
	 * @param boardNo
	 * @param memberNo 
	 * @return board
	 */
	Board selectBoard(int boardNo, int memberNo);

	/**
	 * 댓글 목록 가져오기
	 * @param boardNo
	 * @return
	 */
	List<Comment> selectCommentList(int boardNo);

	/**
	 * 검색
	 * @param cp
	 * @param memberNo
	 * @param searchKey
	 * @return
	 */
	Map<String, Object> selectSearchList(int cp, int memberNo, String searchKey);

}
