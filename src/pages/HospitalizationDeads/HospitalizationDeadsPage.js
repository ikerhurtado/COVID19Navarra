
import React from 'react'
import HospitalizationDeadsChart from '../../components/HospitalizationDeadsChart/HospitalizationDeadsChart.js'
import {transformSituationDataToShow} from '../../services/getDataFile.js'

export default function HospitalizationDeadsPage({data}){

    return (
        <div className="HospitalizationDeadsPage">

            <HospitalizationDeadsChart data={transformSituationDataToShow(data)}/>
        </div>
    )
}