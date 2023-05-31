const express = require("express");
const router = express.Router();
const cardsServiceModel = require("../../model/cardsService/cardsService");
const normalizeCard = require("../../model/cardsService/helpers/normalizationCardService");
const cardsValidationService = require("../../validation/cardsValidationService");
const permissionsMiddleware = require("../../middleware/permissionsMiddlewareCard");
const authmw = require("../../middleware/authMiddleware");

// get all cards, all
http://localhost:8181/api/cards
router.get("/cards", async (req, res) => {
  try {
    const allCards = await cardsServiceModel.getAllCards();
    res.json(allCards);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get all cards, all
http://localhost:8181/api/cards/my-cards
router.get("/my-cards",authmw, permissionsMiddleware(false,true, true), async (req, res) => {
  try {
  const allCards = await cardsServiceModel.getAllCards();
  const myCard =allCards.filter((userId)=>userId = req.userData._id)
    res.json(myCard);
  } catch (err) {
    res.status(400).json(err);
  }
});

// biz only, create card
//localhost:8181/api/cards
router.post("/", authmw, async (req, res) => {
  try {
    await cardsValidationService.createCardValidation(req.body);
    let normalCard = await normalizeCard(req.body, req.userData._id);
    const dataFromMongoose = await cardsServiceModel.createCard(normalCard);
    console.log("dataFromMongoose", dataFromMongoose);
    res.json({ msg: "ok" });
  } catch (err) {
    res.status(400).json(err);
  }
});

// all
router.get("/:id", async (req, res) => {
  try {
    //! joi validation
    const cardFromDB = await cardsServiceModel.getCardById(req.params.id);
    res.json(cardFromDB);
  } catch (err) {
    res.status(400).json(err);
  }
});

// admin or biz owner
router.put("/:id", async (req, res) => {
  try {
    //! joi validation
    //! normalize
    const cardFromDB = await cardsServiceModel.updateCard(
      req.params.id,
      req.body
    );
    res.json(cardFromDB);
  } catch (err) {
    res.status(400).json(err);
  }
});

// admin or biz owner
router.delete(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, true),
  async (req, res) => {
    try {
      //! joi validation
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

//http://localhost:8181/api/cards/like/:id
router.patch("/like/:id",authmw,  async (req, res) => {
  try {
    //! joi validation
    const cardId = req.params.id; 
    let cardLike = await cardsServiceModel.getCardById(cardId);
    if(cardLike.likes.find((userId)=> userId == req.userData._id)) {
      const cardFiltered= cardLike.likes.filter((userId)=> userId != req.userData._id)
      cardLike.likes = cardFiltered;
      cardLike = await cardLike.save();
      // return res.send(card);
    }else{
      cardLike.likes = [...cardLike.likes,req.userData._id];
      cardLike = await cardLike.save();
      // return res.send(card);
    }
    res.json(cardLike);
  } catch (err) {
    console.log(chalk.redBright("Could not edit like:",err.message));
    res.status(500).json(err);
  }
});


module.exports = router;
