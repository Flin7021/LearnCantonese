const express = require('express');
const router = express.Router();
const Flashcard = require('../db/models/Flashcard');

// GET all flashcards
router.get('/', async (req, res) => {
  try {
    const flashcards = await Flashcard.findAll();
    res.json(flashcards);
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    res.status(500).json({ error: 'Failed to fetch flashcards' });
  }
});

module.exports = router;
