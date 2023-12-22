import CampoTexto from 'Components/CampoTexto';
import './SobreMim.css'
import BotaoEnviar from 'Components/BotaoEnviar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CadastrarCliente = () => {

    const [nome, setNome] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [emails, setEmails] = useState([])

    const navigate = useNavigate();

    useEffect(()=>{
        if(cep && cep.length > 7){
            fetch(`https://viacep.com.br/ws/${cep}/json/`, {
                method: "GET",
                headers: {
                'content-type': 'application/json;charset=utf-8',
                }
            })
                .then(resposta => resposta.json())
                .then(dados =>{
                    console.log(dados);
                    setBairro(dados.bairro);
                    setCidade(dados.localidade);
                    setEndereco(dados.logradouro);
                })
        }
    },[cep])

    useEffect(() => {
        fetch(`https://localhost:7148/cliente/clientes`, {
          method: "GET",
          headers: {
            'content-type': 'application/json;charset=utf-8',
          }
        })
        .then(resposta => resposta.json())
        .then(dados => {
          const novosEmails : string[] = [];
          dados.forEach(dado => {
            if(dado.email){
                novosEmails.push(dado.email);
                console.log("passo")
            }
            console.log(dado);
          });
          setEmails([...emails, ...novosEmails]);
        });
    }, []);


    const aoCadastrarCliente = (evento)=>{
        evento.preventDefault();
        if(senha == confirmSenha){

        if(!emails.find(a => a == email)){
            

        fetch("https://localhost:7148/endereco/enderecos", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                Cep: cep,
                Logradouro: endereco,
                Numero: numero,
                Bairro: bairro,
                Cidade: cidade,
            })
        })
        .then((response) => {
            if (response.ok) {
              return fetch("https://localhost:7148/endereco/enderecos", {
                method: 'GET',
                headers: {
                  'content-type': 'application/json;charset=utf-8',
                }
              });
            } else {
              throw new Error("Falha no POST");
            }
          })
          .then((resposta) => resposta.json())
          .then((dados) => {
            console.log(dados[dados.length-1]);
            var idEndereco = dados[dados.length-1].id
            console.log(idEndereco);
            fetch("https://localhost:7148/cliente/clientes", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    Nome: nome,
                    Email: email,
                    Senha: senha,
                    EnderecoId: idEndereco
                })
            })
          })

          setNome('')
          setCep('')
          setEndereco('')
          setNumero('')
          setBairro('')
          setCidade('')
          navigate("/login/sucessfull")
        }else{
            alert("Email já registrado")
        }
        }else{
            alert("Senhas não coincidem");
        }


    }   

    return(
        <div className='cadastro-cliente'>
            <form onSubmit={aoCadastrarCliente} className='formulario-cliente'>
                        <CampoTexto
                            tipo="text"
                            titulo={"Nome"}
                            valor={nome}
                            aoAlterar={valor => setNome(valor)}
                        >Digite seu Nome 
                        </CampoTexto>

                        <CampoTexto
                            tipo="email"
                            titulo={"Email"}
                            valor={email}
                            aoAlterar={valor => setEmail(valor)}
                        >Digite seu Email
                        </CampoTexto>

                        <div className='campos2'>
                            <CampoTexto
                                tipo="password"
                                titulo={"Senha"}
                                valor={senha}
                                aoAlterar={valor => setSenha(valor)}
                            >Digite sua senha
                            </CampoTexto>

                            <CampoTexto
                                tipo="password"
                                titulo={"Confirmar Senha"}
                                valor={confirmSenha}
                                aoAlterar={valor => setConfirmSenha(valor)}
                            >Confirme a senha
                            </CampoTexto>
                        </div>


                        <CampoTexto
                            tipo="number"
                            titulo={"Cep"}
                            valor={cep}
                            aoAlterar={valor => setCep(valor)}
                        >Digite seu CEP
                        </CampoTexto>
                        <div className='campos2'>
                                <CampoTexto
                                    tipo="text"
                                    titulo={"Endereco"}
                                    valor={endereco}
                                    aoAlterar={valor => setEndereco(valor)}
                                    >Digite o Endereco
                                </CampoTexto>

                                <CampoTexto
                                    tipo="text"
                                    titulo={"Numero"}
                                    valor={numero}
                                    aoAlterar={valor => setNumero(valor)}
                                    >Digite o Numero
                                </CampoTexto>
                        </div>
                        <div className='campos2'>
                            <CampoTexto
                                tipo="text"
                                titulo={"Bairro"}
                                valor={bairro}
                                aoAlterar={valor => setBairro(valor)}
                            >Digite o Bairro
                            </CampoTexto>

                            <CampoTexto
                                tipo="text"
                                titulo={"Cidade"}
                                valor={cidade}
                                aoAlterar={valor => setCidade(valor)}
                            >Digite o Cidade
                            </CampoTexto>
                        </div>
                <BotaoEnviar conteudo="Cadastrar"/>
            </form>
        </div>
    )
}

export default CadastrarCliente;