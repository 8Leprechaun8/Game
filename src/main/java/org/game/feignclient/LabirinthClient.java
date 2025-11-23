package org.game.feignclient;

import org.game.dto.GameStructure;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(value = "labirinth", url = "http://localhost:8081")
public interface LabirinthClient {

    @GetMapping(value = "/labirinth")
    GameStructure getGameStructure(@RequestHeader("Authorization") String authToken);

    @PostMapping(value = "/labirinth")
    GameStructure generateGameStructure(@RequestHeader("Authorization") String authToken);

    @GetMapping(value = "/labirinth/battle")
    GameStructure getGameStructureRest(@RequestHeader("Authorization") String authToken);
}
