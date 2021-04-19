import React, {useState, useEffect} from 'react';
import {Route} from 'wouter' 
import './App.css'
import {getDataFile, transformVaccinationDataToShow, 
    transformNewInfectionsDataToShow,
    transformSituationDataToShow} from './services/getDataFile.js'
import HomePage from './pages/Home/HomePage.js'
import VaccinationPage  from './pages/Vaccination/VaccinationPage.js'
import InfectionsPage from './pages/Infections/InfectionsPage.js'
import HospitalizationDeadsPage from './pages/HospitalizationDeads/HospitalizationDeadsPage.js'
import Menu from './components/Menu/Menu';

export default function App(){

    const menuItems = new Map([
        ['/', 'INICIO'],
        ['/vacunacion', 'VACUNACIÓN'],
        ['/nuevos-infectados', 'NUEVOS INFECTADOS'],
        ['/hospitalizacion-muertes', 'HOSPITALIZACIONES Y MUERTES'],
    ])

    const [vaccinationData, setVaccinationData] = useState([])
    const [newInfectionsData, setNewInfectionsData] = useState({rawData: new Map(), dataByDate: []})
    const [situationData, setSituationData] = useState([])
    useEffect( () => {
        getDataFile('vaccination', data => { setVaccinationData(data) } )
        getDataFile('new-infections', data => { setNewInfectionsData(data) } )
        getDataFile('situation', data => { setSituationData(data) } )
        console.log('App useEffect')
    }, [])
    


    return (
        <div className="App">
            <Menu items={menuItems} />
            
            <Route path="/">
                {params => <HomePage vaccinationData={vaccinationData} 
                    newInfectionsData={transformNewInfectionsDataToShow(newInfectionsData.dataByDate)}
                    hospitalizationDeadsData={transformSituationDataToShow(situationData)}
                    />}
            </Route> 

            <Route path="/vacunacion" >
                {params => <VaccinationPage vaccinationData={vaccinationData}  />}
            </Route>

            <Route path="/nuevos-infectados" >
                {params => <InfectionsPage data={newInfectionsData}  />}
            </Route>

            <Route path="/hospitalizacion-muertes" >
                {params => <HospitalizationDeadsPage data={situationData}  />}
            </Route>

        </div>
    )
} 