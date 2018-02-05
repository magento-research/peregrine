// https://webpack.js.org/api/module-variables/#__webpack_chunk_load__-webpack-specific-
const loadChunk = __webpack_chunk_load__;
// https://webpack.js.org/api/module-variables/#__webpack_require__-webpack-specific-
const webpackRequire = __webpack_require__;

/**
 * @description Uses the webpack runtime to async load a chunk, and then returns
 * the default export for the module specified with moduleID
 * @param {number} chunkID
 * @param {number} moduleID
 */
export default function fetchRootComponent(chunkID, moduleID) {
    return loadChunk(chunkID).then(() => {
        return webpackRequire(moduleID).default;
    });
}
