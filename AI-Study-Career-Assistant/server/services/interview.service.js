const AIService = require("./ai.service");

const InterviewService = {

  // ===========================
  // START INTERVIEW
  // ===========================
  async startInterview({
    resumeText,
    company = "Google",
    interviewType = "Technical",
    difficulty = "Medium"
  }) {

    const prompt = `
You are a Senior ${company} interviewer.

Interview Type:
${interviewType}

Difficulty:
${difficulty}

Candidate Resume:
${resumeText.substring(0,4000)}

Rules:

1. Read the resume carefully.
2. Ask ONLY ONE interview question.
3. Question should be based on candidate's projects and skills.
4. Don't give answer.
5. Return ONLY JSON.

Format:

{
 "question":"...",
 "expectedTopic":"...",
 "difficulty":"${difficulty}"
}
`;

    const response = await AIService.askAI(
      prompt,
      `You are an experienced ${company} interviewer.`
    );

    const json = response.match(/\{[\s\S]*\}/);

    if (!json)
      throw new Error("Invalid AI Response");

    return JSON.parse(json[0]);

  },

  // ===========================
  // EVALUATE ANSWER
  // ===========================
  async evaluateAnswer({
    resumeText,
    previousQuestion,
    answer,
    company = "Google",
    interviewType = "Technical",
    difficulty = "Medium"
  }) {

    const prompt = `
You are a ${company} interviewer.

Resume:
${resumeText.substring(0,3000)}

Question:

${previousQuestion}

Candidate Answer:

${answer}

Evaluate the answer.

Then generate NEXT interview question.

Return ONLY JSON.

{
 "score":8,
 "feedback":"...",
 "strength":"...",
 "improvement":"...",
 "nextQuestion":"..."
}
`;

    const response = await AIService.askAI(
      prompt,
      "Professional Interview Evaluator"
    );

    const json = response.match(/\{[\s\S]*\}/);

    if (!json)
      throw new Error("Invalid AI Response");

    return JSON.parse(json[0]);

  },

  // ===========================
  // FINAL REPORT
  // ===========================
  async generateReport(history) {

    const prompt = `
You are an interview evaluation system.

Interview History:

${JSON.stringify(history)}

Generate final report.

Return ONLY JSON.

{
 "overallScore":85,
 "technical":82,
 "communication":90,
 "confidence":84,
 "problemSolving":80,
 "strengths":[
   "...",
   "..."
 ],
 "weaknesses":[
   "...",
   "..."
 ],
 "recommendations":[
   "...",
   "..."
 ],
 "verdict":"Interview Ready"
}
`;

    const response = await AIService.askAI(
      prompt,
      "Interview Report Generator"
    );

    const json = response.match(/\{[\s\S]*\}/);

    if (!json)
      throw new Error("Invalid AI Response");

    return JSON.parse(json[0]);

  }

};

module.exports = InterviewService;