const express = require("express");
const router = express.Router();
const cardsServiceModel = require("../../model/cardsService/cardsService");
const normalizeCard = require("../../model/cardsService/helpers/normalizationCardService");
const cardsValidationService = require("../../validation/cardsValidationService");
const permissionsMiddleware = require("../../middleware/permissionsMiddlewareCard");
const authmw = require("../../middleware/authMiddleware");
const { idUserValidation } = require("../../validation/authValidationService");

// get all cards, all
//http://localhost:8181/api/cards
router.get("/", async (req, res) => {
  try {
    const allCards = await cardsServiceModel.getAllCards();
    res.json(allCards);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get all cards, all
//http://localhost:8181/api/cards/my-cards
router.get("/my-cards", authmw, async (req, res) => {
  try {
    const myCards = await cardsServiceModel.getCardByUserId(req.userData._id);
    res.json(myCards);
  } catch (err) {
    res.status(400).json(err);
  }
});

// all card,
//http://localhost:8181/api/cards/:id
router.get("/:id", authmw, async (req, res) => {
  try {
    await idUserValidation(req.params.id);
    const cardFromDB = await cardsServiceModel.getCardById(req.params.id);
    res.json(cardFromDB);
  } catch (err) {
    res.status(400).json(err);
  }
});

// biz only, create card
//http://localhost:8181/api/cards
router.post("/", authmw, async (req, res) => {
  try {
     await cardsValidationService.createCardValidation(req.body);
   
    let normalCard = await normalizeCard(req.body, req.userData._id);
    const dataFromMongoose = await cardsServiceModel.createCard(normalCard);
    res.json({ msg: "The card has been successfully received" });
  } catch (err) {
    res.status(400).json(err);
  }
});

//edit
//http://localhost:8181/api/cards/:id
router.put(
  "/:id",
  authmw,
  permissionsMiddleware(false, false, true),
  async (req, res) => {
    try {
      await idUserValidation(req.params.id);
      await cardsValidationService.createCardValidation(req.body);
      let normalCard = await normalizeCard(req.body, req.userData._id);
      const cardFromDB = await cardsServiceModel.getCardById(req.params.id);
      if (req.body.bizNumber !== cardFromDB.bizNumber) {
        return res.status(400).json({ message: "Cannot update bizNumber" });
      }
      delete req.body.bizNumber;
      const updatedCard = await cardsServiceModel.updateCard(
        req.params.id,
        normalCard
      );
      res.json(updatedCard);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

//http://localhost:8181/api/cards/like/:id
router.patch("/like/:id", authmw, async (req, res) => {
  try {
    await idUserValidation(req.params.id);
    const cardId = req.params.id;
    let cardLike = await cardsServiceModel.getCardById(cardId);
    if (cardLike.likes.find((userId) => userId == req.userData._id)) {
      const cardFiltered = cardLike.likes.filter(
        (userId) => userId != req.userData._id
      );
      cardLike.likes = cardFiltered;
      cardLike = await cardLike.save();
      res.json({ msg: "The card has been added to the favorites list." });
    } else {
      cardLike.likes = [...cardLike.likes, req.userData._id];
      cardLike = await cardLike.save();
      res.json({ msg: "The card has been removed from the favorites list." });
    }
    res.json(cardLike);
  } catch (err) {
    console.log("Could not edit like:", err.message);
    res.status(500).json(err);
  }
});

// delete,admin or biz owner
//http://localhost:8181/api/cards/:id
router.delete(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, true),
  async (req, res) => {
    try {
      await idUserValidation(req.params.id);
      const cardFromDB = await cardsServiceModel.deleteCard(req.params.id);
      if (cardFromDB) {
        res.json({ msg: "card deleted" });
      } else {
        res.json({ msg: "could not find the card" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;
