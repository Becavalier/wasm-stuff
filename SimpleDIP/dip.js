// dip.js

var Module = {};

function loadWASM() {
    return new Promise((resolve, reject) => {
        fetch('./program.wasm')
            .then(response => response.arrayBuffer())
            .then(buffer => {
                // 初始化 Wasm 模块；
                Module.wasmBinary = buffer;

                // 加载 Emscripten "胶水"模块；
                var script = document.createElement('script');
                script.src = "./program.js";
                document.body.appendChild(script);

                // 加载完成后初始化像素过滤方法；
                window.onload = function() {
                    var filter = function(pixelData, width, height) {
                        var kernel = [[-1, -1, 1], [-1,  14, -1], [1, -1, -1]];
                        var divisor = 3;
                        const arLen = pixelData.length;
                        const memData = _malloc(arLen * Float32Array.BYTES_PER_ELEMENT);

                        // var memory = new Float32Array(Module.wasmMemory.buffer);
                        // memory.set(pixelData, memData / Float32Array.BYTES_PER_ELEMENT);
                        HEAPF32.set(pixelData, memData / Float32Array.BYTES_PER_ELEMENT);
                        const kerWidth = kernel[0].length;
                        const kerHeight = kernel.length;
                        const kerLen = kerWidth * kerHeight;
                        const flatKernel = kernel.reduce((acc, cur) => acc.concat(cur));
                        const memKernel = _malloc(kerLen * Float32Array.BYTES_PER_ELEMENT);
                        HEAPF32.set(flatKernel, memKernel / Float32Array.BYTES_PER_ELEMENT);
                        _convFilter(memData, width, height, memKernel, 3, 3, divisor, 0, 1);
                        const filtered = HEAPF32.subarray(memData / Float32Array.BYTES_PER_ELEMENT, memData / Float32Array.BYTES_PER_ELEMENT + arLen);
                        _free(memData);
                        _free(memKernel);
                        return filtered;
                    }
                    resolve(filter);
                }
            });
    });
}