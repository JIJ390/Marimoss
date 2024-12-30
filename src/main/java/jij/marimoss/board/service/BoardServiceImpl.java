package jij.marimoss.board.service;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import jij.marimoss.board.mapper.BoardMapper;
import jij.marimoss.common.util.FileUtil;
import jij.marimoss.main.dto.Board;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@Slf4j
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{
	
	private final BoardMapper mapper;
	
	
	@Value("${my.board.web-path}") // springframework 로 import
	private String boardWebPath; 
	
	@Value("${my.board.folder-path}") 
	private String boardFolderPath; 
	
	
	// 게시글 등록
	@Override
	public int boardInsert(MultipartFile paint, String boardTitle, String boardContent, int memberNo) {
		
		String boardImgOrigin = paint.getOriginalFilename();
		String boardImgRename = FileUtil.rename(boardImgOrigin);
		
		// board 에 정보 담기
		Board board = Board.builder()
								 .boardTitle(boardTitle)
								 .boardContent(boardContent)
								 .boardImgPath(boardWebPath)
								 .boardImgOrigin(boardImgOrigin)
								 .boardImgRename(boardImgRename)
								 .memberNo(memberNo)
								 .build();
		
		// db 에 먼저 업로드
		int result = mapper.boardInsert(board);
		
		
		// 로컬 저장소 업로드
		try {
			// 폴더가 없으면 생성
			File folder = new File(boardFolderPath);
			if(!folder.exists()) folder.mkdirs();
			
			// 업로드되어 임시저장된 이미지를 지정된 경로에 옮기기
			paint.transferTo(new File(boardFolderPath + boardImgRename));

		} catch (Exception e) {
			
			result = 0;
			
			e.printStackTrace();
			throw new Error("이미지 입력 실패");
		}
		
				
		
		return result;
	}

	
	
	
	@Override
	public Map<String, String> likeChange(int boardNo, int memberNo) {
		
		int count = mapper.checkLike(boardNo, memberNo);
		
		String likeResult = null;
		
		// 존재할 시 삭제
		if (count == 1) {
			int result = mapper.deleteLike(boardNo, memberNo);
			likeResult = "delete";
			
		// 없으면 등록
		} else if (count == 0) {
			int result = mapper.insertLike(boardNo, memberNo);
			likeResult = "insert";
			
		// 에러
		} else {
			likeResult = "error";
		}
		
		// 전체 좋아요 개수
		int likeCount = mapper.likeCount(boardNo);
		
		Map<String, String> map = new HashMap<String, String>();
		
		map.put("likeResult", likeResult);
		map.put("likeCount", String.valueOf(likeCount));
		
		return map;
		
	}
	
	
	@Override
	public int insertComment(Map<String, String> commentObj, int memberNo) {
		
		int boardNo = Integer.parseInt(commentObj.get("boardNo"));
		String commentContent = commentObj.get("commentContent");
		
		return mapper.insertComment(boardNo, memberNo, commentContent);
	}
	
	
	// 댓글 삭제
	@Override
	public int deleteComment(int commentNo) {
		return mapper.deleteComment(commentNo);
	}
	
	
	
	// 게시글 삭제
	@Override
	public int deleteBoard(int boardNo) {
		return mapper.deleteBoard(boardNo);
	}
	
	
	// 게시글 수정 화면
	@Override
	public Board boardUpdateView(int boardNo) {
		return mapper.boardUpdateView(boardNo);
	}
	
	
	@Override
	public int boardUpdate(MultipartFile paint, Board board) {
		
		int result = 0;
		
		board.setBoardImgPath(boardWebPath);
		
		
		// 이미지 파일 업로드가 된 경우
		if (paint != null) {
			
			String boardImgOrigin = paint.getOriginalFilename();
			String boardImgRename = FileUtil.rename(boardImgOrigin);
			
			board.setBoardImgOrigin(boardImgOrigin);
			board.setBoardImgRename(boardImgRename);
			
			// DB UPDATE
			result = mapper.boardUpdate(board);
			
			// 로컬 저장소 업로드
			try {
				// 폴더가 없으면 생성
				File folder = new File(boardFolderPath);
				if(!folder.exists()) folder.mkdirs();
				
				// 업로드되어 임시저장된 이미지를 지정된 경로에 옮기기
				paint.transferTo(new File(boardFolderPath + boardImgRename));

			} catch (Exception e) {
				
				result = 0;
				
				e.printStackTrace();
				throw new Error("이미지 입력 실패");
			}
		}
		
		// 이미지 파일 올리지 않은 경우
		else {
			result = mapper.boardUpdate(board);
		}
		
		return result;
	}
	
	
}
