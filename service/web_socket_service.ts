module.exports.listen = () => {
    const _webSocket = require('ws');
    const port = 3001;
    // 创建websocket对象
    const wss = new _webSocket.Server({
        port,
        verifyClient: ClientVerify
    }, console.log(`webSocket is start at port ${port}`));

    const path = require('path');
    const fileUtils = require('../utils/file_utils.ts');
    const filePath = path.join(__dirname, '../data');
    const fileAll = fileUtils.getFileAllSync(filePath);
    const url = require('url');

    function ClientVerify(info) {
        let ret = false;
        const query = url.parse(info.req.url, true).query;
        if (query.token === '4dgfNt%t7YN8nY9M9^V4') {
            ret = true;
        }
        return ret;
        // return true;
    }

    // 监听客户端的连接事件
    // client代表客户端连接的socket对象
    wss.on('connection', client => {
        // console.log(client);
        // console.log(client._protocol);

        console.log('客户端连接成功！');

        // console.log(client);
        // client.close(); // 关闭连接
        // 对客户端的连接对象进行message监听
        // msg代表由客户端发送至服务端的数据

        client.on('message', msg => {
            const _msg = JSON.parse(msg);

            const getData = () => {
                const chartName = _msg.chartName; // trend seller map china......
                const apirouter = `/data/${chartName}.json`;
                const filedir = Reflect.get(fileAll, apirouter);
                const jsonData = fileUtils.getFileDataSync(filedir);
                Reflect.set(_msg, 'data', JSON.parse(jsonData)); // 服务端获取到的数据基础上，增加data字段，即响应内容
                client.send(JSON.stringify(_msg));
            };

            const otherRequest = () => {
                // 代表所有连接的客户端
                wss.clients.forEach(_client => {
                    _client.send(msg);
                });
            };

            switch (_msg.action) {
                case 'getData':
                    getData();
                    break;
                default:
                    otherRequest();
                    break;
            }
        });
        client.on('close', e => {
            console.log('连接关闭', e);
        });
    });
}