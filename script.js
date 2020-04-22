import * as Tone from "tone";

// BASS
const bassRows = document.body.querySelectorAll(".seqRowBass");
const waveSelect = document.body.querySelector(".waveSelect");
let waveType = waveSelect.options[waveSelect.selectedIndex].value;
const bassVol = document.body.querySelector(".bassVol");
const bassFilterFreq = document.body.querySelector(".bassFilterFreq");
const bassFilterRes = document.body.querySelector(".bassFilterRes");
const clearBass = document.body.querySelector(".clear-bass");

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

dataBass.connect(bassFilter);
bassFilter.connect(bassGain);

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

// DRUMS
const drumRows = document.body.querySelectorAll(".seqRowDrums");
const drumVol = document.body.querySelector(".drumVol");
const verbMix = document.body.querySelector(".reverb");
const clearDrums = document.body.querySelector(".clear-drums");

const browserBeat = new Tone.Sampler(
  {
    C1: "kick.mp3",
    D1: "snare.wav",
    "D#1": "clap.mp3",
    "F#1": "closed_hat.mp3",
    "A#1": "E808_OH-06.wav",
    C2: "cowbell.wav",
  },
  () => {
    console.log("Drums loaded");
  },
  "drum_samples/"
);

const drumGain = new Tone.Gain(0.5);
const drumVerb = new Tone.Reverb();
drumVerb.wet.value = 0;

browserBeat.connect(drumGain);
drumGain.connect(drumVerb);

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

verbMix.addEventListener("mousemove", () => {
  drumVerb.wet.value = verbMix.value / 100;
  console.log(verbMix.value / 100);
});

clearDrums.addEventListener("click", () => {
  clearPattern(drumRows);
});

// GLOBAL
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

const clearPattern = (sequencerRows) => {
  sequencerRows.forEach((row) => {
    const rowInputs = row.querySelectorAll("input");
    for (let i = 0; i < rowInputs.length; i++) {
      const input = rowInputs[i];
      if (input.checked) {
        input.checked = false;
      }
    }
  });
};
