package org.game.service.impl;

import org.game.dto.Movement;
import org.game.kafka.producer.KafkaProducer;
import org.game.service.HeroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HeroServiceImpl implements HeroService {

    @Autowired
    private KafkaProducer kafkaProducer;

    @Override
    public void sendMovementToAuth(Movement movement) {
        kafkaProducer.sendMessage("movement-to-auth", movement);
    }

    @Override
    public void sendMovementToLabirinth(Movement movement) {
        kafkaProducer.sendMessage("movement-to-labirinth", movement);
    }
}
