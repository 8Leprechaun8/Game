package org.game.kafka.consumer;

import org.game.dto.Movement;
import org.game.kafka.producer.KafkaProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaHandler;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@KafkaListener(id = "multiGroup", topics = {"movement-to-game", "game-structure-to-game"})
public class KafkaConsumer {

    @Autowired
    public KafkaProducer kafkaProducer;

    @KafkaHandler
    void movementFromAuthListener(Movement movement) {
        kafkaProducer.sendMessage("movement-to-labirinth", movement);
    }
}
