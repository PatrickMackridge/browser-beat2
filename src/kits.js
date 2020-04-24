import * as Tone from "tone";
import electroKick from "./assets/drum_samples/electro/kick.mp3";
import electroSnare from "./assets/drum_samples/electro/snare.wav";
import electroClap from "./assets/drum_samples/electro/clap.mp3";
import electroClosedHat from "./assets/drum_samples/electro/closed_hat.mp3";
import electroOpenHat from "./assets/drum_samples/electro/E808_OH-06.wav";
import electroCowbell from "./assets/drum_samples/electro/cowbell.wav";

const electroKit = new Tone.Sampler(
  {
    C1: electroKick,
    D1: electroSnare,
    "D#1": electroClap,
    "F#1": electroClosedHat,
    "A#1": electroOpenHat,
    C2: electroCowbell,
  },
  () => {
    console.log("Electro Kit loaded");
  }
);

export { electroKit };
