package jij.marimoss.sse.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import jij.marimoss.sse.dto.Notification;

@Mapper
public interface SseMapper {

	
	/**
	 * 알림 삽입
	 * @param notification
	 * @return
	 */
	int insertNotification(Notification notification);
	
	/**
	 * 알림을 받아야 하는 회원의 번호 + 안읽은 알람 개수 조회
	 * @param notificationNo
	 * @return
	 */
	Map<String, Object> selectReceiveMember(int notificationNo);


}
