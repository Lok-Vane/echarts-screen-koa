/**
 * 中间件3：业务逻辑
 */
const path = require('path');
const fileUtils = require('../utils/file_utils.ts');
const filePath = path.join(__dirname, '../data');
// const fileList = fileUtils.getFileListSync(filePath);
const fileAll = fileUtils.getFileAllSync(filePath);

// global['KoaRouter'].get('/home', async (ctx, next) => {
//     ctx.response.body = {
//         msg: 'home'
//     };
//     await next();
// });

// global['KoaRouter'].post('/search', async (ctx, next) => {
//     ctx.set('Content-Type', 'application/xml; charset=utf-8');
//     ctx.response.body = `
//     <data>
//         <code>863634795</code>
//         <name>Lok Vane</name>
//     </data>
//     `;
//     // ctx.response.body = 'lokvane';
//     // ctx.response.body = { name: 'lok' };
//     await next();
// });

// for (const item of fileList) {
//     global['KoaRouter'].get(item.apirouter, async (ctx, next) => {
//         // const result = await fileUtils.getFileData(item.filedir);
//         const result = fileUtils.getFileDataSync(item.filedir);
//         ctx.status = 200;
//         ctx.response.body = result;
//         await next();
//     });
// }

for (const apitouter in fileAll) {
    global['KoaRouter'].get(apitouter, async (ctx, next) => {
        const result = fileUtils.getFileDataSync(Reflect.get(fileAll, apitouter));
        ctx.status = 200;
        ctx.response.body = result;
        await next();
    })
}
