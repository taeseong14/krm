// 출처: https://cafe.naver.com/nameyee/40010

/**
 * stringify(json, null, num || 4)
 * @param {any} json 
 * @param {number} [num=4] 
 * @returns {string}
 */
function ify(json, num) {
    const bl = " ".repeat(num || 4);
    const n = arguments[2] || 1;
    if (Array.isArray(json)) {
        if (!json.length) return "[]";
        return "[\n" + json.map(e => bl.repeat(n) + ify(e, num, n + 1)).join(",\n") + "\n" + bl.repeat(n - 1) + "]";
    } else if (typeof json === "string") {
        if (json.startsWith("{") && json.endsWith("}"))
            try {
                return '`' + ify(JSON.parse(json), num, n).replace(/\\/g, '\\\\').replace(/\"/g, '\\"').replace(/\n/g, '\\\n') + '`';
            } catch (e) { }
        return '"' + json.replace(/\"/g, '\\"').replace(/\n/g, '\\\n') + '"';
    } else if (typeof json === "object") {
        if (json === null) return null;
        if (json.constructor.name.match(/^HTML\w+Element$/))
            return "<" + json.localName + (json.id ? ' id="' + json.id + '"' : "") + (json.className ? ' class="' + json.className + '"' : "") + ">";
        if (!Object.keys(json).length) return "{}";
        return "{\n" + Object.keys(json).map(k => {
            let val = ify(json[k], num, n + 1);
            return bl.repeat(n) + '"' + k + '": ' + val;
        }).join(",\n") + "\n" + bl.repeat(n - 1) + "}";
    } else if (typeof json === "function") return "function " + json.name + "() { [native code] }";
    else return String(json);
}

module.exports = ify;