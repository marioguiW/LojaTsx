import './CampoTexto.css'

export default function CampoTexto({children, titulo, tipo, valor, aoAlterar}){
    return(
        <div className='caixa_texto'>
            <label htmlFor='text'>{titulo}</label>
            <input required value={valor} onChange={evento => aoAlterar(evento.target.value)} type={tipo} placeholder={children}/>
        </div>
    )
}