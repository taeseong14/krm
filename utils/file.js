(function () {
    /**
     * Returns Formatted Path
     * @param {string} path 
     * @returns {string}
     */
    function formatPath(path) {
        if (path.startsWith('../')) path = '/sdcard/' + path.slice(3);
        else if (path.startsWith('./')) path = '/sdcard/msgbot/files/' + path.slice(2);
        else if (path.startsWith('/')) path = '/sdcard/msgbot/' + path;
        else path = '/sdcard/msgbot/files/' + path;
        return path;
    }

    /**
     * read a file
     * @param {string} path 
     * @return {string | null}
     */
    function read(path) {
        path = formatPath(path);
        let file = FileStream.read(path) || FileStream.read(path + '.txt') || FileStream.read(path + '.json');
        return file;
    }

    /**
     * write a file
     * @param {string} path 
     * @param {string} text 
     * @returns {void}
     */
    function write(path, text) {
        path = formatPath(path);
        FileStream.write(path, text);
    }

    /**
     * read a file as json
     * @param {string} path 
     * @returns {object | any[] | null}
     */
    function readJson(path) {
        path = formatPath(path);
        let file = FileStream.read(path) || FileStream.read(path + '.json') || FileStream.read(path + '.txt');
        try {
            return JSON.parse(file);
        } catch (e) {
            throw new Error('readJson - JSON.parse error: ' + e);
        }
    }

    /**
     * write a file as json
     * @param {string} path 
     * @param {object} obj 
     * @returns {void}
     */
    function writeJson(path, obj) {
        path = formatPath(path);
        if (!path.endsWith('.json')) path += '.json';
        FileStream.write(path, JSON.stringify(obj));
    }


    module.exports = {
        read: read,
        write: write,
        readJson: readJson,
        writeJson: writeJson
    };
})();