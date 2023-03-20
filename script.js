'use strict'

const mapa = document.querySelector('svg')

const getEstado = async (event) => {
    const estado = event.target.id.replace('BR-', '')

    const card = await preencherCard(estado)


    
    console.log(card.cidades)

    const cidade = card.cidades
    
    cidade.forEach(element => {
        const cidadesDiv = document.createElement('div')
        cidadesDiv.classList.add('cidadeDiv')

        const cidadeArray = document.createElement('p')
        cidadeArray.classList.add('cidade')
        cidadeArray.textContent = element

        cidadesDiv.append(cidadeArray)

        const cidadesPrincipal = document.getElementById('principal-cidades')
        cidadesPrincipal.append(cidadesDiv)

        console.log(cidadeArray)
    });


    document.getElementById('sigla').textContent = card.sigla
    document.getElementById('nome').textContent = card.estado
    document.getElementById('capital').textContent = card.capital
    document.getElementById('regiao').textContent = card.regiao
    
    

}
const preencherCard = async (estado) => {

    const url = `http://localhost:8080/v2/senai/cidades?uf=${estado}`
    const urlRegiao = `http://localhost:8080/v1/senai/estado/sigla/${estado}`

    const response = await fetch(url)
    const responseRegiao = await fetch(urlRegiao)

    const data = await response.json()
    const dataRegiao = await responseRegiao.json()

    return {
        sigla: data.uf,
        regiao: dataRegiao.regiao,
        estado: data.descricao,
        capital: dataRegiao.capital,
        cidades: data.cidades
    }

}

mapa.addEventListener('click', getEstado)
