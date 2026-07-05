const express = require("express");
const router = express.Router();
const InterviewService = require("../services/interview.service");

// =========================
// START INTERVIEW
// =========================
router.post("/start", async (req, res) => {
  try {
    const {
      resumeText,
      company,
      interviewType,
      difficulty
    } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Resume is required."
      });
    }

    const data = await InterviewService.startInterview({
      resumeText,
      company,
      interviewType,
      difficulty
    });

    res.json({
      success: true,
      data
    });

  } catch (err) {
    console.error("Interview Start Error:", err.message);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// =========================
// SUBMIT ANSWER
// =========================
router.post("/answer", async (req, res) => {
  try {

    const {
      resumeText,
      previousQuestion,
      answer,
      company,
      interviewType,
      difficulty
    } = req.body;

    const data = await InterviewService.evaluateAnswer({
      resumeText,
      previousQuestion,
      answer,
      company,
      interviewType,
      difficulty
    });

    res.json({
      success: true,
      data
    });

  } catch (err) {

    console.error("Answer Error:", err.message);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

// =========================
// FINAL REPORT
// =========================
router.post("/report", async (req, res) => {

  try {

    const { history } = req.body;

    const report = await InterviewService.generateReport(history);

    res.json({
      success: true,
      data: report
    });

  } catch (err) {

    console.error("Report Error:", err.message);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});

module.exports = router;