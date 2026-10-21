export const Slider = ({ value, setValue, min, max, step, } : { value: number, setValue: (value: number) => void, min: number, max: number, step: number }) => {
    return <input type="range" value={value} min={min} max={max} step={step} onChange={(e) => setValue(Number(e.target.value))} />
}