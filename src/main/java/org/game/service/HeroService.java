package org.game.service;

import org.game.dto.Movement;

public interface HeroService {

    void sendMovementToAuth(Movement movement);

    void sendMovementToLabirinth(Movement movement);
}
