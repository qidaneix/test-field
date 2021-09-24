/**
 * 不就是个小小的Promise嘛，办他！
 */
class Promise {
  callbacks = [];
  state = "pending"; // 状态机 pending|fulfilled|rejected
  value;
  constructor(fn) {
    fn(this._resolved.bind(this), this._rejected.bind(this));
  }
  then(fulfilledFn, rejectedFn) {
    return new Promise((resolve, reject) => {
      this._handle({
        fulfilledFn: fulfilledFn || null,
        rejectedFn: rejectedFn || null,
        resolve,
        reject,
      });
    });
  }
  _handle(callBack) {
    // pending状态，存储then传递进来的函数
    if (this.state === "pending") {
      this.callbacks.push(callBack);
      return;
    }
    if (this.state === "fulfilled") {
      if (!callBack.fulfilledFn) {
        callBack.resolve(this.value);
        return;
      }
      const ret = callBack.fulfilledFn(this.value);
      callBack.resolve(ret);
      return;
    }
    if (this.state === "rejected") {
      if (!callBack.rejectedFn) {
        callBack.reject(this.value);
        return;
      }
      const ret = callBack.rejectedFn(this.value);
      callBack.reject(ret);
      return;
    }
  }
  _resolved(value) {
    // new Promise((resolve,reject) => void) 中resolve函数被执行，说明状态切换
    this.state = "fulfilled";
    this.value = value;
    this.callbacks.forEach((fn) => this._handle(fn));
  }
  _rejected(reason) {
    // new Promise((resolve,reject) => void) 中reject函数被执行，说明状态切换
    this.state = "rejected";
    this.value = reason;
    this.callbacks.forEach((fn) => this._handle(fn));
  }
  catch(fn) {
    return this.then(null, fn);
  }
  //   finally(fn) {
  //     return this.then();
  //   }
}

// 测试
const p = new Promise((resolve) => {
  resolve(100);
});
p.then((res) => {
  console.log("1", res);
}).then((res) => {
  console.log("2", res);
});
p.then((res) => {
  console.log("3", res);
});

// const p = Promise.resolve(2);
// p.then((r) => {
//   console.log(r);
//   return Promise.resolve(3);
// })
//   .then((r) => {
//     console.log(r);
//     return Promise.reject(4);
//   })
//   .finally((x) => {
//     console.log(x);
//   })
//   .catch((r) => {
//     console.log(r);
//     return Promise.reject(5);
//   })
//   .catch((r) => {
//     console.log(r);
//     return Promise.resolve(6);
//   })
//   .then((r) => {
//     console.log(r);
//   });

// p.then((r) => {
//   console.log("rrr", r);
//   return Promise.resolve(3);
// });
