namespace Context {
    type auth = {
        user: string | undefined,
    }
}

namespace App {
    type searchInfo = {
        categorias: category[],
        tipos: types[]
    }

    type category = {
        id: string,
        descricao: string
    }

    type types = {
        id: string,
        descricao: string
    }

    type app = {
        searchResults: App.house[]
    }

    type AppContext = {
        app: App.app,
        setApp: React.Dispatch<SetStateAction<App.app>> | undefined
    }

    type user = {
        email: string,
        img: string,
        nome: string,
        tel: string
    }

    type house = {
        address: string,
        areaext: boolean,
        arealzr: boolean,
        banheiros: string,
        codigo: string,
        data: string,
        descricao: string,
        imagens: string[],
        lat: string,
        log: string,
        metros: string,
        piscina: boolean,
        pontos: string,
        price: string,
        quartos: string,
        title: string,
        vagas: string,
        user: App.user
    }
}