const p = Promise.resolve(2);
p.then((r) => {
  console.log(r);
  return Promise.resolve(3);
})
  .then((r) => {
    console.log(r);
    return Promise.reject(4);
  })
  .finally((x) => {
    console.log(x);
  })
  .catch((r) => {
    console.log(r);
  })
  .catch((r) => {
    console.log(r);
  });

p.then((r) => {
  console.log("rrr", r);
  return Promise.resolve(3);
});
