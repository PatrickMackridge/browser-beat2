# Browser Based Beats and Bass

Welcome to the GitHub repo of Browser Beats! In this project I've used the Tone.js Library to create not one, but two fully functioning musical sequencers that you can play straight from your internet browser!

The hosted app can be found here: https://patrickmackridge.github.io/browser-beats/

Or clone and run the repo locally using the instructions below

To use, just click the checkboxes found on the instruments to program the notes you want, press play then sit back and enjoy the music!

## Detailed Descriptions

There are 3 parts to this app, comprising of a synthesizer, drum machine and a number of global controls.

1. The Data Bass - A single oscillator monophonic bass synth with built in sequencer. The synth can be set to produce six notes from either the major or minor pentatonic scale of any natural key (A-G, no sharps or flats) with a range of one octave. It features a waveform selector that lets you choose from a sine, triangle, sawtooth or square wave. There is also a low-pass filter with cutoff frequency and resonance controls, an instrument gain control as well as a clear button that deletes the current pattern. In the future I plan to allow users to select alternative scales & keys for the instrument to play.

2. Browser Beat - A sample based drum machine and sequencer. The sampled kit, from bottom of the sequencer to top, is comprised of a kick drum, snare drum, clap, closed hi-hat, open hi-hat and, of course, a cowbell. The samples are taken from a range of classic drum machines, and I plan to add a choice of sampled kits in the near future. Browser Beat also features a gain control and a wet/dry control for its inbuilt reverb, as well as a clear button that deletes the current pattern.

3. Global Controller - Used to control various aspects of both instruments. It features Play and Stop buttons to start/stop pattern playback, tempo and swing controls for the project, a global hi-pass filter and a master volume. It also has a Clear All button that deletes the current pattern for both instruments.

The CSS styling of the synthesizers is based on two classic synth/sequencers of the past - I'll leave it to you to see if you can tell which ones!

## Running This Project Locally

If you want to run this repo locally on your machine:

1. Clone the project to your local device by using the command `git clone https://github.com/PatrickMackridge/browser-beats` in your terminal

2. Once you have entered the project directory use `npm install` in the terminal to install all necessary dependencies.

3. Launch the site locally using the terminal command `npm start`

Get making music!
