package jij.marimoss.mypage.service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import jij.marimoss.common.util.FileUtil;
import jij.marimoss.main.dto.Board;
import jij.marimoss.main.dto.Pagination;
import jij.marimoss.member.dto.Member;
import jij.marimoss.mypage.mapper.MyPageMapper;
import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{

	private final MyPageMapper mapper;
	
	
	@Value("${my.myTheme.web-path}") 
	private String myThemeWebPath; 
	
	@Value("${my.myTheme.folder-path}") 
	private String myThemeFolderPath; 
	
	
	@Value("${my.profile.web-path}") 
	private String profileWebPath; 
	
	@Value("${my.profile.folder-path}") 
	private String profileFolderPath; 
	
	
	
	@Override
	public Map<String, Object> selectMyBoardList(int cp, int memberNo) {
		
		int boardCount = mapper.selectMyBoardCount(memberNo);
		
		Pagination adminPagination = new Pagination(cp, boardCount);
		
		int limit = adminPagination.getLimit(); 	// 10
		int offset = (cp - 1) * limit;			// 0
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		List<Board> boardList = mapper.selectMyBoardList(rowBounds, memberNo);
		
		// 4. 목록 조회 결과 + Pagination 객체 Map 으로 묶어서 반환
		Map<String, Object> map = new HashMap<>();
		map.put(("boardList"), boardList);
		map.put(("pagination"), adminPagination);		
		map.put(("boardCount"), boardCount);		
		
		return map;
	}
	
	
	
	
	/**
	 * 테마 수정
	 */
	@Override
	public String themeUpdate(int memberNo, MultipartFile theme) {
		
		String themeRename = FileUtil.rename(theme.getOriginalFilename());
		String themeUrl = myThemeWebPath + themeRename;
		
		// DB 에 먼저 업로드
		int result = mapper.themeUpdate(memberNo, themeUrl);
		
		
		// 로컬 저장소 업로드
		try {
			// 폴더가 없으면 생성
			File folder = new File(myThemeFolderPath);
			if(!folder.exists()) folder.mkdirs();
			
			// 업로드되어 임시저장된 이미지를 지정된 경로에 옮기기
			theme.transferTo(new File(myThemeFolderPath + themeRename));

		} catch (Exception e) {
			
			e.printStackTrace();
			throw new Error("이미지 입력 실패");
		}
		
		return themeUrl;
	}
	
	
	
	@Override
	public String profileImgUpdate(int memberNo, MultipartFile profileImg) {
		
		String profileRename = FileUtil.rename(profileImg.getOriginalFilename());
		String profileUrl = profileWebPath + profileRename;
		
		// DB 에 먼저 업로드
		int result = mapper.profileImgUpdate(memberNo, profileUrl);
		
		// 로컬 저장소 업로드
		try {
			// 폴더가 없으면 생성
			File folder = new File(profileFolderPath);
			if(!folder.exists()) folder.mkdirs();
			
			// 업로드되어 임시저장된 이미지를 지정된 경로에 옮기기
			profileImg.transferTo(new File(profileFolderPath + profileRename));

		} catch (Exception e) {
			
			e.printStackTrace();
			throw new Error("이미지 입력 실패");
		}
		
		return profileUrl;
		
	}
	
	
	
	
	@Override
	public int nicknameChange(int memberNo, String memberNickname) {
		return mapper.nicknameChange(memberNo, memberNickname);
	}
	
	
	@Override
	public Member selectMember(int memberNo) {
		return mapper.selectMember(memberNo);
	}
}
