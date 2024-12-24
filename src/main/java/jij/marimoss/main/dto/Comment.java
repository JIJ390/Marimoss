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
public class Comment {

	private int commentNo;
	private String commentContent;
	private String commentWriteDate;
	private String commentDelFl;
	private String boardNo;
	private int memberNo;
	private int parentCommentNo;
	
	private String memberNickname;
	private String memberProfile;
}
