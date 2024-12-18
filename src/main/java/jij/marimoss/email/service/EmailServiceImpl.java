package jij.marimoss.email.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import jakarta.mail.internet.MimeMessage;
import jij.marimoss.common.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService{

	private final JavaMailSender mailSender; 
	private final RedisUtil redisUtil; 
	private final SpringTemplateEngine templateEngine;

	
	
	@Override
	public int sendAuthKey(String string, String email) {
		
		try {
			
			String emailTitle = null; // 발송되는 이메일 제목
			String authKey    = createAuthKey(); // 생성된 인증 번호
			
			log.debug("authKey : {}", authKey);
			log.debug("authKey : {}", authKey);
			log.debug("authKey : {}", authKey);
			
			/*----- 메일 발송 ------*/
			
			// MimeMessage : 메일 발송 객체
			MimeMessage mimeMessage = mailSender.createMimeMessage();
			
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
			
			String htmlName = "signUp";
			
			emailTitle = "marimoss 이메일 인증 번호가 발급되었습니다";
			
			helper.setTo(email); // 받는 사람 이메일 세팅
			helper.setSubject(emailTitle); // 이메일 제목 세팅
			helper.setText(loadHtml(authKey, htmlName), true); // 이메일 내용 세팅(본래 내부에 html 형식으로 작성)
			
			// CID(Content-ID) 를 이용해 메일에 이미지 첨부, "logo" 라는 이름으로 다루게 됨
//			helper.addInline("logo", new ClassPathResource("static/images/logo.jpg"));
			
			// 메일 발송하기
			mailSender.send(mimeMessage);
			
			// Redis 에 이메일, 인증번호 저장(5 분 후 만료)
			redisUtil.setValue(email, authKey, 60 * 5);
			
		} catch(Exception e) {
			e.printStackTrace();
			return 0;	// 예외 발생 == 실패 => 0 반환
		}
		
		return 1;	// 예외 발생 X == 성공 => 1 반환
	}
	
	
	
	
	/** 인증번호 생성 (영어 대문자 + 소문자 + 숫자 6자리)
   * @return authKey
   */
  public String createAuthKey() {
  	
  	String key = "";
  	
    for(int i=0 ; i< 6 ; i++) {
        
      int sel1 = (int)(Math.random() * 3); // 0:숫자 / 1,2:영어
      
      if(sel1 == 0) {
        
        int num = (int)(Math.random() * 10); // 0~9
        key += num;
          
      }else {
        
        char ch = (char)(Math.random() * 26 + 65); // A~Z
        
        int sel2 = (int)(Math.random() * 2); // 0:소문자 / 1:대문자
        
        if(sel2 == 0) {
            ch = (char)(ch + ('a' - 'A')); // 대문자로 변경
        }
        
        key += ch;
      }
    }
    
    return key;
  }
	
  
  
  
	// HTML 파일을 읽어와 String으로 변환 (타임리프 적용)
	public String loadHtml(String authKey, String htmlName) {
		
		// org.tyhmeleaf.Context 선택!!
		Context context = new Context();
		
		//타임리프가 적용된 HTML에서 사용할 값 추가
		context.setVariable("authKey", authKey);
		
		// templates/email 폴더에서 htmlName과 같은 
		// .html 파일 내용을 읽어와 String으로 변환
		return templateEngine.process("email/" + htmlName, context);
		
	}
}
