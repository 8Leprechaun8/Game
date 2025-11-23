package org.game.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/game")
public class HeroController {

    @PostMapping("/up")
    public void moveUp() {
        //
    }

    @PostMapping("/down")
    public void moveDown() {
        //
    }

    @PostMapping("/left")
    public void moveLeft() {
        //
    }

    @PostMapping("/Right")
    public void moveRight() {
        //
    }

    @PostMapping("/space")
    public void moveSpace() {
        //
    }
}
