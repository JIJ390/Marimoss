package jij.marimoss.member.dto;

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
public class Member {

	private int memberNo;
	private String memberEmail;
	private String memberPassward;
	private String memberNickname;
	private String memberSignDate;
	private String memberProfile;
	private String memberTheme;
	private String memberEmailFl;
	private String memberActiveFl;
	private String memberFollowFl;
	private String memberDelFl;
	
	// 맞팔 여부
	private int followBack;
}
