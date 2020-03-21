import * as Tone from "tone";

// BASS
const bassRows = document.body.querySelectorAll(".seqRowBass");
const waveSelect = document.body.querySelector(".waveSelect");
let waveType = waveSelect.options[waveSelect.selectedIndex].value;
const bassVol = document.body.querySelector(".bassVol");
const bassFilterFreq = document.body.querySelector(".bassFilterFreq");
const bassFilterRes = document.body.querySelector(".bassFilterRes");

document.documentElement.addEventListener("mousedown", () => {
  if (Tone.context.state !== "running") {
    Tone.context.resume().then(() => {
      console.log("Audio ready");
    });
  }
});

const dataBass = new Tone.Synth(waveType);
dataBass.envelope.release = 0.4;
dataBass.oscillator.type = waveType;
const bassFilter = new Tone.Filter(1000, "lowpass", -24);
const bassGain = new Tone.Gain(0.5);

bassGain.toDestination();
bassFilter.connect(bassGain);
dataBass.connect(bassFilter);

const bassNotes = ["A2", "G2", "E2", "D2", "C2", "A1"];

let bassIndex = 0;

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

// DRUMS
const drumRows = document.body.querySelectorAll(".seqRowDrums");
const drumVol = document.body.querySelector(".drumVol");
// Reverb and/or delay to drums?
const browserBeat = new Tone.Sampler(
  {
    C1: "kick.mp3",
    D1: "snare.wav",
    "D#1": "clap.mp3",
    "F#1": "closed_hat.mp3",
    "A#1": "open_hat.wav",
    C2: "cowbell.wav"
  },
  () => {
    console.log("Drums loaded");
    browserBeat.triggerAttackRelease("C1", "4n");
    browserBeat.triggerAttackRelease("D1", "4n");
    browserBeat.triggerAttackRelease("D#1", "4n");
    browserBeat.triggerAttackRelease("F#1", "4n");
    browserBeat.triggerAttackRelease("A#1", "4n");
    browserBeat.triggerAttackRelease("C2", "4n");
  },
  "drum_samples/"
);

const drumGain = new Tone.Gain(0.5);

drumGain.toDestination();
browserBeat.connect(drumGain);

const drumNotes = ["C2", "A#1", "F#1", "D#1", "D1", "C1"];

let drumIndex = 0;

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

// GLOBAL
const playAll = document.querySelector(".playAll");
const stopAll = document.querySelector(".stopAll");
const masterVol = document.body.querySelector(".masterVol");
const tempo = document.body.querySelector(".tempo");
const swing = document.body.querySelector(".swing");
// Global hipass (and/or lowpass/ bandpass?) filter?
// Global pattern reset
function runAll(time) {
  runBassSeq(time);
  runDrumSeq(time);
}

Tone.Transport.scheduleRepeat(runAll, "16n");

playAll.addEventListener("click", () => {
  bassIndex = 0;
  drumIndex = 0;
  Tone.Transport.start();
});

stopAll.addEventListener("click", () => {
  Tone.Transport.stop();
});

tempo.addEventListener("mousemove", () => {
  Tone.Transport.bpm.value = tempo.value;
});

swing.addEventListener("mousemove", () => {
  Tone.Transport.swingSubdivision = "16n";
  Tone.Transport.swing = swing.value / 100;
});
