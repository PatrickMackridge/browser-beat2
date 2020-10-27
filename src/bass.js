import * as Tone from "tone";
import { clearPattern } from "./utils";
import "./style.css";

const bassRows = document.body.querySelectorAll(".seqRowBass");
const waveSelect = document.body.querySelector(".waveSelect");
let waveType = waveSelect.options[waveSelect.selectedIndex].value;
const keySelect = document.body.querySelector(".keySelect");
let keyValue = keySelect.options[keySelect.selectedIndex].value;
const scaleSelect = document.body.querySelector(".scaleSelect")
let scaleValue = scaleSelect.options[scaleSelect.selectedIndex].value;

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

const noteRef = { minor: {A : ["A2", "G2", "E2", "D2", "C2", "A1"], B: ["B2", "A2", "F#2", "E2", "D2", "B1"], C:["C3", "A#2", "G2", "F2", "D#2", "C2"], D:["D3", "C3", "A2", "G2", "F2", "D2"], E:["E3", "D3", "B2", "A2", "G2", "E2"], F:["F3", "D#3", "C3", "A#2", "G#2", "F2"], G:["G3", "F3", "D3", "C3", "A#2", "G2"]}, major: {A : ["A2", "F#2", "E2", "C#2", "B1", "A1"], B: ["B2", "G#2", "F#2", "D#2", "C#2", "B1"], C:["C3", "A2", "G2", "E2", "D2", "C2"], D:["D3", "B2", "A2", "F#2", "E2", "D2"], E:["E3", "C#3", "B2", "G#2", "F#2", "E2"], F:["F3", "D3", "C3", "A2", "G2", "F2"], G:["G3", "E3", "D3", "B2", "A2", "G2"]} };

let bassNotes = noteRef.minor.A;

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

keySelect.addEventListener("change", () => {
  keyValue = keySelect.options[keySelect.selectedIndex].value;
  bassNotes = noteRef[scaleValue][keyValue];
});

scaleSelect.addEventListener("change", () => {
  scaleValue = scaleSelect.options[scaleSelect.selectedIndex].value;
  bassNotes = noteRef[scaleValue][keyValue];
});

export { resetBass, runBassSeq, bassGain, bassRows };
