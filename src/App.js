import React, {useState, useEffect} from 'react';
import {Route} from 'wouter' 
import './App.css'
import {getDataFile, transformVaccinationDataToShow, transformNewInfectionsDataToShow} from './services/getDataFile.js'
import HomePage from './pages/Home/HomePage.js'
import VaccinationPage  from './pages/Vaccination/VaccinationPage.js'
import InfectionsPage from './pages/Infections/InfectionsPage.js'
import Menu from './components/Menu/Menu';

export default function App(){

    const menuItems = new Map([
        ['/', 'INICIO'],
        ['/vacunacion', 'VACUNACIÓN'],
        ['/nuevos-infectados', 'NUEVOS INFECTADOS'],
    ])

    const [vaccinationData, setVaccinationData] = useState([])
    const [newInfectionsData, setNewInfectionsData] = useState({rawData: new Map(), dataByDate: []})
    useEffect( () => {
        getDataFile('vaccination', data => { setVaccinationData(data) } )
        getDataFile('newInfections', data => { setNewInfectionsData(data) } )
        console.log('App useEffect')
    }, [])
    


    return (
        <div className="App">
            <Menu items={menuItems} />
            
            <Route path="/">
                {params => <HomePage vaccinationData={vaccinationData} 
                    newInfectionsData={transformNewInfectionsDataToShow(newInfectionsData.dataByDate)} />}
            </Route> 

            <Route path="/vacunacion" >
                {params => <VaccinationPage vaccinationData={vaccinationData}  />}
            </Route>

            <Route path="/nuevos-infectados" >
                {params => <InfectionsPage data={newInfectionsData}  />}
            </Route>

        </div>
    )
} 