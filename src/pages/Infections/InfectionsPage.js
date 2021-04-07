import React, {useState} from 'react'
import NewInfectionsChart from '../../components/NewInfectionsChart/NewInfectionsChart.js'
import {transformNewInfectionsDataToShow } from '../../services/getDataFile.js'
import DataTable from '../../components/DataTable/DataTable.js'
import './InfectionsPage.css'


export default function InfectionsPage({data}){
    console.log('InfectionsPage data', data)

    

    //const dataForTable = transformVaccinationDataForTable(vaccinationData)
    //CAPTIONS[5] += ` (media: ${dataForTable.averageAttendance.toFixed(1)})` 
    //CAPTIONS[6] += ` (media: ${dataForTable.averageNoVaccinated.toFixed(1)})` 

    return (
        <div className="InfectionsPage">
            <h2>Infecciones</h2>

            <NewInfectionsChart data={transformNewInfectionsDataToShow(data.dataByDate)}/>
           
            <InfectionsTableWrapper dataGroupedByMonth={data.rawData} />
        </div>

    )
}

function InfectionsTableWrapper({dataGroupedByMonth}){

    const [month, setMonth] = useState('')

    const CAPTIONS = [
        'Fecha',
        'Zona', 
        'Localidad',
        'Nuevas infecciones']


    return (
        <div>
            {[...dataGroupedByMonth.keys()].map( month => 
                <span className="month-button" 
                    onClick={ e => setMonth(month)} > {month}
                </span>
            )}

            <DataTable captions={CAPTIONS} 
                data={dataGroupedByMonth.get(month) ? dataGroupedByMonth.get(month) : [] } >
            </DataTable>
        </div>
    )


}