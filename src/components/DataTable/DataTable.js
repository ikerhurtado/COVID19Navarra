
import React, {useState} from 'react'
import './DataTable.css'


const ROWS_PER_PAGE = 20

export default function DataTable({captions, data}){

    const PAGES = Math.ceil(data.length/ROWS_PER_PAGE)
    const [page, setPage] = useState(1)
    const [sorting, setSorting] =  useState({column: 0, type: 'descending'})

    console.log('DataTable', data[0])
    function sortColumn(index){
        
        console.log('DataTable sortColumn', data[0])
        if (sorting.column == index){
            const newState = {column: index, type: null}
            if (sorting.type === 'ascending') newState.type = 'descending'
            else newState.type = 'ascending'
            sortData(data, index, newState.type === 'ascending')
            setSorting(newState)
        }else{
            sortData(data, index, false)
            setSorting({column: index, type: 'descending'})
        }
        
    }

    function sortData(data, index, ascending){
        let result
        data.sort( (a, b) => {
            if (a[index] > b[index]) result = 1
            else if (a[index] < b[index]) result = -1
            else result = 0
            return (ascending ? result : -result)
        })
        
    }

    function getPageData(data, page){
        console.log('getPageData', page, data)
        //if (data.length == 0) return []
        
        
        return data.slice((page-1)*ROWS_PER_PAGE, page*ROWS_PER_PAGE)
    }

    function prevPage(){
        console.log('page', page)
        if (page > 1) setPage(page-1)
    }

    function nextPage(){
        console.log('page', page)
        if (page < PAGES) setPage(page+1)
    }

    return (
        <div className="DataTable">
            
            <div>

               <button onClick={ e => setPage(1)}>⏮️</button>
                <button onClick={prevPage}>◀️</button>
                <span> {page+" / "+PAGES}</span>
                <button onClick={nextPage}>▶️</button>
                <button onClick={ e => setPage(PAGES)}>⏭️</button>
                
            </div>

            <table>
            <thead>
            { 
                captions.map( (caption, index) => {
                    return  <ColumnHeader caption={caption} 
                        sorting={ index == sorting.column ? sorting.type : null} 
                        onClick={ e => {sortColumn(index)}}/>
                    }) 
                }
            </thead>

            <tbody>
            { getPageData(data, page).map( dayData => 
                    <tr>{ dayData.map( d => <td>{d}</td>) }</tr>
            )}
            </tbody>
            </table>
        </div>
    )
}

function ColumnHeader({caption, sorting, onClick}){


    return (
        <th onClick={onClick}>{caption} / {sorting !== null ? (sorting === 'ascending' ? 'A' : 'D') : ''}</th>
    )
}