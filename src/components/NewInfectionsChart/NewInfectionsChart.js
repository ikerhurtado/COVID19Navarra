import React, {useEffect, useRef} from 'react'
import Chart from 'chart.js'

export default function NewInfectionsChart({data}){

    const canvasRef = useRef(null)

    useEffect( () => {
        const chart = new Chart(canvasRef.current, {type: "bar", options: {}})
        chart.data = data
        chart.update()

    })//, [data])

    return (
        <div className="NewInfectionsChart">
            <canvas ref={canvasRef} ></canvas>
        </div>
    )
}