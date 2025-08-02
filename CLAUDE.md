# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web-based musical application for Palestrina's "Et incarnatus est" that provides SATB (Soprano, Alto, Tenor, Bass) voice parts with synchronized lyric display. The application uses the Web Audio API to synthesize notes and displays Latin lyrics in real-time.

## Architecture

The project consists of three main files:
- `index.html` - Single page application with styled UI for voice selection
- `script.js` - Audio synthesis engine and voice part data
- `README.md` - Basic project description in Portuguese

### Core Components

**Audio Engine (`script.js`)**
- Uses Web Audio API with oscillators and gain nodes for note synthesis
- Implements ADSR envelope (attack, sustain, release) with vibrato effect
- Each voice part is defined as an array of objects with `nMidi`, `duracao`, and `letra` properties
- Note durations are scaled by dividing by 6 to match tempo
- MIDI note 57 is used as the reference pitch (originally 69)

**Voice Parts Data Structure**
```javascript
const soprano = [
    { nMidi: 66, duracao: 8, letra: "Et" },
    // ... more notes
];
```

**Lyric Synchronization**
- Uses `setTimeout()` to display lyrics at precise timing intervals
- Lyrics update in the `#lyrics` div element during playback
- Silent notes (nMidi: 0) display "-" as placeholder

## Development Notes

- No build process required - open `index.html` directly in browser
- Audio context requires user interaction to start (handled by button clicks)
- The `playTodos()` function plays all four voice parts simultaneously
- Commented code shows previous implementation approach with paragraph elements per note

## Commit Guidelines

- No emojis in commit messages
- No co-author information in commits
- Keep commit messages simple and descriptive

## File Structure

- Main application files are in the root directory
- No package managers, frameworks, or build tools used
- Pure vanilla JavaScript with Web Audio API

