export default {
    host: "https://localhost:5001",
    api: {
        inmuebles: {
            base: '/apiinmuebles',
            search: '/apiinmuebles/search',
            get: '/apiinmuebles/get'
        },
        vehiculos: {
            base: '/apivehiculos',
            search: '/apivehiculos/search',
            get: '/apivehiculos/get',
        },
        empleos: {
            base: '/apiempleos',
            search: '/apiempleos/search',
            get: '/apiempleos/get',
        },
        varios: {
            base: '/apivarios',
            search: '/apivarios/search',
            get: '/apivarios/get',
        },
        lugares: {
            base: '/apilugares',
            save: '/apilugares/save',
            getAll: '/apilugares/GetAll'
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
