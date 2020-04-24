import * as Tone from "tone";
import { clearPattern } from "./utils";
import { electroKit } from "./kits";
import "./style.css";

const drumRows = document.body.querySelectorAll(".seqRowDrums");
const drumVol = document.body.querySelector(".drumVol");
const verbMix = document.body.querySelector(".reverb");
const clearDrums = document.body.querySelector(".clear-drums");

const browserBeat = electroKit;

const drumGain = new Tone.Gain(0.5);
const drumVerb = new Tone.Reverb();
drumVerb.wet.value = 0;

browserBeat.connect(drumGain);
drumGain.connect(drumVerb);

const drumNotes = ["C2", "A#1", "F#1", "D#1", "D1", "C1"];

let drumIndex = 0;

function resetDrums() {
  drumIndex = 0;
}

function runDrumSeq(time) {
  let drumStep = drumIndex % 16;
  for (let i = 0; i < drumRows.length; i++) {
    let row = drumRows[i];
    let note = drumNotes[i];
    let input = row.querySelectorAll("input")[drumStep];
    if (input.checked) {
      browserBeat.triggerAttackRelease(note, "4n", time);
    }
  }
  drumIndex++;
}

drumVol.addEventListener("mousemove", () => {
  drumGain.gain.value = drumVol.value / 100;
});

verbMix.addEventListener("mousemove", () => {
  drumVerb.wet.value = verbMix.value / 100;
});

clearDrums.addEventListener("click", () => {
  clearPattern(drumRows);
});

export { resetDrums, runDrumSeq, drumVerb, drumRows };
