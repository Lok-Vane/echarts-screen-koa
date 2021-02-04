const Koa = require('koa');
const KoaCors = require('@koa/cors');
const app = new Koa();
const port = 3000;
global['KoaRouter'] = require('@koa/router')();

const resDurationModdleWare = require('./middleware/koa_response_duration.ts');
const resHeaderModdleWare = require('./middleware/koa_response_header.ts');
const resDataModdleWare = require('./middleware/koa_response_data.ts');
const cors = KoaCors({
    origin: 'http://127.0.0.1:5500'
});

// app.use(async (ctx, next) => {
//     ctx.set('Access-Control-Allow-Origin', '*');
//     ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,DELETE,PUT');
//     await next();
// }); // koa原生设置cors的方式

// app.use(cors);
app.use(KoaCors()); // KoaCors()不带参数代表允许所有跨域
app.use(resDurationModdleWare);
app.use(resHeaderModdleWare);
app.use(global['KoaRouter'].routes());


app.listen(port, () => {
    console.log(`app.ts is start at port ${port}`);
});

const websocketService = require('./service/web_socket_service.ts');
websocketService.listen();

