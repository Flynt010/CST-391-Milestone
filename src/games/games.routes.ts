import { Router } from 'express';
import * as GamesController from './games.controller';

const router = Router();

router
    .route('/games')
    .get(GamesController.readAllGames)
    .post(GamesController.createGame);

router
    .route('/games/:gameId')
    .get(GamesController.readGameById)
    .put(GamesController.updateGame)
    .delete(GamesController.deleteGame);

export default router;