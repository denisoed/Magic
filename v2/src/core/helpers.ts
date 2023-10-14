export function playAudio(mp3: string) {
  const audio = new Audio(mp3);
  audio.play();
}
