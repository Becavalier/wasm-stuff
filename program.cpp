#include <emscripten/emscripten.h>
#include <stack>

// 定义数组大小
#define N 100

// 防止 C++ 函数名被 Mangling
#ifdef __cplusplus
extern "C" {
#endif
    // 预置函数，暴露给 JS 进行处理
    extern void printStr(char* offset, int length);
    extern void printInt(int number);
    extern void printArr(int* offset, int length);

    int array[N];
    // 返回数组在内存中的偏移地址
    int* EMSCRIPTEN_KEEPALIVE getArrayOffset() {
      return array;
    }

    void push2(std::stack<int> &stack, int left, int right) {
        stack.push(right);
        stack.push(left);
    }

    void quicksort(int sortArray[], int leftPart, int rightPart) {
        std::stack<int> stack;
        push2(stack, leftPart, rightPart);
        int lwalker, rwalker, mid;

        while(!stack.empty()) {
            int left = stack.top(); stack.pop();
            int right = stack.top(); stack.pop();
            lwalker = left;
            rwalker = right;
            mid = sortArray[(lwalker + rwalker) / 2];

            while(lwalker < rwalker) {
                while(sortArray[lwalker] < mid) lwalker++;
                while(sortArray[rwalker] > mid) rwalker--;

                if(lwalker <= rwalker) {
                    int tmp = sortArray[lwalker];
                    sortArray[lwalker] = sortArray[rwalker];
                    sortArray[rwalker] = tmp;
                    lwalker++;
                    rwalker--;
                }
            }

            if(lwalker < right) push2(stack, lwalker, right);
            if(rwalker > left) push2(stack, left, rwalker);
        }
    }

    void EMSCRIPTEN_KEEPALIVE sort () {
        quicksort(array, 0, N - 1);
        // printArr(array, N);
    }

    void EMSCRIPTEN_KEEPALIVE test_printInt () {
        printInt(N);
    }

    void EMSCRIPTEN_KEEPALIVE test_printStr () {
         char str[] = "test_printStr";
         printStr(str, 13);
    }
#ifdef __cplusplus
}
#endif