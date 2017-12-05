import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const config = {
    name: 'Peregrine',
    input: 'src/index.js',
    output: [
        {
            file: 'dist/peregrine.js',
            format: 'cjs'
        },
        {
            file: 'dist/peregrine.esm.js',
            format: 'es'
        }
    ],
    external: ['react'],
    plugins: [
        resolve(),
        commonjs({
            namedExports: {
                react: ['Children', 'Component', 'createElement'],
                'react-dom': ['render']
            }
        })
    ]
};

export default config;
