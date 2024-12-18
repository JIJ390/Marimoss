package jij.marimoss.common.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import jij.marimoss.common.filter.AutoLoginFilter;
import jij.marimoss.member.service.MemberService;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class FilterConfig {
	
	@Value("${jwt.secret}") 
	private String jwtSecretKey; 
	
	private final MemberService service;
	
	@Bean
	public FilterRegistrationBean<AutoLoginFilter> autoLoginFilter() {
		
		FilterRegistrationBean<AutoLoginFilter> filter = 
				new FilterRegistrationBean<>();
		
		// 동작할 코드가 doFilter() 메서드에 작성된 
		// 필터 객체(SignUpFilter) 생성
		AutoLoginFilter autoLoginFilter = new AutoLoginFilter(jwtSecretKey, service);
		
		filter.setFilter(autoLoginFilter); // 필터 등록
		
		// 필터가 동작할 요청 경로 패턴 지정
		String[] filteringUrl = {"/"};
		
		filter.setUrlPatterns(Arrays.asList(filteringUrl));
		
		// 필터 이름 지정
		filter.setName("autoLoginFilter");
		
		// 필터 순서 지정
		filter.setOrder(1);
		
		return filter;
	}

}
