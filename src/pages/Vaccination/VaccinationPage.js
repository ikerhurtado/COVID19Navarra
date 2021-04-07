import React from 'react'
import VaccinationChart from '../../components/VaccinationChart/VaccinationChart.js'
import SecondaryVaccinationChart from '../../components/SecondaryVaccinationChart/SecondaryVaccinationChart.js'
import {transformVaccinationDataToShow, 
    transformSecondaryVaccinationDataToShow,
    transformVaccinationDataForTable } from '../../services/getDataFile.js'
import DataTable from '../../components/DataTable/DataTable.js'



export default function VaccinationPage({vaccinationData}){
    console.log('VaccinationPage data', vaccinationData)

    const CAPTIONS = [
        'Fecha',
        'Vacunas administradas', 
        'Vacunas administradas - acumulado',
        'Vacunación completa',
        'Vacunación completa - acumulado',
        'Asistencia - %',
        'No se pudo vacunar - %']

    const dataForTable = transformVaccinationDataForTable(vaccinationData)
    CAPTIONS[5] += ` (media: ${dataForTable.averageAttendance.toFixed(1)})` 
    CAPTIONS[6] += ` (media: ${dataForTable.averageNoVaccinated.toFixed(1)})` 

    return (
        <div className="VaccinationPage">
            <h2>Vacunación</h2>

            <VaccinationChart data={transformVaccinationDataToShow(vaccinationData)}/>
            <SecondaryVaccinationChart data={transformSecondaryVaccinationDataToShow(vaccinationData, false)}/>
            <DataTable captions={CAPTIONS} data={dataForTable.data}></DataTable>
        </div>

    )
}