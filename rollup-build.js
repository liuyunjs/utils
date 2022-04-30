// import fs from 'fs/promises';
// import typescript2 from 'rollup-plugin-typescript2';
// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import fs from 'fs';
// import path from 'path';
// import typescript from 'typescript';
// import pkg from './package.json';
const fs = require('fs/promises');
const path = require('path');
const { rollup } = require('rollup');
const typescript2 = require('rollup-plugin-typescript2');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const pkg = require('./package.json');

// console.log(commonjs, resolve, typescript2);

const UmdName = 'liuyunjsUtils';

const typescriptConfig = {
  typescript: require('typescript'),
};

const noDeclarationConfig = Object.assign({}, typescriptConfig, {
  tsconfigOverride: { compilerOptions: { declaration: false } },
});

const arrDevDep = Object.keys(pkg.devDependencies || {});
const devDepSet = new Set(arrDevDep);
const makeExternalPredicate = (exclude) => {
  return (id) => {
    if (id === exclude) return false;
    if (devDepSet.has(id)) return false;
    if (id.includes('/node_modules/')) {
      id = id.split('/node_modules/')[1];
      if (
        arrDevDep.some((item) => {
          return id.indexOf(item) === 0;
        })
      ) {
        return false;
      }
    }
    return true;
  };
};

const defaultOutputs = ['es', 'cjs'];

const rootPath = path.resolve('./src');

const noDeclarationPlugins = [
  commonjs(),
  resolve.default(),
  typescript2(noDeclarationConfig),
];
const declarationPlugins = [
  commonjs(),
  resolve.default(),
  typescript2(typescriptConfig),
];

const rootInputFile = path.resolve('./src/index.ts');

async function buildInternal(
  input,
  {
    outputs = defaultOutputs,
    plugins = noDeclarationPlugins,
    external = makeExternalPredicate(input),
  } = {},
) {
  console.log('bundle file: ', input);
  const bundle = await rollup({
    input,
    external,
    plugins,
  });

  for (const format of outputs) {
    const output = input
      .replace('/src/', '/' + (format === 'cjs' ? 'lib' : format) + '/')
      .replace(/\.ts$/, '.js');
    console.log('bundle to: ', output);

    const options = {
      format,
      exports: 'named',
      file: output,
    };

    if (format === 'umd') {
      options.name = UmdName;
    }

    await bundle.write(options);
  }
  await bundle.close();
}

const build = async (inputPath) => {
  const dir = await fs.readdir(inputPath);

  for (const item of dir) {
    if (item === '.DS_Store') continue;
    const currPath = path.join(inputPath, '/', item);
    if ((await fs.stat(currPath)).isDirectory()) {
      await build(currPath);
    } else {
      if (currPath === rootInputFile) {
        await buildInternal(currPath, {
          outputs: defaultOutputs.slice(0, 1),
        });
        await buildInternal(currPath, {
          outputs: defaultOutputs.slice(1),
          // 输出ts声明文件
          plugins: declarationPlugins,
        });
        await buildInternal(currPath, {
          // 打包umd
          outputs: ['umd'],
          external: [],
        });
      } else {
        await buildInternal(currPath);
      }
    }
  }
};

const rm = async (inputPath) => {
  const currPath = path.resolve(inputPath);
  try {
    if (await fs.stat(currPath)) {
      console.log('rm dir: ', currPath);
      await fs.rm(currPath, { recursive: true });
    }
  } catch {}
};

(async () => {
  await rm('./es');
  await rm('./lib');
  await rm('./umd');

  try {
    await build(rootPath);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
