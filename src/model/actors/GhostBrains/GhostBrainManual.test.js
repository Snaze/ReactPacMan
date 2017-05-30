import Level from "../../Level";
import Ghost from "../Ghost";
import Player from "../Player";
import GhostBrainManual from "./GhostBrainManual";
import Direction from "../../../utils/Direction";


it ("_canGhostSeePlayer works", () => {
    // SETUP
    let level = new Level(2, 2);
    let player = new Player(level, Player.MR_PAC_MAN);
    player.location.set(0, 0);
    player.direction = Direction.RIGHT;

    let ghost = new Ghost(level, Ghost.RED, player);
    ghost.location.set(1, 0);
    ghost.direction = Direction.LEFT;

    let gbm = new GhostBrainManual();

    // CALL
    let result = gbm._canGhostSeePlayer(ghost, player, level);

    // ASSERT
    expect(result).toBe(true);
});

it ("_canGhostSeePlayer works (not seeing - diff row)", () => {
    // SETUP
    let level = new Level(2, 2);
    let player = new Player(level, Player.MR_PAC_MAN);
    player.location.set(0, 1);
    player.direction = Direction.RIGHT;

    let ghost = new Ghost(level, Ghost.RED, player);
    ghost.location.set(1, 0);
    ghost.direction = Direction.LEFT;

    let gbm = new GhostBrainManual();

    // CALL
    let result = gbm._canGhostSeePlayer(ghost, player, level);

    // ASSERT
    expect(result).toBe(false);
});

it ("_canGhostSeePlayer works (same col - can see)", () => {
    // SETUP
    let level = new Level(2, 2);
    let player = new Player(level, Player.MR_PAC_MAN);
    player.location.set(0, 0);
    player.direction = Direction.DOWN;

    let ghost = new Ghost(level, Ghost.RED, player);
    ghost.location.set(0, 1);
    ghost.direction = Direction.UP;

    let gbm = new GhostBrainManual();

    // CALL
    let result = gbm._canGhostSeePlayer(ghost, player, level);

    // ASSERT
    expect(result).toBe(true);
});

it ("_canGhostSeePlayer works (same col - wrong direction)", () => {
    // SETUP
    let level = new Level(2, 2);
    let player = new Player(level, Player.MR_PAC_MAN);
    player.location.set(0, 0);
    player.direction = Direction.DOWN;

    let ghost = new Ghost(level, Ghost.RED, player);
    ghost.location.set(0, 1);
    ghost.direction = Direction.DOWN;

    let gbm = new GhostBrainManual();

    // CALL
    let result = gbm._canGhostSeePlayer(ghost, player, level);

    // ASSERT
    expect(result).toBe(false);
});

it ("_canGhostSeePlayer works (same col - can see)", () => {
    // SETUP
    let level = new Level(2, 2);
    let player = new Player(level, Player.MR_PAC_MAN);
    player.location.set(1, 0);
    player.direction = Direction.DOWN;

    let ghost = new Ghost(level, Ghost.RED, player);
    ghost.location.set(0, 1);
    ghost.direction = Direction.UP;

    let gbm = new GhostBrainManual();

    // CALL
    let result = gbm._canGhostSeePlayer(ghost, player, level);

    // ASSERT
    expect(result).toBe(false);
});