# Rx add-ons

[![NPM version][npm-image]][npm-url]

## Installation

```bash
$ npm i rxjs-addons -S
```

## Example usage

### `AttributesProxySubject`

```js
import { AttributesProxySubject } from "rxjs-addons";
const subject = new AttributesProxySubject({
  a: 1,
  b: 2,
}, {
  schema: {
    a: {
      getter: true,
      setter: true
    },
    b: {
      subject,
    },
  },
});

console.log(subject.a) // 1
console.log(subject.b) // undefined

subject.b$.subscribe((value) => console.log("b:", value));

/*
  b: 2
 */

```

### `ErrorSubject`

```js
import { ErrorSubject } from "rxjs-addons";
const subject = new ErrorSubject();

subject.subscribe((err) => console.error(err));

// regular catch
try {
  throw new Error("Error");
} catch (err) {
  subject.error(err); // or errorSubject.next(err); 
}

// wrapping promise or async function 
subject.wrapAsync(async () => {
  throw new Error("Error");
});
subject.wrapAsync(Promise.reject(new Error("Error")));

// wrapping promise or async function and return promise
subject
  .wrapTAsync<string>(async () => {
    ... // 
    return "value";
  })
  .then((value) => console.log(value));
```

### `UniqueBehaviorSubject`

```js
import { UniqueBehaviorSubject } from "rxjs-addons";
const subject = new UniqueBehaviorSubject(1); // with default value

console.log(subject.value); // 1

subject.next(2);
subject.next(2);
subject.next(2);
subject.next(3);
subject.next(3);

subject.subscribe((value) => console.log("value:", value));

/*
  value: 1
  value: 2
  value: 3
 */

```

## Testing

```bash
$ npm test
```

## License

The MIT License

[npm-image]: https://badge.fury.io/js/rxjs-addons.svg
[npm-url]: http://npmjs.com/package/rxjs-addons