package org.game.controller;

import org.game.dto.ActionData;
import org.game.dto.GameStructure;
import org.game.feignclient.LabirinthClient;
import org.game.kafka.producer.KafkaProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game")
public class GameRestController {

    @Autowired
    private LabirinthClient labirinthClient;

    @Autowired
    private KafkaProducer kafkaProducer;

    @PostMapping
    public GameStructure generateGame(@RequestHeader("Authorization") String token) {
        System.out.println(token);
        GameStructure gameStructure = labirinthClient.generateGameStructure(token);
        return gameStructure;
    }

    @GetMapping(value = "/battle")
    public GameStructure getGame(@RequestHeader("Authorization") String token) {
        System.out.println(token);
        GameStructure gameStructure = labirinthClient.getGameStructureRest(token);
        return gameStructure;
    }

    @PostMapping(value = "/action")
    public void sendAction(@RequestHeader("Authorization") String token, @RequestBody ActionData data) {
        data.setUsername(token);
        kafkaProducer.sendMessage("actions", data);
    }

}
