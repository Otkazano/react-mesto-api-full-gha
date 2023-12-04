import { Router } from 'express';
import {
  createCard,
  deleteCard,
  dislikeCard,
  getCards,
  likeCard,
} from '../controllers/cards.js';
import cardInfoValidate from '../middlewares/cardInfoValidate.js';
import cardIDValidate from '../middlewares/cardIDValidate.js';

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', cardInfoValidate, createCard);
cardRouter.delete('/:cardId', cardIDValidate, deleteCard);
cardRouter.put('/:cardId/likes', cardIDValidate, likeCard);
cardRouter.delete('/:cardId/likes', cardIDValidate, dislikeCard);

export default cardRouter;
