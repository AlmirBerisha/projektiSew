const express = require("express");
const router = express.Router();
const Perdorues = require("../models/perdoruesSchema");
const Shpallja = require("../models/shpalljaSchema");

router.get("/:id", async (req, res) => {
  try {
    const perdoruesi = await Perdorues.findById(req.params.id);

    if (!perdoruesi) {
      return res.status(404).json({
        success: false,
        message: "Perdoruesi nuk u gjet",
      });
    }

    return res.status(200).json({
      success: true,
      data: perdoruesi,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Gabim i brendshem",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const perdoruesi = await Perdorues.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    // const shpallja = await Shpallja.findByIdAndUpdate(
    //   req.params.id,
    //   { $set: { emailKompanise: perdoruesi.email } },
    //   {
    //     new: true,
    //     runValidators: true,
    //   },
    // );

    res.status(200).json({
      success: true,
      message: "U modifikua me sukses",
      data: perdoruesi,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Gabim i brendshem i serverit",
    });
  }
});

module.exports = router;
