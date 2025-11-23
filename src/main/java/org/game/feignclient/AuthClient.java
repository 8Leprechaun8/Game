package org.game.feignclient;

import jakarta.validation.Valid;
import org.game.dto.JwtAuthenticationResponseDto;
import org.game.dto.SignInRequestDto;
import org.game.dto.SignUpRequestDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(value = "auth", url = "http://localhost:8086")
public interface AuthClient {

    @PostMapping("/rest/auth/sign-up")
    ResponseEntity<JwtAuthenticationResponseDto> signUp(@Valid @RequestBody SignUpRequestDto request);

    @PostMapping("/rest/auth/sign-in")
    ResponseEntity<JwtAuthenticationResponseDto> signIn(@Valid @RequestBody SignInRequestDto request);
}
