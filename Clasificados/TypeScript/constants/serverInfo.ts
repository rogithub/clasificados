export default {
    host: "https://localhost:5001",
    api: {
        inmuebles: {
            base: '/inmuebles',
            get: '/inmuebles/get'
        },
        vehiculos: {
            base: '/vehiculos',
            get: '/vehiculos/get',
        },
        empleos: {
            base: '/empleos',
            search: '/empleos/search',
            get: '/empleos/get',
        },
        varios: {
            base: '/varios',
            search: '/varios/search',
            get: '/varios/get',
        },
        lugares: {
            base: '/lugares',
            save: '/lugares/save',
            getAll: '/lugares/GetAll'
        }
    },
    web: {
        home: {
            index: "/home/index",
            lugar: "/home/lugar"
        },
        inmuebles: {
            index: "/inmuebles/Index",
            nuevo: "/inmuebles/Nuevo",
            editar: "/inmuebles/Editar"
        },
        vehiculos: {
            index: "/vehiculos/Index",
            nuevo: "/vehiculos/Nuevo",
            editar: "/vehiculos/Editar"
        },
        empleos: {
            index: "/empleos/Index",
            nuevo: "/empleos/Nuevo",
            editar: "/empleos/Editar"
        },
        varios: {
            index: "/varios/Index",
            nuevo: "/varios/Nuevo",
            editar: "/varios/Editar"
        }
    }

}
