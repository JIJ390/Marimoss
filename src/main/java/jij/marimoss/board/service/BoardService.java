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

	/**
	 * 댓글 등록
	 * @param commentObj
	 * @param memberNo
	 * @return
	 */
	int insertComment(Map<String, String> commentObj, int memberNo);

	
	/**
	 * 댓글 삭제
	 * @param commentNo
	 * @return
	 */
	int deleteComment(int commentNo);

	
	/**
	 * 게시글 삭제
	 * @param boardNo
	 * @return
	 */
	int deleteBoard(int boardNo);

}
