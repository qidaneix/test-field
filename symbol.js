const obj = {
  [Symbol("a")]: "A",
  [Symbol("b")]: "B",
  [Symbol("c")]: "C",
  x: "X",
  y: "Y",
  z: "Z",
};

Object.defineProperty(obj, "r", {
  enumerable: false,
  configurable: true,
  writable: true,
  value: "R",
});
const p = Symbol("p");
Object.defineProperty(obj, p, {
  enumerable: false,
  configurable: true,
  writable: true,
  value: "P",
});
Object.defineProperty(obj, "q", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: "Q",
});
const proto = obj.__proto__;
console.log(Object.getOwnPropertyDescriptor(obj, p));
console.log(Object.keys(obj));
console.log(Object.getOwnPropertyNames(obj));
console.log(Object.getOwnPropertySymbols(obj));
console.log(Object.getOwnPropertyDescriptors(obj));
