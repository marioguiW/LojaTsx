import { Link, useLocation } from 'react-router-dom';
import styles from './MenuLink.css'

const MenuLink = ({children, rota})=>{
    const localizacao = useLocation();

    return(

        <Link
            className={`
                ${'link'}
                ${localizacao.pathname == rota ? 'linkdestacado' : ''}
            `}
            to={rota}
        >
            {children}
        </Link> 
    )
}

export default MenuLink;