// App.js
import { useState } from "react";
import { Experience } from "./components/Experience";
import { VoiceRecognition } from "./components/VoiceRecognition";
import { ClipLoader } from "react-spinners";
import * as Progress from "@radix-ui/react-progress";

function App() {
  const [command, setCommand] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  console.log(progress, 'oridd')
  return (
    <>
      {!isLoaded && (
        <div style={{ color: "black", fontSize: "20px", textAlign: "center", marginTop: "20%" }}>
          <ClipLoader color="#3498db" loading={!isLoaded} size={50} />
          <div style={{ marginTop: "20px" }}>Loading...</div>
        </div>
      )}

      <Experience command={command} setIsLoaded={setIsLoaded} setProgress={setProgress} />

      {isLoaded && (
        <VoiceRecognition setCommand={setCommand}>
          <Experience command={command} setIsLoaded={setIsLoaded} setProgress={setProgress} />
        </VoiceRecognition>
      )}
    </>
  );
}

export default App;
