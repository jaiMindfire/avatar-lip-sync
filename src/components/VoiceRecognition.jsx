import { Mic } from "lucide-react";
import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Modal from "react-modal";

export function VoiceRecognition({ setCommand, children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const { transcript, listening, resetTranscript } = useSpeechRecognition("");

  const [timeoutId, setTimeoutId] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setValue(transcript);
    setModalIsOpen(false);
    resetTranscript();
    clearTimeout(timeoutId);
  };

  useEffect(() => {
    if (!listening) {
      setValue(transcript);
     setTimeout(()=>{
      handleCommand(transcript);
     },400) // Call handleCommand with the transcript after speech ends

      const timeout = setTimeout(() => {
        setModalIsOpen(false);
        console.log(transcript);
      }, 1000);

      setTimeoutId(timeout);
    }
  }, [listening, transcript]); // Add transcript to dependencies to ensure it’s passed correctly

  const startSpeechRecognition = () => {
    SpeechRecognition.startListening();
  };

  const handleCommand = (command) => {
    const commandLower = command.toLowerCase();
    if (commandLower.includes("jump")) {
      setCommand("jump");
    } else if (commandLower.includes("walk")) {
      setCommand("walk");
    } else if (commandLower.includes("welcome")) {
      setCommand("welcome");
    } else {
      setCommand("idle");
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
    },
  };

  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          position: "absolute",
          top: "0",
          zIndex: "12",
          left: "0%",
          background: "#181c20",
          color: "#fefefe",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div>Voice Command</div>
        <div>Speak "Welcome" or "Walk" or "Jump" to give command</div>
        <div>Use mouse to move the Avatar</div>
        <button
          onClick={() => {
            openModal();
            startSpeechRecognition();
          }}
          className="mic-button"
        >
          <Mic className="mic-icon" />
        </button>
        {value ? <div>Command: {value}</div> : null}
      </div>
      {children}
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <div className="modal-title">Command</div>
        <div className="center">
          <div className="circle">
            <Mic />
          </div>
        </div>
        <div className="subtitle">Try Saying Something</div>
        <p className="transcript">{transcript}</p>
      </Modal>
    </div>
  );
}
