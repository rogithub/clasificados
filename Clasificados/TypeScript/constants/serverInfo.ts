export default {
    host: "https://localhost:5001",
    api: {
	cuentas: {
	    base: '/Cuentas',
	    get: '/Cuentas/get'
	},
        facturacion: {
            base: '/DatosFacturacion',
            get: '/DatosFacturacion/get',
        },
        clientes: {
            base: '/clientes',
            search: '/clientes/search',
            get: '/clientes/get',
        },
        proveedores: {
            base: '/proveedores',
            search: '/proveedores/search',
            get: '/proveedores/get',
        }
    },
    web: {
        clientes: {
            index: "/Clientes/Index",
            nuevo: "/Clientes/Nuevo",
            editar: "/Clientes/Editar"
        },
        proveedores: {
            index: "/Proveedores/Index",
            nuevo: "/Proveedores/Nuevo",
            editar: "/Proveedores/Editar"
        }
    }

}
