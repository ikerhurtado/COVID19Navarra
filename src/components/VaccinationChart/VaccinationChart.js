import React, {useState, useEffect, useRef} from 'react'
import Chart from 'chart.js'

export default function VaccinationChart({data}){

    const [showingAccumulated, setShowingAccumulated] = useState(false)
    const canvasRef = useRef(null)
    const canvasRefAccumulated = useRef(null)

    useEffect( () => {
        console.log('VaccinationChart useEffect', showingAccumulated)
        

        if (showingAccumulated){
            const chartAccumulated = new Chart(canvasRefAccumulated.current, {
                type: "line", 
                options: {responsive: true } 
            })
            chartAccumulated.data.labels = data.labels
            chartAccumulated.data.datasets = [
                {
                    label: 'Acumulado vacunas administradas',  
                    backgroundColor: '#7B1287',
                    data: data.datasets[1]
                },
                {
                    label: 'Acumulado vacunación completa',  
                    backgroundColor: '#5C0A66',
                    data: data.datasets[3]
                },
            ]
            chartAccumulated.update()
        }else{
            const chart = new Chart(canvasRef.current, {
                type: "bar", 
                options: {responsive: true } 
            })
            chart.data.labels = data.labels
            chart.data.datasets = [
                {
                    label: 'Vacunas administradas', 
                    backgroundColor: '#DB72E7',
                    data: data.datasets[0]
                },
                {
                    label: 'Vacunación completa',  
                    backgroundColor: '#BB52C7',
                    data: data.datasets[2]
                }
            ]
            chart.update()
        }
        
        
    })//, [data])


    return (
        <div className="VaccinationChart">

            <button onClick={ e => {setShowingAccumulated(!showingAccumulated)} }>Change</button>

            {showingAccumulated ? 
                <canvas ref={canvasRefAccumulated} ></canvas> :
                <canvas ref={canvasRef} ></canvas>
            }
        </div>
    )

        /*
    return (
        <div className="VaccinationChart">
                <canvas ref={canvasRefAccumulated} ></canvas> 
                <canvas ref={canvasRef} ></canvas>
        </div>
    )*/

        console.log('VaccinationChart', data)
    
   
}