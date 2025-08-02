# Et incarnatus est - Palestrina

## Português

### Descrição
Aplicação web interativa para visualização e reprodução das melodias SATB (Soprano, Alto, Tenor, Baixo) do "Et incarnatus est" de Giovanni Pierluigi da Palestrina. A aplicação apresenta um diagrama espiral cromático que mostra visualmente as notas sendo executadas em tempo real.

### Características
- **Reprodução de áudio**: Síntese de notas usando Web Audio API com efeito de vibrato
- **Diagrama espiral cromático**: Visualização circular das notas MIDI organizadas como um relógio
- **Letras sincronizadas**: Exibição das letras latinas no centro do diagrama durante a reprodução
- **Reprodução por voz**: Execução individual de cada voz (Soprano, Alto, Tenor, Baixo)
- **Reprodução conjunta**: Execução simultânea de todas as quatro vozes com destaque visual

### Como usar
1. Abra o arquivo `index.html` em um navegador web
2. Clique em uma das vozes para reproduzi-la individualmente
3. Clique em "Todos" para reproduzir todas as vozes simultaneamente
4. Observe o diagrama espiral destacando as notas sendo tocadas com círculos vermelhos

---

## English

### Description
Interactive web application for visualizing and playing SATB (Soprano, Alto, Tenor, Bass) melodies from Giovanni Pierluigi da Palestrina's "Et incarnatus est". The application features a chromatic spiral diagram that visually shows the notes being played in real-time.

### Features
- **Audio playback**: Note synthesis using Web Audio API with vibrato effect
- **Chromatic spiral diagram**: Circular visualization of MIDI notes arranged like a clock
- **Synchronized lyrics**: Display of Latin lyrics in the center of the diagram during playback
- **Voice-specific playback**: Individual execution of each voice part (Soprano, Alto, Tenor, Bass)
- **Combined playback**: Simultaneous execution of all four voices with visual highlighting

### How to use
1. Open the `index.html` file in a web browser
2. Click on any voice to play it individually
3. Click "Todos" to play all voices simultaneously
4. Watch the spiral diagram highlight the notes being played with red circles

### Technical Details
- Built with vanilla JavaScript and Web Audio API
- SVG-based spiral visualization
- MIDI note range: 45-71 (optimized for the piece's actual range)
- No external dependencies or build process required

