/**
 * 中间件1：计算服务器消耗总时长
 */

module.exports = async (ctx, next) => {
    // console.log(ctx.request.method);
    const startTime = Date.now();
    await next();
    const endTime = Date.now();
    // 设置响应头的响应时长
    ctx.set('X-Response-Time', `${endTime - startTime}ms`);
}