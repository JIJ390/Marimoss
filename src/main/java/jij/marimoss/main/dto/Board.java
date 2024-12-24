package jij.marimoss.main.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Board {
	
	private int boardNo;
	private String boardTitle;
	private String boardImgPath;
	private String boardImgOrigin;
	private String boardImgRename;
	private String boardContent;
	private String boardWriteDate;
	private int readCount;
	private String boardDelFl;
	private int memberNo;
	
	
	// 편의성 추가 필드
	private String memberNickname;
	private String memberProfile;
	private int likeCount;
	
	// 해당 게시글 좋아요 여부
	private int likeFl;
}
