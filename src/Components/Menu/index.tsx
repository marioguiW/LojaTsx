import './Menu.css'
import MenuLink from '../MenuLink'
import { Outlet } from 'react-router-dom';

const Menu = () => {
    return(
        <>
            <div className='cabecalho'>
                <nav className='navbar'>
                    <MenuLink rota='/produtos'>
                        Produtos
                    </MenuLink>
                    <MenuLink rota='/cadastrarproduto'>
                        Cadastrar Produto
                    </MenuLink>
                    <MenuLink rota='/clientes'>
                        Clientes
                    </MenuLink>
                    
                </nav>
            </div>
            <div id="detail">
                <Outlet/>
            </div>
        </>
    )
}

export default Menu;