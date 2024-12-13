package jij.marimoss.board.service;

import org.springframework.web.multipart.MultipartFile;

public interface BoardService {

	/**
	 * 게시글 등록
	 * @param paint
	 * @param boardTitle
	 * @param boardContent
	 * @param memberNo
	 * @return result
	 */
	int boardInsert(MultipartFile paint, String boardTitle, String boardContent, int memberNo);

}
