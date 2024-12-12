package jij.marimoss.main.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Board {
	
	private int boardNo;
	private String boardTitle;
	private String boardImgPath;
	private String boardOrigin;
	private String boardRename;
	private String boardContent;
	private String boardWriteDate;
	private int readCount;
	private String boardDelFl;
	private int memberNo;
	
	
	// 편의성 추가 필드
	private String memberNickname;
	private int likeCount;
}
