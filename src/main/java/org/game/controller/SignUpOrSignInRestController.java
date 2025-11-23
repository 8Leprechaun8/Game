package org.game.controller;

import org.game.dto.JwtAuthenticationResponseDto;
import org.game.dto.SignInRequestDto;
import org.game.dto.SignUpRequestDto;
import org.game.feignclient.AuthClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class SignUpOrSignInRestController {

    @Autowired
    private AuthClient authClient;

    @PostMapping(value = "/sign-up-game")
    public ResponseEntity<JwtAuthenticationResponseDto> getSignUpToGame(Model model, @RequestBody SignUpRequestDto dto) {
        return authClient.signUp(dto);
    }

    @PostMapping(value = "/sign-in-game")
    public ResponseEntity<JwtAuthenticationResponseDto> getSignInToGame(Model model, @RequestBody SignInRequestDto dto) {
        return authClient.signIn(dto);
    }
}
