import * as Tone from "tone";
import { clearPattern } from "./utils";
import { resetBass, runBassSeq, bassGain, bassRows } from "./bass.js";
import { resetDrums, runDrumSeq, drumVerb, drumRows } from "./drums.js";
import "./style.css";

document.documentElement.addEventListener("mousedown", () => {
  if (Tone.context.state !== "running") {
    Tone.context.resume().then(() => {
      console.log("Audio ready");
    });
  }
});

const playAll = document.querySelector(".playAll");
const stopAll = document.querySelector(".stopAll");
const masterVol = document.body.querySelector(".masterVol");
const tempo = document.body.querySelector(".tempo");
const swing = document.body.querySelector(".swing");
const hiPassFreq = document.body.querySelector(".hi-pass-freq");
const clearAll = document.body.querySelector(".clear-all");

const hiPass = new Tone.Filter(0, "highpass", -12);
const masterGain = new Tone.Gain(0.5);

bassGain.connect(hiPass);
drumVerb.connect(hiPass);
hiPass.connect(masterGain);
masterGain.toDestination();

function runAll(time) {
  runBassSeq(time);
  runDrumSeq(time);
}

Tone.Transport.scheduleRepeat(runAll, "16n");

let isPlaying = false;

const stopSeq = () => {
  Tone.Transport.stop();
  playAll.textContent = "Play";
  isPlaying = false;
}

const playPause = () => {
  if (!isPlaying) {
    Tone.Transport.start();
    isPlaying = true;
    playAll.textContent = "Pause";
  } else {
    stopSeq();
  }
}

playAll.addEventListener("click", playPause);
document.addEventListener('keyup', (event) => {
  if (event.code === "Space") {
    playPause();
  }
})

stopAll.addEventListener("click", () => {
  stopSeq();
  resetBass();
  resetDrums();
});

tempo.addEventListener("mousemove", () => {
  Tone.Transport.bpm.value = tempo.value;
});

swing.addEventListener("mousemove", () => {
  Tone.Transport.swingSubdivision = "16n";
  Tone.Transport.swing = swing.value / 100;
});

hiPassFreq.addEventListener("mousemove", (event) => {
  hiPass.frequency.value = event.target.value;
});

masterVol.addEventListener("mousemove", () => {
  masterGain.gain.value = masterVol.value / 100;
});

clearAll.addEventListener("click", () => {
  clearPattern(bassRows);
  clearPattern(drumRows);
});
