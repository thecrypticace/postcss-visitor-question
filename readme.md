
1. Step 1:
```
npm install
npm run dev
```

2. Look at the output
```
1. This `Rule` visitor from a nested plugin does run
2. This `Once` visitor from a later plugin runs
```

There should be three listed but because of the way we're running postcss internally it breaks further uses of the visitor API.