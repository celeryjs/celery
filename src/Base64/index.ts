/**
 * Simple Base64 encoder/decoder
 */
export class StringBase64 {
    private textEncoder = new TextEncoder();
    private textDecoder = new TextDecoder();

    encode(input: string | undefined) {
        if(!input) return  ""
        const bytes = this.textEncoder.encode(input)
        const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join("")
        return btoa(binString)
    }

    decode(input: string | undefined) {
        if(!input) return ""

        const binString = atob(input)
        // @ts-expect-error
        const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0))
        return this.textDecoder.decode(bytes)
    }
}
