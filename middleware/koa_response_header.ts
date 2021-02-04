
/**
 * 中间件2：响应头
 */

module.exports = async (ctx, next) => {
    ctx.set('Content-Type', 'application/json; charset=utf-8');
    // ctx.response.body = '{"success": true,"message": "Lok Vane"}';
    await next();
}