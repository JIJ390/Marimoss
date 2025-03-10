package jij.marimoss.sse.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jij.marimoss.sse.mapper.SseMapper;
import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class SseServiceImpl implements SseService{

	private final SseMapper mapper;
}
