package jij.marimoss.main.service;

import java.util.Map;

public interface MainService {

	/**
	 * 최초 12 개 게시글 목록 + 페이지 네이션
	 * @return firstBoard
 	 */
	Map<String, Object> selectFirstBoard();

}
