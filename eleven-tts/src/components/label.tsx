import React from "react"

export const Label = ( { name, value }: { name: string, value: number }) => {
    return (
        <React.Fragment>
         <div className="label">
           <label htmlFor={name}>{name}</label>
           <span>{Math.floor((value / 0.5) * 100)}%</span>
         </div>
        </React.Fragment>
    )
}