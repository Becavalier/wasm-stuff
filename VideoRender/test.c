#include <libavutil/base64.h>
#include <emscripten/emscripten.h>

typedef unsigned char uint8_t;

uint8_t hash[1024];
char input_buffer[AV_BASE64_SIZE(sizeof(hash))] = "FFMPEG_BASE64";

char* EMSCRIPTEN_KEEPALIVE retrive_buffer_pointer () {
    return input_buffer;
}

uint8_t* EMSCRIPTEN_KEEPALIVE retrive_hash_pointer () {
    return hash;
}

void EMSCRIPTEN_KEEPALIVE base64_process () {
    av_base64_encode(input_buffer, sizeof(input_buffer), hash, sizeof(hash));
}
