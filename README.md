# Rx add-ons

[![NPM version][npm-image]][npm-url]

## Installation

```bash
$ npm i rxjs-addons -S
```

## Usage

### `AttributesProxySubject`

(COMING SOON)

### `ErrorSubject`

```typescript
import { ErrorSubject } from "rxjs-addons";
const errorSubject = new ErrorSubject();

errorSubject.subscribe((err) => console.error(err));

// regular catch
try {
  throw new Error("Error");
} catch (err) {
  errorSubject.error(err); // or errorSubject.next(err); 
}

// wrapping promise or async function 
errorSubject.wrapAsync(async () => {
  throw new Error("Error");
});
errorSubject.wrapAsync(Promise.reject(new Error("Error")));

// wrapping promise or async function and return promise
errorSubject
  .wrapTAsync<string>(async () => {
    ... // 
    return "value";
  })
  .then((value) => console.log(value));
```

### `UniqueBehaviorSubject`

(COMING SOON)

## Testing

```bash
$ npm test
```

## License

The MIT License

[npm-image]: https://badge.fury.io/js/rxjs-addons.svg
[npm-url]: http://npmjs.com/package/rxjs-addons