import React, {useEffect, useRef} from 'react'
import Chart from 'chart.js'

export default function SecondaryVaccinationChart({data}){

    const canvasRef = useRef(null)

    useEffect( () => {
        const chart = new Chart(canvasRef.current, {
            type: "bar", 
            options: {responsive: true } 
        })

        chart.data.labels = data.labels

        chart.data.datasets = [
            {label: 'Assistencia',  backgroundColor: '#BB52C7', 
            data: data.attendance.data},
            {label: 'No se pudo vacunar', backgroundColor: '#DB72E7',
            data: data.noVaccinated.data}
        ]
        // Show the average ??
        chart.update()

    })//, [data])

    return (
        <div className="SecondaryVaccinationChart">
            <canvas ref={canvasRef} ></canvas>
        </div>
    )
}