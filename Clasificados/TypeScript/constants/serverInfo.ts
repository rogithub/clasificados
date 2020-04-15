export default {
    host: "https://localhost:5001",
    api: {
        inmuebles: {
            base: '/apiinmuebles',
            search: '/apiinmuebles/search',
            save: '/apiinmuebles/save',
            get: '/apiinmuebles/get'
        },
        vehiculos: {
            base: '/apivehiculos',
            search: '/apivehiculos/search',
            save: '/apivehiculos/save',
            get: '/apivehiculos/get',
        },
        empleos: {
            base: '/apiempleos',
            search: '/apiempleos/search',
            save: '/apiempleos/save',
            get: '/apiempleos/get',
        },
        varios: {
            base: '/apivarios',
            search: '/apivarios/search',
            save: '/apivarios/save',
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
            index: "/inmuebles/Index"
        },
        vehiculos: {
            index: "/vehiculos/Index"
        },
        empleos: {
            index: "/empleos/Index"
        },
        varios: {
            index: "/varios/Index"
        }
    }

}
