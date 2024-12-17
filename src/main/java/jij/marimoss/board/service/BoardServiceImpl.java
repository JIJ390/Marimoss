package jij.marimoss.board.service;

import java.io.File;

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

}