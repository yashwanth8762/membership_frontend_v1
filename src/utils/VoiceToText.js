import React, { useState, useEffect, useRef } from "react";

const VoiceToText = ({ appendText, language }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =  window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(
        "Speech Recognition is not supported in this browser. Please use Chrome or Edge."
      );
      return;
    }

    if (window.location.protocol !== "https:" && window.location.hostname !== "localhost") {
      alert("Speech Recognition requires HTTPS. Please serve the site over HTTPS.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = language;

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        appendText(finalTranscript);
      }
    };
    console.log('recognition',recognition);
    

    recognition.onend = () => {
      setListening(false);
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error: ", event.error);
      if (event.error === "not-allowed") {
        alert(
          "Microphone access denied. Please allow microphone access in your browser settings."
        );
      } else {
        switch (event.error) {
          case "no-speech":
            alert("No speech detected. Please try again.");
            break;
          case "audio-capture":
            alert("Microphone not found. Please check your microphone settings.");
            break;
          case "aborted":
            alert("Speech recognition aborted.");
            break;
          default:
            alert(`Error occurred in speech recognition: ${event.error}`);
        }
      }
      setListening(false);
    };
    recognitionRef.current = recognition;

    // Cleanup when component unmounts
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language, appendText]);

  const handleListen = () => {
    // Request microphone access
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        const recognition = recognitionRef.current;
        if (recognition) {
          if (listening) {
            recognition.stop();
            setListening(false);
          } else {
            recognition.start();
            setListening(true);
          }
        }
      })
      .catch((error) => {
        console.error("Microphone permission error:", error);
        if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
          alert(
            "Microphone access denied. Please allow microphone access in your browser settings and reload the page."
          );
        } else {
          alert(
            "An error occurred while trying to access the microphone: " +
              error.message
          );
        }
      });
  };

  return (
    <div className="ms-2 mt-4">
      <button
        onClick={handleListen}
        disabled={!recognitionRef.current}
        className={`btn btn-sm ${listening ? "listening-btn btn-danger" : "btn-primary"}`}
      >
        {listening ? "Stop Listening" : "Start Listening"}
      </button>
    </div>
  );
};

export default VoiceToText;
