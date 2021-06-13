const koa = require('koa')
const app = new koa()
const Router = require('koa-router')
const path = require('path')
const cors = require('@koa/cors');




app.use(cors());

const router = new Router();
app.use(router.routes());


function sleep(time){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve()
    }, time )
  })
}


router.get('/todoList', async ctx => {
  // throw new Error('test');
  // ctx.throw(501)
  await sleep(5000);
  ctx.body = {
    data: [
      {
        toDoName: '吃法2',
        id: Math.random(),
        isDone: false
      },
      {
        toDoName: '洗澡',
        id: Math.random(),
        isDone: true
      },
      {
        toDoName: '学习',
        id: Math.random(),
        isDone: false
      },
    ],
    // message: 'error',
    message: 'success'

  }


})

router.get('/person', async ctx => {
  // throw new Error('test');
  // ctx.throw(501)
  await sleep(4000);
  ctx.body = {
    data: [
      {
        name: '小明',
        id: Math.random(),
        isDone: false
      },
      {
        name: '小红',
        id: Math.random(),
        isDone: true
      }
    ],
    // message: 'error',
    message: 'success'

  }


})



app.listen(7778, () => {
  console.log('启动成功')
  console.log('http://localhost:7778')
});
