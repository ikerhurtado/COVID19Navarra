
import React from 'react'
import {Link, useLocation} from 'wouter'
import './Menu.css'

export default function Menu({items}){
    const [location, setLocation] = useLocation(); // The componenet uses this external state as its own 
    // console.log('Printing MEnu loc', location)
    const links = []
    items.forEach( (text, path) => {
        const className = (path === location ? 'selected' : '')
        links.push(<Link href={path} className={className} key={path}>{text}</Link>)
    });

    return (
        <div className="Menu">
            {links}
        </div>
    )
}