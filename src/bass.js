import * as Tone from "tone";
import { clearPattern } from "./utils";
import "./style.css";

const bassRows = document.body.querySelectorAll(".seqRowBass");
const waveSelect = document.body.querySelector(".waveSelect");
let waveType = waveSelect.options[waveSelect.selectedIndex].value;
const bassVol = document.body.querySelector(".bassVol");
const bassFilterFreq = document.body.querySelector(".bassFilterFreq");
const bassFilterRes = document.body.querySelector(".bassFilterRes");
const clearBass = document.body.querySelector(".clear-bass");

const dataBass = new Tone.Synth(waveType);
dataBass.envelope.release = 0.4;
dataBass.oscillator.type = waveType;
const bassFilter = new Tone.Filter(1000, "lowpass", -24);
const bassGain = new Tone.Gain(0.5);

dataBass.connect(bassFilter);
bassFilter.connect(bassGain);

const bassNotes = ["A2", "G2", "E2", "D2", "C2", "A1"];

let bassIndex = 0;

function resetBass() {
  bassIndex = 0;
}

function runBassSeq(time) {
  let step = bassIndex % 16;
  for (let i = 0; i < bassRows.length; i++) {
    let row = bassRows[i];
    let note = bassNotes[i];
    let input = row.querySelectorAll("input")[step];
    if (input.checked) {
      dataBass.triggerAttackRelease(note, "16n", time);
    }
  }
  bassIndex++;
}

clearBass.addEventListener("click", () => {
  clearPattern(bassRows);
});

waveSelect.addEventListener("change", () => {
  waveType = waveSelect.options[waveSelect.selectedIndex].value;
  dataBass.oscillator.type = waveType;
});

bassVol.addEventListener("mousemove", () => {
  bassGain.gain.value = bassVol.value / 100;
});

bassFilterFreq.addEventListener("mousemove", () => {
  bassFilter.frequency.value = bassFilterFreq.value;
});

bassFilterRes.addEventListener("mousemove", () => {
  bassFilter.Q.value = bassFilterRes.value / 10;
});

// Export runBassSeq
export { resetBass, runBassSeq, bassGain, bassRows };
