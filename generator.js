function* createIterator(items) {
  yield 1;
  yield 2;
  yield 3;
}
const i = createIterator();
console.log(i.next());
console.log(i.next());
console.log(i.next());
console.log(i.next());
console.log(i.next());

const s = new Set([1, 2, 3, 3, 4, 5, 6, 7, 7]);
for (let v of s) {
  console.log(v);
}
