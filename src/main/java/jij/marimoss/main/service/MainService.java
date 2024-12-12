package jij.marimoss.main.service;

import java.util.Map;

import jij.marimoss.main.dto.Board;

public interface MainService {

	/**
	 * 최초 12 개 게시글 목록 + 페이지 네이션
	 * @return firstBoard
 	 */
	Map<String, Object> selectBoardList(int cp);

	/**
	 * 모달 채우기 
	 * @param boardNo
	 * @return board
	 */
	Board selectBoard(int boardNo);

}
