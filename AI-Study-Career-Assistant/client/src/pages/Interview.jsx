import React, { useState, useEffect, useRef } from "react";
import API from "../services/api";
import VoiceRecorder from "../components/VoiceRecorder";
import { speak } from "../utils/speak";

import {
  Play,
  Loader2,
  Clock3,
  Trophy,
  Bot,
  Volume2
} from "lucide-react";

export default function Interview() {

    const [company, setCompany] = useState("Google");
    const [type, setType] = useState("Technical");
    const [difficulty, setDifficulty] = useState("Medium");

    const [loading, setLoading] = useState(false);
    const [evaluating, setEvaluating] = useState(false);

    const [question, setQuestion] = useState("");
    const [questionNo, setQuestionNo] = useState(1);

    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(null);

    const [history, setHistory] = useState([]);
    const [report, setReport] = useState(null);

    const [interviewStarted, setInterviewStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [aiSpeaking, setAiSpeaking] = useState(false);

    const [timeLeft, setTimeLeft] = useState(1800); // 30 min

    const [resumeText, setResumeText] = useState(() => {
        const stored = localStorage.getItem("resumeText");
        console.log("Loaded resumeText:", stored);
        return stored || "";
    });

    const mountedRef = useRef(true);

    useEffect(() => {
      mountedRef.current = true;
      return () => {
        mountedRef.current = false;
        window.speechSynthesis.cancel();
      };
    }, []);

    const startInterview = async () => {

    const storedResume = localStorage.getItem("resumeText");
    console.log("Resume at start:", storedResume);

    if (!storedResume) {
        return alert("Please upload and analyze a resume first.");
    }

    try {

        setLoading(true);

        const res = await API.post("/api/interview/start", {
        resumeText: storedResume,
        company,
        interviewType: type,
        difficulty
        });

        setQuestion(res.data.data.question);
        setQuestionNo(1);
        setInterviewStarted(true);
        setCompleted(false);
        setHistory([]);
        setReport(null);
        setAnswer("");
        setFeedback("");
        setScore(null);

    } catch (err) {

        console.log(err);

        alert("Unable to start interview");

    } finally {

        setLoading(false);

    }

    };

    useEffect(() => {

    if (!interviewStarted) return;

    const timer = setInterval(() => {

        setTimeLeft(prev => {

        if (prev <= 1) {
            clearInterval(timer);
            return 0;
        }

        return prev - 1;

        });

    }, 1000);

    return () => clearInterval(timer);

    }, [interviewStarted]);

    const formatTime = (sec) => {

    const min = Math.floor(sec / 60);

    const seconds = sec % 60;

    return `${min}:${seconds.toString().padStart(2, "0")}`;

    };

    const submitAnswer = async () => {

    if (!answer.trim()) {
        return alert("Please answer first.");
    }

    let apiData = null;

    try {

        setEvaluating(true);
        window.speechSynthesis.cancel();

        const res = await API.post("/api/interview/answer", {

        resumeText: localStorage.getItem("resumeText") || "",

        previousQuestion: question,

        answer,

        company,

        interviewType: type,

        difficulty

        });

        apiData = res.data.data;

        setScore(apiData.score);
        setFeedback(apiData.feedback);

        const updatedHistory = [
        ...history,
        {
            question,
            answer,
            score: apiData.score,
            feedback: apiData.feedback
        }
        ];

        setHistory(updatedHistory);

        if (questionNo >= 10) {

        const reportRes = await API.post("/api/interview/report", {
            history: updatedHistory
        });

        setReport(reportRes.data.data);
        setCompleted(true);
        setInterviewStarted(false);

        return;
        }

    } catch (err) {

        console.log(err);

        alert("Unable to evaluate answer.");

    } finally {

        setEvaluating(false);

    }

    if (!mountedRef.current || !apiData || questionNo >= 10) return;

    setAiSpeaking(true);

    await speak(apiData.feedback);

    if (!mountedRef.current) return;

    await new Promise(r => setTimeout(r, 1500));

    if (!mountedRef.current) return;

    await speak("Let's move to the next question.");

    if (!mountedRef.current) return;

    setQuestion(apiData.nextQuestion);
    setQuestionNo(prev => prev + 1);
    setAnswer("");
    setScore(null);
    setFeedback("");

    };

        useEffect(() => {

        if (!question) return;

        setAiSpeaking(true);
        window.speechSynthesis.cancel();

        speak(question).then(() => {
          if (mountedRef.current) setAiSpeaking(false);
        });

        const timer = setTimeout(() => {
            if (mountedRef.current) setAiSpeaking(false);
        }, 30000);

        return () => {
          clearTimeout(timer);
          window.speechSynthesis.cancel();
        };

        }, [question]);

        const handleReplayQuestion = () => {
          window.speechSynthesis.cancel();
          setAiSpeaking(true);
          speak(question).then(() => {
            if (mountedRef.current) setAiSpeaking(false);
          });
        };

        return (
  <div className="min-h-screen bg-slate-100 py-10 px-6">
    <div className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-2xl p-10">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

        <div className="flex items-center gap-5">

          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
            <Bot size={36}/>
          </div>

          <div>

            <h1 className="text-4xl font-black text-slate-800">
              AI Mock Interview
            </h1>

            <p className="text-slate-500 mt-1">
              {company} • {type} Interview
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3 bg-red-50 border border-red-100 px-6 py-4 rounded-2xl">

          <Clock3 className="text-red-500"/>

          <div>

            <p className="text-xs text-slate-500 font-bold uppercase">
              Time Left
            </p>

            <p className="text-xl font-black text-red-600">
              {formatTime(timeLeft)}
            </p>

          </div>

        </div>

      </div>

      {/* AI Feedback */}

      {score !== null && (

        <div className="mb-8 rounded-3xl border border-green-200 bg-green-50 p-6">

          <div className="flex justify-between items-center">

            <h2 className="font-black text-xl text-green-700">
              AI Feedback
            </h2>

            <span className="bg-green-600 text-white px-4 py-2 rounded-full font-bold">
              {score}/10
            </span>

          </div>

          <p className="mt-4 leading-8 text-slate-700">
            {feedback}
          </p>

        </div>

      )}

      {/* Setup */}

      {!interviewStarted && !completed && (

        <div className="grid md:grid-cols-3 gap-6">

          <div>

            <label className="font-bold text-sm mb-2 block">
              Company
            </label>

            <select
              value={company}
              onChange={(e)=>setCompany(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-200"
            >

              <option>Google</option>
              <option>Amazon</option>
              <option>Microsoft</option>
              <option>Meta</option>
              <option>Apple</option>
              <option>TCS</option>
              <option>Infosys</option>
              <option>Accenture</option>

            </select>

          </div>

          <div>

            <label className="font-bold text-sm mb-2 block">
              Interview Type
            </label>

            <select
              value={type}
              onChange={(e)=>setType(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-200"
            >

              <option>Technical</option>
              <option>HR</option>
              <option>Mixed</option>

            </select>

          </div>

          <div>

            <label className="font-bold text-sm mb-2 block">
              Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(e)=>setDifficulty(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-200"
            >

              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>

            </select>

          </div>

        </div>

      )}

      {!interviewStarted && !completed && (

        <button
          onClick={startInterview}
          disabled={loading}
          className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-lg flex justify-center items-center gap-3"
        >

          {loading ? (

            <Loader2 className="animate-spin"/>

          ) : (

            <>
              <Play/>
              Start Interview
            </>

          )}

        </button>

      )}

      {/* ================= Interview Running ================= */}

      {interviewStarted && !completed && (

        <>

          {/* Progress */}

          <div className="mt-10">

            <div className="flex justify-between mb-3">

              <span className="font-bold text-slate-700">
                Question {questionNo} / 10
              </span>

              <span className="font-bold text-blue-600">
                {questionNo * 10}%
              </span>

            </div>

            <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">

              <div

                style={{
                  width: `${questionNo * 10}%`
                }}

                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-700"

              />

            </div>

          </div>

          {/* AI Avatar */}

          <div className="mt-10 rounded-[2rem] border border-slate-200 p-8 bg-slate-50">

            <div className="flex items-center gap-5">

              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-500 ${
                  aiSpeaking
                    ? "bg-green-500 animate-pulse"
                    : "bg-blue-600"
                }`}
              >

                <Bot size={36}/>

              </div>

              <div>

                <h2 className="text-2xl font-black">
                  AI Interviewer
                </h2>

                <p className="text-slate-500 mt-1">

                  {aiSpeaking
                    ? "🎙 Asking your next interview question..."
                    : "🎧 Waiting for your answer..."}

                </p>

              </div>

            </div>

          </div>

          {/* Question */}

          {question && (

            <div className="mt-8 bg-white border border-slate-200 rounded-[2rem] p-8 shadow">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-sm font-bold uppercase text-blue-600">
                    Current Question
                  </p>

                  <h2 className="text-2xl font-black mt-2">
                    Question {questionNo}
                  </h2>

                </div>

                <button

                  onClick={handleReplayQuestion}

                  className="bg-blue-100 hover:bg-blue-200 p-4 rounded-2xl transition"

                >

                  <Volume2 />

                </button>

              </div>

              <p className="mt-8 leading-9 text-lg text-slate-700">

                {question}

              </p>

            </div>

          )}

          {/* Status */}

          <div className="flex justify-center mt-8">

            <div

              className={`px-6 py-3 rounded-full font-bold ${
                aiSpeaking
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}

            >

              {aiSpeaking
                ? "🤖 AI Speaking..."
                : "🎤 Listening..."}

            </div>

          </div>

          {/* Voice Recorder */}

          {!aiSpeaking && question && (

            <div className="mt-10">

              <VoiceRecorder
                onTranscript={setAnswer}
              />

            </div>

          )}

          {/* Live Transcript */}

          {question && (

            <div className="mt-8 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">

              <h3 className="text-lg font-black flex items-center gap-2">

                🎤 Live Transcript

              </h3>

              <div className="mt-5 min-h-[120px] rounded-2xl bg-slate-50 p-5 border">

                {answer ? (

                  <p className="leading-8 whitespace-pre-wrap text-slate-700">

                    {answer}

                  </p>

                ) : (

                  <p className="text-slate-400">

                    Your spoken answer will appear here...

                  </p>

                )}

              </div>

            </div>

          )}

          {/* Submit */}

          {question && (

            <button

              onClick={submitAnswer}

              disabled={
                evaluating ||
                aiSpeaking ||
                !answer.trim()
              }

              className="mt-8 w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-black text-lg transition"

            >

              {evaluating ? (

                <div className="flex justify-center items-center gap-3">

                  <Loader2 className="animate-spin"/>

                  Evaluating Answer...

                </div>

              ) : (

                "Submit Answer"

              )}

            </button>

          )}

        </>

      )}

      {/* Interview Finished */}

      {completed && report && (

        <div className="mt-12 rounded-[2rem] bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-12 text-center shadow-2xl">

          <Trophy
            size={70}
            className="mx-auto mb-6 text-yellow-300"
          />

          <h2 className="text-4xl font-black">

            Interview Completed 🎉

          </h2>

          <p className="mt-4 opacity-90 text-lg">

            Great job! Your interview has been evaluated by AI.

          </p>

        </div>

      )}

    </div>
  </div>
);
}
