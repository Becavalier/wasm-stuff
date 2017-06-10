mergeInto(LibraryManager.library, {
    printStr: function (offset, length) {
        var str = '';
        var arr = [];
        for (var i = 0; i < length; i++) {
            arr.push(Module.getValue(offset + i, 'i8'));
        }
        console.log(new TextDecoder().decode(new Uint8Array(arr)));
    },
    printArr: function (offset, length) {
        var str = '';
        var arr = [];
        for (var i = 0; i < length; i++) {
            arr.push(Module.getValue(offset + 4 * i, 'i32'));
        }
        console.log(arr);
    },
    printInt: function (int) {
        console.log(int);
    }
});