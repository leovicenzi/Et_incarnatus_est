let audioCtx;

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
        document.getElementById("lyrics").textContent = letra;
    }, delay * 1000);
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
      delay += note.duracao / 6; // assumes that each duration is a multiple of 8th notes
    });
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
      delay += note.duracao / 6; // assumes that each duration is a multiple of 8th notes
    });
  }

const playButtonB = document.getElementById("play-baixo");
playButtonB.addEventListener("click", () => {
    audioCtx = new AudioContext();  
    playBaixo()
});

function playTodos() {
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