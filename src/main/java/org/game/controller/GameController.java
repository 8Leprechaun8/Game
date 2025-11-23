package org.game.controller;

import org.game.dto.GameStructure;
import org.game.dto.HeroDto;
import org.game.dto.JwtAuthenticationRequestDto;
import org.game.feignclient.LabirinthClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping("/game")
public class GameController {

    @Autowired
    private LabirinthClient labirinthClient;

    @RequestMapping(method = RequestMethod.GET)
    public String getGame(Model model,
                          @CookieValue(value = "jwtToken", defaultValue = "noValue") String token) {
        GameStructure gameStructure = labirinthClient.getGameStructure(token);
        List<List<Integer>> list = gameStructure.getStructure();
        List<HeroDto> enemies = gameStructure.getEnemies();
        HeroDto heroDto = gameStructure.getPlayer();
        model.addAttribute("battleField", list);
        model.addAttribute("enemies", enemies);
        model.addAttribute("heroDto", heroDto);
        return "game";
    }
}
