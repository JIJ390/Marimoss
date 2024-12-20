package jij.marimoss.board.service;

import java.util.Map;

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

	/**
	 * 좋아요 여부 변경
	 * @param boardNo
	 * @param memberNo
	 * @return
	 */
	Map<String, String> likeChange(int boardNo, int memberNo);

}
