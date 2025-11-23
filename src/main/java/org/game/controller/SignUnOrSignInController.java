package org.game.controller;

import org.game.dto.SignUpRequestDto;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping("/auth")
public class SignUnOrSignInController {

    @RequestMapping(method = RequestMethod.GET)
    public String getSignUpOrSignIn(Model model) {
        return "sign-up-or-sign-in";
    }

    @RequestMapping(value = "/sign-up", method = RequestMethod.GET)
    public String getSignUp(Model model) {
        return "sign-up";
    }

    @RequestMapping(value = "/sign-in", method = RequestMethod.GET)
    public String getSignIn(Model model) {
        return "sign-in";
    }
}
