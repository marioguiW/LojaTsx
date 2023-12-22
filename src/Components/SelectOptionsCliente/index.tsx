import './SelectOptions.css'

export default function SelectOptionsCliente({titulo, itens,valor, aoAlterado, pegaId}){
    console.log(itens)
    // console.log(valor);

    const aoAlterar = (evento)=>{
        const selectedOption = evento.target.options[evento.target.selectedIndex];
        const selectedId = selectedOption.getAttribute('id');

        pegaId(selectedId)
        aoAlterado(evento.target.value)
    }

    return(
        <div className='select'>
            <label htmlFor='lista'>{titulo}</label>
            <select
                onChange={evento => aoAlterar(evento)}
                value={valor}
                id='lista'
                className='lista'
            >
                {itens.map(item => <option id={item.Id}>{item.Nome}</option>)}
            </select>
        </div>
    )
}