import React, { useEffect, useRef, useState } from "react";
import { Mic, Square } from "lucide-react";

export default function VoiceRecorder({ onTranscript }) {

  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {

      let transcript = "";

      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      onTranscript(transcript);

    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };

  }, []);

  const startRecording = () => {

    recognitionRef.current.start();

    setListening(true);

  };

  const stopRecording = () => {

    recognitionRef.current.stop();

    setListening(false);

  };

  return (

<div className="flex justify-center mt-8">

{

!listening ?

<button

onClick={startRecording}

className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl flex gap-2 items-center"

>

<Mic/>

Start Speaking

</button>

:

<button

onClick={stopRecording}

className="bg-black text-white px-8 py-4 rounded-2xl flex gap-2 items-center"

>

<Square/>

Stop

</button>

}

</div>

  );

}