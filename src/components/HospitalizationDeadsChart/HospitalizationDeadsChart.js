
import React, {useState, useEffect, useRef} from 'react'

export default function HospitalizationDeadsChart({data}){

    const [showingAccumulated, setShowingAccumulated] = useState(false)
    const canvasRef = useRef(null)
    const canvasRefAccumulated = useRef(null)

    useEffect( () => {

        if (showingAccumulated){
            const chartAccumulated = new Chart(canvasRefAccumulated.current, {
                type: "line", 
                options: {responsive: true } 
            })
            chartAccumulated.data.labels = data.labels
            chartAccumulated.data.datasets = [
                {
                    label: 'Acumulado muertes',  
                    backgroundColor: 'black',
                    data: data.datasets[1]
                },
                {
                    label: 'Acumulado hospitalizaciones',  
                    backgroundColor: 'grey',
                    data: data.datasets[3]
                },
                { 
                    label: 'Acumulado entradas en UCIs', 
                    backgroundColor: 'red', 
                    data: data.datasets[5]
                }
            ]
            chartAccumulated.update()

        }else {
            const chart = new Chart(canvasRef.current, {
                type: "bar",
                options: { responsive: true }
            })
    
            chart.data.labels = data.labels
    
            chart.data.datasets = [
                { 
                    label: 'Muertes', 
                    backgroundColor: 'black', 
                    data: data.datasets[0]
                },
                { 
                    label: 'Nuevas hospitalizaciones', 
                    backgroundColor: 'grey', 
                    data: data.datasets[2]
                },
                { 
                    label: 'Nuevas UCIs', 
                    backgroundColor: 'red', 
                    data: data.datasets[4]
                }
            ]
            chart.update()
        }

        
    })

    return (
        <div className="HospitalizationDeadsChart">
            <button onClick={ e => {setShowingAccumulated(!showingAccumulated)} }>Change</button>

            {showingAccumulated ? 
                <canvas ref={canvasRefAccumulated} ></canvas> :
                <canvas ref={canvasRef} ></canvas>
            }
        </div>
    )
}