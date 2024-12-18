package jij.marimoss.common.filter;

import java.io.IOException;
import java.security.Key;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jij.marimoss.member.dto.Member;
import jij.marimoss.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

//자동 로그인 필터
@Slf4j
@RequiredArgsConstructor
@SessionAttributes({"loginMember"})
public class AutoLoginFilter implements Filter {
	
	// 여기서 value 써서 가져오면 안댐 bean 객체가 아니기 때문
	// 상위에서 bean으로 등록 후 매개 변수로 받기!!
  private final String jwtSecretKey;
	
	private final MemberService service;


	// 쿠키 확인하여 토큰 존재 확인 -> 자동 로그인 세션 부여
	/**
	 * 
	 */
	@Override
	public void doFilter(
			ServletRequest request, 
			ServletResponse response, 
			FilterChain chain)
			throws IOException, ServletException {

		// 쿠키 꺼내려면 HttpServletRequest 사용해야함
		HttpServletRequest req = (HttpServletRequest)request;
		HttpServletResponse resp = (HttpServletResponse)response;
		
    Cookie[] cookies = req.getCookies();
    String token = null;
    
    // 2. 쿠키 배열에서 JWT 토큰이 담긴 쿠키(authToken)를 검색
    if (cookies != null) {
        for (Cookie cookie : cookies) {
            if ("authToken".equals(cookie.getName())) {
                token = cookie.getValue();
                break;
            }
        }
    }    
    
    //토큰 존재시
    if (token != null) {
      try {
		  			//Keys.hmacShaKeyFor는 Base64로 인코딩된 키를 처리
		  			//키를 적절히 인코딩/디코딩해야 함
		  			Key key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecretKey));
      	
	        Claims claims = Jwts
	            .parserBuilder()
	            .setSigningKey(key)
	            .build()
	            .parseClaimsJws(token)
	            .getBody();
		  			
	        
          // 4. 토큰에서 사용자 정보를 읽어서 요청에 추가
          // 예: 사용자 이름을 요청 속성에 저장 (필요에 따라 SecurityContext에 추가 가능)
//          request.setAttribute("username", claims.getSubject());
	        
	        
	        String memberEmail = claims.getSubject();
          
	        Member loginMember = service.autoLogin(memberEmail);
	        
	    			// 세션 객체 얻어오기
	    			HttpSession session = req.getSession();
	    			
	    			// 세션에 정보 담기
	    			session.setAttribute("loginMember", loginMember);
	        
	        //유효기간이 만료되었을 때 발생하는 예외
	      } catch (ExpiredJwtException e) {
	          // 토큰이 만료된 경우
	      			// 401 상태 부여 : 클라이언트가 요청한 리소스에 접근하려면 인증이 필요함을 나타냄
	      			resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	      			System.out.println("토큰이 만료되었습니다.");
	          
	      } catch (Exception e) {
	          // 토큰이 잘못된 경우
	      			resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	      			System.out.println("유효하지 않은 토큰입니다.");
	      }
	  		}

    chain.doFilter(request, response); 
	}
}
