import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import dts from "rollup-plugin-dts";

// import pack from "./package.json";

export default [
    {
        input:"packages/index.ts",
        output:[
            {
                file:"dist/cjs/index.js",
                format:"cjs",
                sourcemap:true,
            },
            {
                file:"dist/esm/index.js",
                format:"esm",
                sourcemap:true,
            }
        ],
        plugins:[
            // resolve(),
            commonjs(),
            typescript(),
            terser()
        ]
    },
    {
        input:"dist/esm/index.d.ts",
        output:[{file:"dist/index.d.ts",format:"esm"}],
        plugins:[dts()]
    }
]