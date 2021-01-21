# Eclair TS

A TypeScript client for interacting with [eclair](https://github.com/ACINQ/eclair) implementations of the Lightning Network.

Both this repo and eclair are under heavy construction, so expect breakages and issues with the type definition. PRs welcome!

## Getting Started

### Installation

```
npm i eclair-ts
```

### Usage

```ts
import EclairTs from "eclair-ts";

const carolConfig = {
  url: "127.0.0.1:8283",
  headers: {
    Authorization: "Basic OmVjbGFpcnB3",
  },
};

(async () => {
  const carol = new EclairTs(carolConfig);

  // You can make requests to the node directly:
  const info = await carol.getInfo();
  console.log("info about this node:");
  console.log(info);

  // Or, you can listen for messages from the Eclair node:
  const listener = carol.listen();
  listener.on("message", (data) => {
    console.log("Message received from node:");
    console.log(data);
  });
})();
```
