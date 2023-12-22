import CampoTexto from "Components/CampoTexto"
import "./Login.css"
import { useContext, useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
// import { toast } from "react-toastify";
import { ClienteType } from "types/cliente";
import { UserContext, UserProvider } from "context/userContext";

export default function Login(){

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')

    const[usuarios, setUsuarios] = useState<ClienteType[]>([])

    const{user} = useContext(UserContext)

    const navigate = useNavigate();

    // useEffect(()=>{
    //     if(notification){
    //         toast.success("teste")
    //     }
    // },[notification])

    useEffect(() => {
        fetch(`https://localhost:7148/cliente/clientes`, {
          method: "GET",
          headers: {
            'content-type': 'application/json;charset=utf-8',
          }
        })
        .then(resposta => resposta.json())
        .then(dados => {
          console.log(dados)
          const novoUsuario = dados.map((cliente : ClienteType) => (
            {
                Id: cliente.id,
                Nome: cliente.nome,
                Email: cliente.email,
                Senha: cliente.senha,
                Endereco: cliente.enderecoDeEntrega,
                IsAdmin: cliente.isAdmin
            }
          ))
          setUsuarios(novoUsuario) 
        });
      }, []);

        function validaLogin(evento : React.FormEvent<HTMLFormElement>){
            evento.preventDefault()
            const usuarioValidado = usuarios.find( usuario =>
                usuario.email == email &&
                usuario.senha == senha
            )

            if(usuarioValidado == undefined){
                setErro("Email ou Senha inválido")
                console.log(usuarioValidado)
                
            }else{
                console.log(usuarioValidado)
                sessionStorage.setItem("login", JSON.stringify(usuarioValidado))
                setUser(usuarioValidado)
                
                if(usuarioValidado.isAdmin){
                    navigate("/cadastrarproduto")
                }else{
                    navigate("/comprar")
                }
            }
        }

        


    return(
        <div className="login">  
            <form onSubmit={evento => validaLogin(evento)} className="formulario-login">
                <CampoTexto
                    titulo="Email"
                    tipo="email
                    "
                    valor={email}
                    aoAlterar={valor => setEmail(valor)}
                >
                    Digite seu email
                </CampoTexto>

                <CampoTexto
                    titulo="Senha"
                    tipo="password"
                    valor={senha}
                    aoAlterar={valor => setSenha(valor)}
                >
                    Digite sua senha
                </CampoTexto>
                <div>
                    <p className="erro">{erro}</p>
                </div>
                <button className="button-login">Entrar</button>
                <p className="registrar">Não tem uma conta? <Link to={"/cadastrarcliente"} className="registrar-link">Registre-se</Link> </p>
            </form>
        </div>
    )
}