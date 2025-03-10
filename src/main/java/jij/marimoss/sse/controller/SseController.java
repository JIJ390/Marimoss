package jij.marimoss.sse.controller;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import jij.marimoss.sse.service.SseService;
import lombok.extern.slf4j.Slf4j;


//@Controller + @ResponseBody / 해당 클래스 내에 모든 메서드는 비동기 통신용
// 응답 본문에 값 그대로 반환
@RestController
@Slf4j
public class SseController {
	
	// 아래 emitters 필드에서 final 예약어를 사용하고 있어 
	// @RequiredArgsConstructor 사용 불가
	@Autowired
	private SseService service; 
	
	// SseEmitter : 서버로부터 메시지를 전달 받을
	//              클라이언트 정보를 저장한 객체
	//              == 연결된 클라이언트
	
	// ConcurrentHashMap : 멀티스레드 환경에서 동기화를 보장하는 Map
	//                     (한번에 요청이 있어도 차례대로 처리 => 안정성 보장)
	private final Map<String, SseEmitter> emitters
		= new ConcurrentHashMap<>();

}
