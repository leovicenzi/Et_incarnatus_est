let audioCtx;
let currentNoteMarkers = [];

const chromaticNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function initializeSpiralDiagram() {
    const svg = document.getElementById('chromatic-spiral');
    const centerX = 300;
    const centerY = 300;
    const baseRadius = 120;
    const spiralSpacing = 35;
    
    // Clear existing content
    svg.innerHTML = '';
    
    // Draw chromatic note labels outside the circle
    chromaticNotes.forEach((note, index) => {
        const angle = (index * 30 - 90) * Math.PI / 180; // Start at top (12 o'clock)
        const labelRadius = baseRadius + 80; // Adjusted for optimized spiral
        const x = centerX + Math.cos(angle) * labelRadius;
        const y = centerY + Math.sin(angle) * labelRadius;
        
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', x);
        label.setAttribute('y', y);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('dominant-baseline', 'middle');
        label.setAttribute('fill', '#333');
        label.setAttribute('font-size', '16');
        label.setAttribute('font-weight', 'bold');
        label.textContent = note;
        svg.appendChild(label);
    });
    
    // Draw spiral path for reference (light gray)
    const spiralPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let pathData = '';
    
    for (let midi = 45; midi <= 71; midi++) {
        const pos = getMidiPosition(midi, centerX, centerY, baseRadius, spiralSpacing);
        if (midi === 45) {
            pathData += `M ${pos.x} ${pos.y}`;
        } else {
            pathData += ` L ${pos.x} ${pos.y}`;
        }
    }
    
    spiralPath.setAttribute('d', pathData);
    spiralPath.setAttribute('fill', 'none');
    spiralPath.setAttribute('stroke', '#eee');
    spiralPath.setAttribute('stroke-width', '2');
    svg.appendChild(spiralPath);
    
    // Add lyrics text in the center
    const lyricsText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    lyricsText.setAttribute('x', centerX);
    lyricsText.setAttribute('y', centerY);
    lyricsText.setAttribute('text-anchor', 'middle');
    lyricsText.setAttribute('dominant-baseline', 'middle');
    lyricsText.setAttribute('fill', '#333');
    lyricsText.setAttribute('font-size', '24');
    lyricsText.setAttribute('font-weight', 'bold');
    lyricsText.setAttribute('id', 'spiral-lyrics');
    lyricsText.textContent = '';
    svg.appendChild(lyricsText);
    
    // Draw note positions with MIDI numbers
    for (let midi = 45; midi <= 71; midi++) {
        const pos = getMidiPosition(midi, centerX, centerY, baseRadius, spiralSpacing);
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pos.x);
        circle.setAttribute('cy', pos.y);
        circle.setAttribute('r', '12');
        circle.setAttribute('fill', '#f0f0f0');
        circle.setAttribute('stroke', '#333');
        circle.setAttribute('stroke-width', '1');
        circle.setAttribute('data-midi', midi);
        circle.setAttribute('class', 'note-dot');
        svg.appendChild(circle);
        
        // Add MIDI number text inside the circle
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', pos.x);
        text.setAttribute('y', pos.y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', '#333');
        text.setAttribute('font-size', '10');
        text.setAttribute('font-weight', 'bold');
        text.textContent = midi;
        svg.appendChild(text);
    }
}

function getMidiPosition(midiNote, centerX, centerY, baseRadius, spiralSpacing) {
    const chromaticPosition = midiNote % 12;
    
    // Calculate radius based on MIDI note directly (not octave from 60)
    // MIDI 60 (C4) is at base radius, each semitone adds spiralSpacing/12
    const radius = baseRadius + ((midiNote - 60) * spiralSpacing / 12);
    
    // Angle: 0 degrees at top (C), clockwise
    const angle = (chromaticPosition * 30 - 90) * Math.PI / 180;
    
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    
    return { x, y };
}


function addNoteHighlight(midiNote) {
    if (midiNote === 0) return; // Skip rest notes
    
    const svg = document.getElementById('chromatic-spiral');
    const centerX = 300;
    const centerY = 300;
    const baseRadius = 120;
    const spiralSpacing = 35;
    
    const pos = getMidiPosition(midiNote, centerX, centerY, baseRadius, spiralSpacing);
    
    // Create highlight circle
    const highlight = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    highlight.setAttribute('cx', pos.x);
    highlight.setAttribute('cy', pos.y);
    highlight.setAttribute('r', '8');
    highlight.setAttribute('fill', 'none');
    highlight.setAttribute('stroke', '#ff4444');
    highlight.setAttribute('stroke-width', '3');
    highlight.setAttribute('class', 'current-note-highlight');
    highlight.setAttribute('data-midi', midiNote);
    
    svg.appendChild(highlight);
    currentNoteMarkers.push(highlight);
}

function removeNoteHighlight(midiNote) {
    if (midiNote === 0) return; // Skip rest notes
    
    // Find and remove highlight for this specific MIDI note
    currentNoteMarkers = currentNoteMarkers.filter(marker => {
        if (marker.getAttribute('data-midi') == midiNote) {
            marker.remove();
            return false;
        }
        return true;
    });
}

function clearAllHighlights() {
    currentNoteMarkers.forEach(marker => marker.remove());
    currentNoteMarkers = [];
}

// Initialize diagram when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeSpiralDiagram();
});

function play(delay, midiNumber, duration, letra) {

    const startTime = audioCtx.currentTime + delay
    const endTime = startTime + duration

    const gainNode = audioCtx.createGain();
    const oscillator = audioCtx.createOscillator();
    const vibrato = audioCtx.createOscillator();
  
    vibrato.frequency.value = 7;
    vibrato.start();
    vibrato.connect(oscillator.frequency);
    gainNode.gain.setValueAtTime(0.001, startTime);
  
    const attackTime = 0.2;
    const sustainLevel = 0.8;
    const releaseTime = 0.1;
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackTime);
    gainNode.gain.linearRampToValueAtTime(sustainLevel, endTime - releaseTime);
    gainNode.gain.linearRampToValueAtTime(0, endTime);
  
    oscillator.detune.value = (midiNumber - 57) * 100 //original: 69
    oscillator.connect(gainNode).connect(audioCtx.destination);
  
    oscillator.start(startTime);
    oscillator.stop(endTime);
    
    setTimeout(() => {
        addNoteHighlight(midiNumber);
    }, delay * 1000);
    
    setTimeout(() => {
        removeNoteHighlight(midiNumber);
    }, (delay + duration) * 1000);
}

const soprano = [
    { nMidi: 66, duracao: 8, letra: "Et" },
    { nMidi: 66, duracao: 4, letra: "in" },
    { nMidi: 66, duracao: 4, letra: "car" },
    { nMidi: 66, duracao: 8, letra: "na" },
    { nMidi: 69, duracao: 8, letra: "tus" },
    { nMidi: 69, duracao: 8, letra: "est" },
    { nMidi: 0, duracao: 4, letra: "-" },
    { nMidi: 69, duracao: 4, letra: "de" },
    { nMidi: 69, duracao: 8, letra: "Spi" },
    { nMidi: 69, duracao: 4, letra: "ri" },
    { nMidi: 69, duracao: 4, letra: "tu" },
    { nMidi: 71, duracao: 8, letra: "San" },
    { nMidi: 69, duracao: 8, letra: "cto" },
    { nMidi: 69, duracao: 6, letra: "ex" },
    { nMidi: 69, duracao: 2, letra: "Ma" },
    { nMidi: 67, duracao: 4, letra: "ri" },
    { nMidi: 66, duracao: 4, letra: "a" },
    { nMidi: 64, duracao: 4, letra: "Vir" },
    { nMidi: 63, duracao: 4, letra: "gi" },
    { nMidi: 64, duracao: 8, letra: "ne" },
    { nMidi: 64, duracao: 8, letra: "Et" },
    { nMidi: 64, duracao: 8, letra: "ho" },
    { nMidi: 64, duracao: 8, letra: "mo" },
    { nMidi: 66, duracao: 16, letra: "fa" },
    { nMidi: 64, duracao: 8, letra: "ctus" },
    { nMidi: 64, duracao: 16, letra: "est" },
  ];


//   function playSoprano() {
//     let delay = 0.1;
//     soprano.forEach((note, index) => {
//       play(delay, note.nMidi, note.duracao / 6);
//       delay += note.duracao / 6;
//       updateLyrics(index, note.letra); // update the lyrics at the current index
//     });
//   }
//   function updateLyrics(index, letra) {
//     const lyricsDiv = document.getElementById("lyrics");
//     lyricsDiv.children[index].textContent = letra; // update the content of the paragraph element at the current index
//   }
  
//   const playButtonS = document.getElementById("play-soprano");
//   playButtonS.addEventListener("click", () => {
//     const lyricsDiv = document.getElementById("lyrics");
//     lyricsDiv.innerHTML = ""; // clear any existing lyrics
//     soprano.forEach(() => {
//       const para = document.createElement("p"); // create a new paragraph element for each note
//       lyricsDiv.appendChild(para); // add the paragraph element to the lyrics div
//     });
//     audioCtx = new AudioContext();
//     playSoprano();
//   });

function playSoprano() {
    let delay = 0.1;
    soprano.map(note => {
      play(delay, note.nMidi, note.duracao / 6, note.letra);
      setTimeout(() => updateLyrics(note.letra), delay * 1000);
      delay += note.duracao / 6; // assumes that each duration is a multiple of 8th notes
    });
  }

function updateLyrics(letra) {
    document.getElementById("spiral-lyrics").textContent = letra;
}


const playButtonS = document.getElementById("play-soprano");
playButtonS.addEventListener("click", () => {
    audioCtx = new AudioContext();  
    playSoprano()
});

  
const alto = [
    { nMidi: 62, duracao: 8, letra: "Et" },
    { nMidi: 62, duracao: 4, letra: "in" },
    { nMidi: 62, duracao: 4, letra: "car" },
    { nMidi: 62, duracao: 8, letra: "na" },
    { nMidi: 64, duracao: 8, letra: "tus" },
    { nMidi: 66, duracao: 4, letra: "est" },
    { nMidi: 66, duracao: 4, letra: "de" },
    { nMidi: 66, duracao: 8, letra: "Spi" },
    { nMidi: 64, duracao: 4, letra: "ri" },
    { nMidi: 64, duracao: 4, letra: "tu" },
    { nMidi: 66, duracao: 8, letra: "San" },
    { nMidi: 62, duracao: 8, letra: "cto" },
    { nMidi: 66, duracao: 12, letra: "ex" },
    { nMidi: 64, duracao: 4, letra: "Ma" },
    { nMidi: 62, duracao: 4, letra: "ri" },
    { nMidi: 61, duracao: 4, letra: "a" },
    { nMidi: 59, duracao: 4, letra: "Vir" },
    { nMidi: 57, duracao: 4, letra: "gi" },
    { nMidi: 59, duracao: 8, letra: "ne" },
    { nMidi: 61, duracao: 8, letra: "Et" },
    { nMidi: 59, duracao: 8, letra: "ho" },
    { nMidi: 61, duracao: 8, letra: "mo" },
    { nMidi: 62, duracao: 12, letra: "fa" },
    { nMidi: 61, duracao: 4, letra: "fa" },
    { nMidi: 59, duracao: 8, letra: "ctus" },
    { nMidi: 61, duracao: 16, letra: "est" },
  ];

function playAlto() {
    let delay = 0.1;
    alto.map(note => {
      play(delay, note.nMidi, note.duracao / 6, note.letra);
      setTimeout(() => updateLyrics(note.letra), delay * 1000);
      delay += note.duracao / 6; // assumes that each duration is a multiple of 8th notes
    });
  }

const playButtonA = document.getElementById("play-alto");
playButtonA.addEventListener("click", () => {
    audioCtx = new AudioContext();  
    playAlto()
});

const tenor = [
    {nMidi: 57, duracao: 8, letra: "Et"},
    {nMidi: 57, duracao: 4, letra: "in"},
    {nMidi: 57, duracao: 4, letra: "car"},
    {nMidi: 59, duracao: 8, letra: "na"},
    {nMidi: 61, duracao: 8, letra: "tus"},
    {nMidi: 62, duracao: 4, letra: "est"},
    {nMidi: 57, duracao: 4, letra: "de"},
    {nMidi: 62, duracao: 8, letra: "Spi"},
    {nMidi: 61, duracao: 4, letra: "ri"},
    {nMidi: 61, duracao: 4, letra: "tu"},
    {nMidi: 62, duracao: 8, letra: "San"},
    {nMidi: 59, duracao: 8, letra: "cto"},
    {nMidi: 62, duracao: 12, letra: "ex"},
    
    {nMidi: 61, duracao: 4, letra: "Ma"},
    {nMidi: 59, duracao: 4, letra: "ri"},
    {nMidi: 57, duracao: 4, letra: "a"},
    {nMidi: 55, duracao: 4, letra: "Vir"},
    {nMidi: 54, duracao: 4, letra: "gi"},
    {nMidi: 52, duracao: 8, letra: "ne"},
    {nMidi: 0, duracao: 4, letra: "-"},
    {nMidi: 57, duracao: 6, letra: "Et"},
    {nMidi: 55, duracao: 1, letra: "ho"},
    {nMidi: 54, duracao: 1, letra: "ho"},
    {nMidi: 55, duracao: 4, letra: "ho"},
    {nMidi: 57, duracao: 8, letra: "mo"},
    {nMidi: 54, duracao: 4, letra: "fa"},
    {nMidi: 59, duracao: 8, letra: "fa"},
    {nMidi: 57, duracao: 8, letra: "fa"},
    {nMidi: 56, duracao: 4, letra: "ctus"},
    {nMidi: 57, duracao: 16, letra: "est"}
    ];
    
function playTenor() {
    let delay = 0.1;
    tenor.map(note => {
      play(delay, note.nMidi, note.duracao / 6, note.letra);
      setTimeout(() => updateLyrics(note.letra), delay * 1000);
      delay += note.duracao / 6; // assumes that each duration is a multiple of 8th notes
    });
  }

  const playButtonT = document.getElementById("play-tenor");
playButtonT.addEventListener("click", () => {
    audioCtx = new AudioContext();  
    playTenor()
});


const baixo = [
    {nMidi: 50, duracao: 8, letra: "Et"},
    {nMidi: 50, duracao: 4, letra: "in"},
    {nMidi: 50, duracao: 4, letra: "car"},
    {nMidi: 47, duracao: 8, letra: "na"},
    {nMidi: 45, duracao: 8, letra: "tus"},
    {nMidi: 50, duracao: 8, letra: "est"},
    {nMidi: 0, duracao: 4, letra: "-"},
    {nMidi: 50, duracao: 4, letra: "de"},
    {nMidi: 57, duracao: 8, letra: "Spi"},
    {nMidi: 50, duracao: 4, letra: "ri"},
    {nMidi: 50, duracao: 4, letra: "tu"},
    {nMidi: 55, duracao: 8, letra: "San"},
    {nMidi: 50, duracao: 8, letra: "cto"},
    {nMidi: 0, duracao: 20, letra: "-"},
    {nMidi: 57, duracao: 6, letra: "Et"},
    {nMidi: 55, duracao: 1, letra: "Et"},
    {nMidi: 54, duracao: 1, letra: "Et"},
    {nMidi: 55, duracao: 4, letra: "Et"},
    {nMidi: 57, duracao: 8, letra: "ho"},
    {nMidi: 52, duracao: 8, letra: "mo"},
    {nMidi: 0, duracao: 8, letra: "-"},
    {nMidi: 50, duracao: 16, letra: "fa"},
    {nMidi: 52, duracao: 8, letra: "ctus"},
    {nMidi: 45, duracao: 16, letra: "est"}
    ];
    
function playBaixo() {
    let delay = 0.1;
    baixo.map(note => {
      play(delay, note.nMidi, note.duracao / 6, note.letra);
      setTimeout(() => updateLyrics(note.letra), delay * 1000);
      delay += note.duracao / 6; // assumes that each duration is a multiple of 8th notes
    });
  }

const playButtonB = document.getElementById("play-baixo");
playButtonB.addEventListener("click", () => {
    audioCtx = new AudioContext();  
    playBaixo()
});

function playTodos() {
    // For todos, only show soprano lyrics
    let delay = 0.1;
    soprano.map(note => {
      setTimeout(() => updateLyrics(note.letra), delay * 1000);
      delay += note.duracao / 6;
    });
    
    playSoprano ();
    playAlto ();
    playTenor ();
    playBaixo ()
  }

const playButtonX = document.getElementById("play-todos");
playButtonX.addEventListener("click", () => {
    audioCtx = new AudioContext();  
    playTodos()
});
//const zipWith = (f, xs, ys) => xs.map((n, i) => f(n, ys[i]))