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
	
	private String boardNo;
	private String boardTitle;
	private String boardImgPath;
	private String boardOrigin;
	private String boardRename;
	private String boardContent;
	private String boardWriteDate;
	private String readCount;
	private String boardDelFl;
	private String memberNo;
	
}
