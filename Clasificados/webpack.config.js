const path = require('path');

module.exports = {
    entry: {
        clientes: './TypeScript/pages/empleos.ts',
        nuevoCliente: './TypeScript/pages/inmuebles.ts',
        editarCliente: './TypeScript/pages/varios.ts',
        proveedores: './TypeScript/pages/vehiculos.ts'
    },
    mode: 'production',
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            name: 'shared'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/i,
                loader: 'raw-loader',
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        // same file name with js extension
        filename: '[name].js',
        // to this path we will save our JS generated files
        path: path.resolve(__dirname, 'wwwroot/js')
    },
    // If using webpack and declaring knockout on your html add this to webpack.config.js
    externals: {
        'ko': 'ko'
    }
};
