// backend/routes/api/spot-images.js
const express = require('express');
const { SpotImage, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// Delete a spot image
router.delete('/:imageId', requireAuth, async (req, res) => {
  const { imageId } = req.params;
  const userId = req.user.id;

  try {
    const spotImage = await SpotImage.findByPk(imageId);

    if (!spotImage) {
      return res.status(404).json({ message: "Spot Image couldn't be found" });
    }

    const spot = await Spot.findByPk(spotImage.spotId);

    if (spot.ownerId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await spotImage.destroy();
    return res.status(200).json({ message: 'Successfully deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
