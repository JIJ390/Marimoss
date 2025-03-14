package jij.marimoss.sse.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jij.marimoss.sse.dto.Notification;
import jij.marimoss.sse.mapper.SseMapper;
import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class SseServiceImpl implements SseService{

	private final SseMapper mapper;
	
	
	
	
	// 알림 삽입 후 알림 받을 회원 번호 + 알림 개수 반환
	@Override
	public Map<String, Object> insertNotification(Notification notification) {
		
		// 매개 변수 notification에 저장된 값
    // -> type, url, content, pkNo, sendMemberNo
		
		// 결과 저장용 맵
		Map<String, Object> map = null;
		
		// 알림 삽입
		int result = mapper.insertNotification(notification);
		
		if (result > 0) { // 알림 삽입 성공 시
			// 알림을 받아야 하는 회원의 번호 + 안읽은 알람 개수 조회
			map = mapper.selectReceiveMember(notification.getNotificationNo());
			
		}
		
		return map;
	}
	
}
