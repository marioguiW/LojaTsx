export interface ClienteType{
    id: number
    nome: string
    email: string
    senha: string
    isAdmin: boolean
    enderecoId: number
    enderecoDeEntrega: EnderecoType
}

interface EnderecoType{
    id: number
    cep: number
    logradouro: string
    numero: number
    bairro: string
    cidade: string
} 
