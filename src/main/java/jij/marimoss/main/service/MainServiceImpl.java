package jij.marimoss.main.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import jij.marimoss.main.dto.Board;
import jij.marimoss.main.dto.Comment;
import jij.marimoss.main.dto.Pagination;
import jij.marimoss.main.mapper.MainMapper;
import jij.marimoss.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MainServiceImpl implements MainService{

	private final MainMapper mapper;
	private final MemberMapper memberMapper;
	
	
	// 12 개 게시글 목록 + 페이지 네이션
	@Override
	public Map<String, Object> selectBoardList(
			int cp,
			int memberNo
			) {
		
		int boardCount = mapper.selectBoardCount();
		
		Pagination adminPagination = new Pagination(cp, boardCount);
		
		int limit = adminPagination.getLimit(); 	// 10
		int offset = (cp - 1) * limit;			// 0
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		List<Board> boardList = mapper.selectBoardList(rowBounds, memberNo);
		
		// 4. 목록 조회 결과 + Pagination 객체 Map 으로 묶어서 반환
		Map<String, Object> map = new HashMap<>();
		map.put(("boardList"), boardList);
		map.put(("pagination"), adminPagination);		

		
		return map;
	}
	
	
	
	// 모달 채우기
	@Override
	public Board selectBoard(int boardNo, int memberNo) {
		return mapper.selectBoard(boardNo, memberNo);
	}
	
	@Override
	public List<Comment> selectCommentList(int boardNo) {
		
		return mapper.selectCommentList(boardNo);

	}
	
	@Override
	public int followCheck(int boardMemberNo, int memberNo) {
		return memberMapper.followCheck(boardMemberNo, memberNo);
	}
	
	
	@Override
	public Map<String, Object> selectSearchList(int cp, int memberNo, String searchKey) {
		
		int boardCount = mapper.selectSearchCount(searchKey);
		
		Pagination adminPagination = new Pagination(cp, boardCount);
		
		int limit = adminPagination.getLimit(); 	// 10
		int offset = (cp - 1) * limit;			// 0
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		List<Board> boardList = mapper.selectSearchList(rowBounds, memberNo, searchKey);
		
		// 4. 목록 조회 결과 + Pagination 객체 Map 으로 묶어서 반환
		Map<String, Object> map = new HashMap<>();
		map.put(("boardList"), boardList);
		map.put(("pagination"), adminPagination);		

		
		return map;
	}
	
	
	@Override
	public Map<String, Object> selectRankList(int cp, int memberNo, String rankTime) {

		int boardCount = mapper.selectRankCount(rankTime);

		Pagination adminPagination = new Pagination(cp, boardCount);

		int limit = adminPagination.getLimit(); // 10
		int offset = (cp - 1) * limit; // 0

		RowBounds rowBounds = new RowBounds(offset, limit);

		List<Board> boardList = mapper.selectRankList(rowBounds, memberNo, rankTime);

		
		Map<String, Object> map = new HashMap<>();
		
		map.put(("boardList"), boardList);
		map.put(("pagination"), adminPagination);
		
		return map;
	}
}
