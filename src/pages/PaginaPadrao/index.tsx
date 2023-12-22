import { Outlet } from 'react-router-dom'
import './PaginaPadrao.css'
import Menu from 'Components/Menu'

export default function PaginaPadrao(){
    return(
        <main>
            <Outlet/>
        </main>

    )
}