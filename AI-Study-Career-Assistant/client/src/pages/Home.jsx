import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  FileText,
  Sparkles,
  Briefcase,
  Moon,
  Sun,
  Menu,
  ArrowRight,
  Bot,
} from "lucide-react";
import {
  Github,
  Linkedin,
  Mail,
  ChevronUp,
  History,
  Code2,
  Database,
  Server,
  Cpu,
  Globe
} from "lucide-react";

const cards = [
  {
    title: "AI Summary",
    icon: FileText,
    color: "bg-blue-500",
    desc: "Summarize PDFs instantly"
  },
  {
    title: "Quiz Generator",
    icon: BrainCircuit,
    color: "bg-purple-500",
    desc: "Generate smart MCQs"
  },
  {
    title: "Resume ATS",
    icon: Briefcase,
    color: "bg-emerald-500",
    desc: "ATS score & feedback"
  },
  {
    title: "AI Career",
    icon: Bot,
    color: "bg-pink-500",
    desc: "Career roadmap"
  }
];

export default function Home() {
        return (

        <div className="min-h-screen bg-slate-50 overflow-hidden relative">

        {/* Background */}

        <div className="absolute w-[700px] h-[700px] bg-blue-300 rounded-full blur-[180px] opacity-20 -top-64 -left-64"/>

        <div className="absolute w-[600px] h-[600px] bg-indigo-400 rounded-full blur-[180px] opacity-20 -bottom-40 -right-40"/>

        {/* NAVBAR */}

        <nav className="max-w-7xl mx-auto flex justify-between items-center py-8 px-6 relative z-20">

        <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl">

        <BrainCircuit className="text-white"/>

        </div>

        <div>

        <h1 className="font-black text-2xl">

        Study<span className="text-blue-600">.AI</span>

        </h1>

        <p className="text-xs text-slate-500">

        AI Study Assistant

        </p>

        </div>

        </div>


        <div className="flex items-center gap-4">

        <Link
        to="/login"
        className="font-bold text-slate-700"
        >

        Login

        </Link>

        <Link
        to="/signup"
        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl text-white font-bold shadow-xl"
        >

        Get Started

        </Link>

        </div>

        </nav>

        {/* HERO */}

        <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}

        <motion.div

        initial={{opacity:0,x:-50}}

        animate={{opacity:1,x:0}}

        transition={{duration:.8}}

        >

        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold">

        <Sparkles size={18}/>

        AI Powered Learning Platform

        </div>

        <h1 className="text-6xl font-black mt-8 leading-tight text-slate-800">

        Learn

        <span className="text-blue-600">

        Smarter

        </span>

        <br/>

        Build Your

        <span className="text-indigo-600">

        Career

        </span>

        with AI

        </h1>

        <p className="mt-8 text-slate-500 leading-8 text-lg">

        Study.AI helps students summarize notes,
        generate quizzes,
        solve doubts,
        analyze resumes,
        and build personalized career roadmaps
        using Artificial Intelligence.

        </p>

        <div className="flex gap-5 mt-10">

        <Link
        to="/signup"
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-2xl font-bold flex gap-2 items-center shadow-xl"
        >

        Get Started

        <ArrowRight size={20}/>

        </Link>

        <Link
        to="/login"
        className="border-2 border-blue-600 px-8 py-4 rounded-2xl text-blue-600 font-bold hover:bg-blue-50"
        >

        Login

        </Link>

        </div>

        </motion.div>

        {/* RIGHT */}

        <div className="relative h-[500px]">

        {cards.map((card,index)=>{

        const Icon=card.icon;

        return(

        <motion.div

        key={index}

        initial={{
        opacity:0,
        y:80
        }}

        animate={{
        opacity:1,
        y:0
        }}

        transition={{
        delay:index*.2
        }}

        whileHover={{
        scale:1.05,
        rotate:1
        }}

        className={`absolute bg-white rounded-3xl shadow-2xl p-6 w-72 ${
        index===0?"top-0 left-0":
        index===1?"top-16 right-0":
        index===2?"bottom-16 left-10":
        "bottom-0 right-10"
        }`}

        >

        <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center text-white mb-5`}>

        <Icon/>

        </div>

        <h3 className="font-black text-xl">

        {card.title}

        </h3>

        <p className="text-slate-500 mt-2">

        {card.desc}

        </p>

        </motion.div>

        )

        })}

        </div>

        </section>

        {/* ===================== STATS ===================== */}

        <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {[
            {
                number:"100+",
                title:"PDFs Processed"
            },
            {
                number:"1000+",
                title:"MCQs Generated"
            },
            {
                number:"500+",
                title:"AI Career Analysis"
            },
            {
                number:"99%",
                title:"ATS Accuracy"
            }
            ].map((item,index)=>(
            <motion.div
            key={index}
            initial={{opacity:0,y:40}}
            whileInView={{opacity:1,y:0}}
            transition={{delay:index*.15}}
            viewport={{once:true}}
            className="bg-white rounded-3xl p-8 text-center shadow-xl hover:shadow-blue-100 transition"
            >

                <h2 className="text-5xl font-black text-blue-600">

                {item.number}

                </h2>

                <p className="mt-3 text-slate-500 font-semibold">

                {item.title}

                </p>

            </motion.div>
            ))}

        </div>

        </section>

        {/* ================= FEATURES ================= */}

        <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-16">

        <h2 className="text-5xl font-black">

        Everything You Need

        </h2>

        <p className="text-slate-500 mt-5 text-lg">

        One AI Platform for Learning &
        Career Growth.

        </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {[
        {
        icon:FileText,
        title:"AI PDF Summarizer",
        desc:"Upload lengthy PDFs and instantly generate clean professional summaries."
        },
        {
        icon:BrainCircuit,
        title:"Quiz Generator",
        desc:"Automatically create intelligent MCQs from your notes."
        },
        {
        icon:Bot,
        title:"AI Doubt Solver",
        desc:"Ask questions and receive AI-powered explanations."
        },
        {
        icon:Briefcase,
        title:"Resume Analyzer",
        desc:"ATS Score, Resume Feedback and Missing Skills."
        },
        {
        icon:Sparkles,
        title:"Career Roadmap",
        desc:"Generate a complete AI learning roadmap."
        },
        {
        icon:History,
        title:"Study History",
        desc:"Access every saved session anytime."
        }
        ].map((item,index)=>{

        const Icon=item.icon;

        return(

        <motion.div

        key={index}

        whileHover={{
        y:-10,
        scale:1.03
        }}

        initial={{
        opacity:0,
        y:40
        }}

        whileInView={{
        opacity:1,
        y:0
        }}

        viewport={{
        once:true
        }}

        transition={{
        delay:index*.15
        }}

        className="bg-white rounded-[2rem] p-8 shadow-xl hover:shadow-blue-100 border border-slate-100"

        >

        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">

        <Icon
        className="text-blue-600"
        size={28}
        />

        </div>

        <h3 className="text-2xl font-black">

        {item.title}

        </h3>

        <p className="text-slate-500 mt-4 leading-7">

        {item.desc}

        </p>

        </motion.div>

        )

        })}

        </div>

        </section>

        {/* ================= HOW IT WORKS ================= */}

        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-28">

        <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-center text-white text-5xl font-black">

        How It Works

        </h2>

        <p className="text-center text-blue-100 mt-5">

        Simple. Fast. Intelligent.

        </p>

        <div className="grid md:grid-cols-5 gap-8 mt-20">

        {[
        "Upload PDF",
        "AI Reads Notes",
        "Generate Summary",
        "Practice Quiz",
        "Career Ready"
        ].map((step,index)=>(

        <motion.div

        key={index}

        initial={{
        opacity:0,
        y:40
        }}

        whileInView={{
        opacity:1,
        y:0
        }}

        transition={{
        delay:index*.2
        }}

        viewport={{
        once:true
        }}

        className="text-center"

        >

        <div className="w-20 h-20 mx-auto rounded-full bg-white text-blue-600 flex items-center justify-center text-3xl font-black shadow-xl">

        {index+1}

        </div>

        <h3 className="mt-6 text-white font-bold">

        {step}

        </h3>

        </motion.div>

        ))}

        </div>

        </div>

        </section>

        {/* ================= TECH STACK ================= */}

        <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-16">

        <h2 className="text-5xl font-black">

        Built With Modern Technologies

        </h2>

        <p className="text-slate-500 mt-5 text-lg">

        Powerful technologies working together.

        </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        {[
        {icon:Code2,title:"React"},
        {icon:Server,title:"Node.js"},
        {icon:Database,title:"MongoDB"},
        {icon:Cpu,title:"Gemini AI"},
        {icon:Globe,title:"Express"},
        {icon:Sparkles,title:"Tailwind CSS"}
        ].map((tech,index)=>{

        const Icon=tech.icon;

        return(

        <motion.div

        key={index}

        whileHover={{
        y:-10,
        scale:1.05
        }}

        initial={{
        opacity:0,
        y:30
        }}

        whileInView={{
        opacity:1,
        y:0
        }}

        viewport={{
        once:true
        }}

        transition={{
        delay:index*.1
        }}

        className="bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100"

        >

        <div className="w-16 h-16 rounded-2xl bg-blue-100 mx-auto flex items-center justify-center">

        <Icon
        size={30}
        className="text-blue-600"
        />

        </div>

        <h3 className="mt-5 font-bold">

        {tech.title}

        </h3>

        </motion.div>

        )

        })}

        </div>

        </section>

        {/* ================= WHY ================= */}

        <section className="bg-slate-900 py-24">

        <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-center text-white text-5xl font-black">

        Why Choose Study.AI?

        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

        {[
        "⚡ Lightning Fast AI",
        "📄 Smart PDF Processing",
        "💬 Instant Doubt Solving",
        "📊 Resume ATS Analysis",
        "🧠 Personalized Roadmaps",
        "☁ Secure Cloud Storage",
        "📱 Fully Responsive",
        "🚀 Modern AI Experience"
        ].map((item,index)=>(

        <motion.div

        key={index}

        whileHover={{
        scale:1.05
        }}

        initial={{
        opacity:0
        }}

        whileInView={{
        opacity:1
        }}

        viewport={{
        once:true
        }}

        transition={{
        delay:index*.08
        }}

        className="bg-slate-800 rounded-3xl p-8 text-center text-white"

        >

        <h3 className="font-bold text-lg">

        {item}

        </h3>

        </motion.div>

        ))}

        </div>

        </div>

        </section>

        {/* ================= CTA ================= */}

        <section className="py-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">

        <div className="max-w-5xl mx-auto text-center px-6">

        <motion.h2

        initial={{opacity:0,y:30}}

        whileInView={{opacity:1,y:0}}

        viewport={{once:true}}

        className="text-5xl font-black text-white"

        >

        Ready to Transform Your Learning?

        </motion.h2>

        <p className="text-blue-100 mt-6 text-xl">

        Study smarter with AI-powered summaries, quizzes,
        career roadmaps and resume analysis.

        </p>

        <div className="flex justify-center gap-5 mt-10">

        <Link

        to="/signup"

        className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black hover:scale-105 transition"

        >

        Get Started

        </Link>

        <Link

        to="/login"

        className="border-2 border-white text-white px-8 py-4 rounded-2xl font-black hover:bg-white hover:text-blue-600 transition"

        >

        Login

        </Link>

        </div>

        </div>

        </section>

        {/* ================= FOOTER ================= */}

        <footer className="bg-slate-950 text-white py-16">

        <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-10">

        <div>

        <h2 className="text-3xl font-black">

        Study.AI

        </h2>

        <p className="text-slate-400 mt-4 leading-7">

        AI-powered Study & Career Assistant
        built using React, Node.js,
        MongoDB and Generative AI.

        </p>

        </div>

        <div>

        <h3 className="font-bold mb-5">

        Quick Links

        </h3>

        <div className="space-y-3 text-slate-400">

        <p>Home</p>

        <p>Features</p>

        <p>About</p>

        <p>Contact</p>

        </div>

        </div>

        <div>

        <h3 className="font-bold mb-5">

        Connect

        </h3>

        <div className="flex gap-5">

        <Github className="cursor-pointer hover:text-blue-500"/>

        <Linkedin className="cursor-pointer hover:text-blue-500"/>

        <Mail className="cursor-pointer hover:text-blue-500"/>

        </div>

        </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">

        © 2026 Study.AI — All Rights Reserved.

        </div>

        </div>

        </footer>

        <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-blue-600 text-white shadow-2xl flex items-center justify-center z-50"
        >
        <ChevronUp />
        </motion.button>
        
        </div>

        )
}
