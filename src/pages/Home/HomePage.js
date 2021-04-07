
import React from'react'
import VaccinationChart from '../../components/VaccinationChart/VaccinationChart.js'
import NewInfectionsChart from '../../components/NewInfectionsChart/NewInfectionsChart.js'
import {transformVaccinationDataToShow} from '../../services/getDataFile.js'

export default function HomePage({vaccinationData, newInfectionsData}){

    //console.log('HomePage',vaccinationData, newInfectionsData)

    return (
        <div className="HomePage">
            <h2>Overview</h2>

            <section>
                <h3>Datos de vacunación</h3>
                <VaccinationChart data={transformVaccinationDataToShow(vaccinationData)}/>
            </section>

            <section>
                <h3>Nuevas infecciones</h3>
                <NewInfectionsChart data={newInfectionsData}/>
            </section>
        </div>
    )
}