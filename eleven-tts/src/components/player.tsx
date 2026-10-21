import { useEffect, useRef, useState, } from "react"
import Noise from "../../Noisejs/dist/audio"
import { Button } from "./button"
import { Download, Pause, Play } from "lucide-react"

export function Player({ src, }: { src: string,}){
  const audioRef = useRef<Noise>(null)
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({
      duration: "0:00",
      currentTime: "0:00",
      progress: 0,
    })

    useEffect(() => {
      const audio = new Noise({})

      audioRef.current = audio

      audio.onLoadedMetadata((e) => {
        setTime((prev) => ({...prev, duration: e.duration}))
      })

      audio.onTimeUpdate((e) => {
        setTime((prev) => ({...prev, 
          currentTime: e.currentTime,
          progress: e.progress,
        }))
      })

      audio.onEnd(() => {
        setPlaying(false)
      })

      audio.src = src

      return () => {
        if(audio){
          audio.disconnect()
        }
      }
    }, [src])

    return (
          <div className="player" role="banner">
            <div style={{ display: "flex", alignItems: "center", gap: "5px"}}>
              <Button aria-label="Audio control button" className="play" onClick={() => {
                if (!audioRef.current) return;

                if(playing && audioRef.current){
                  setPlaying(false)

                  audioRef.current.pause()
                } else {
                  audioRef.current.play()

                  setPlaying(true)
                }
              }}>
                {playing ? <Pause aria-hidden size={20} /> : <Play aria-hidden size={20} />}
              </Button>

               <Button role="button" aria-label="Download Audio" className="download" onClick={() => {
                const a = document.createElement("a")
                a.href = src
                a.download = `Audio.mp3`
                a.click()
               }}>
                 <Download aria-hidden size={20} />
               </Button>
              </div>
              <div className="seek">
              <span className="duration" role="timer" aria-label={`Current-Time: ${time.currentTime}`}>{time.currentTime}</span>
                <div className="scrub">
                  <div style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: `${time.progress}%`,
                    backgroundColor: "black",
                    height: "5px",
                    borderRadius: "3px"
                  }} />
                </div>
              <span className="current" aria-label={`Duration: ${time.duration}`}>{time.duration}</span>
              </div>
          </div>
    )
}