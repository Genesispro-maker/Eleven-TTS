import { useEffect, useReducer, useState } from "react"
import { Slider } from "./components/slider"
import { apikey, voiceId } from "./util/keys"
import { Label } from "./components/label"
import { Button } from "./components/button"
import { ErrorBoundary } from "./components/error-boundary"
import { Player } from "./components/player"
import { reducer } from "./util/reducer"

const initial = {
  boost: 0.35,
  stability: 0.25
}

export default function App(){
  const [status, setStatus] = useState<"error" | "loading" | "idle" | "ready">("idle")
  const [state, dispatch] = useReducer(reducer, initial)
  const [src, setSrc] = useState<string>("")
  const [value, setValue] = useState<string>("")

  const disabled = status === "loading"

  useEffect(() => {
    return () => {
      if(src) URL.revokeObjectURL(src)
    }
  }, [src])

  async function Generate(value: string){
    setStatus("loading")
     try {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "xi-api-key": apikey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: value,
          model_id: "eleven_flash_v2_5",
          voice_settings: {
            stability: state.stability,
            similarity_boost: state.boost,
          }
        })
      })

      if(!res.ok){
        console.error(res.status, res.statusText)
        setStatus("error")
        return
      }

      const data = await res.blob()
      const blob = URL.createObjectURL(data)
      setSrc(blob)

      setStatus("ready")
     } catch {
        setStatus("error")
     }
  }

  return (
    <main>
      <h1 className="Logo">TTS</h1>

      <div className="wrapper">
        <textarea placeholder="Enter a Text to Generate Speech" rows={1} className="input" value={value} onChange={(e) => setValue(e.target.value)} />
           {status === "ready" ? (
            <ErrorBoundary fallback={<span>Something went wrong</span>}>
              <Player src={src} />
            </ErrorBoundary>
           ) : null}
      </div>

      <div className="voice-settings">
        <div className="sliders">
         <Label name="Stability" value={state.stability} />
         <Slider value={state.stability} setValue={(value) => dispatch({
          type: "stability",
          value: value
         })} min={0} max={0.5} step={0.01} />

         <Label name="Similarity Boost" value={state.boost} /> 
         <Slider value={state.boost} setValue={(value) => dispatch({
          type: "boost",
          value: value,
         })} min={0} max={0.5} step={0.01} />

          <Button className="generate" onClick={() => {
            if(value.length === 0) return

            Generate(value)
          }} role="button" aria-label="Generate Speech" disabled={disabled}>
            {status === "loading" ? "loading..." : "Generate Speech"}
          </Button>
        </div>
      </div>
    </main>
  )
}