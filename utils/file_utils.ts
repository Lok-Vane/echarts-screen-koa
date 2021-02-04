module.exports = {
    /**
     * 根据文件路径读取内容 异步
     */
    getFileData(path) {
        const fs = require('fs');
        return new Promise((resolve, reject) => {
            // fs.readfilesync
            fs.readFile(path, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },
    /**
     * 根据文件路径读取内容 同步
     */
    getFileDataSync(path) {
        const fs = require('fs');
        try {
            return fs.readFileSync(path, 'utf-8');
        } catch (err) {
            return err;
        }
    },
    /**
     * 根据文件夹路径获取文件路径列表 同步
     */
    getFileListSync(filePath) {
        const fs = require('fs');
        const path = require('path');
        let fileList = [];
        try {
            const tempList = fs.readdirSync(filePath);
            for (const temp of tempList) {
                const filedir = path.join(filePath, temp);
                const isFile = fs.statSync(filedir).isFile();
                const isDir = fs.statSync(filedir).isDirectory();
                if (isFile) {
                    let apirouter = filedir.replace(filePath, '');
                    apirouter = `/data${apirouter}`.replace('\\', '/');
                    fileList.push({ filedir, apirouter });
                }
                if (isDir) {
                    fileList = fileList.concat(arguments.callee(filedir));
                }
            }
            return fileList;
        } catch (err) {
            return err;
        }
    },
    /**
     * 根据文件夹路径获取文件对象 键值对
     */
    getFileAllSync(filePath) {
        const fs = require('fs');
        const path = require('path');
        let fileAll = {};
        try {
            const tempList = fs.readdirSync(filePath);
            for (const temp of tempList) {
                const filedir = path.join(filePath, temp);
                const isFile = fs.statSync(filedir).isFile();
                const isDir = fs.statSync(filedir).isDirectory();
                if (isFile) {
                    let apirouter = filedir.replace(filePath, '');
                    apirouter = `/data${apirouter}`.replace('\\', '/');
                    Reflect.set(fileAll, apirouter, filedir);
                }
                if (isDir) {
                    fileAll = Object.assign(fileAll, arguments.callee(filedir));
                }
            }
            return fileAll;
        } catch (err) {
            return err;
        }
    }
};