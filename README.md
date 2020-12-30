<p align="center"><img src="docs/logo.png" height="100" alt="Skybridge Explorer" /></p>

# Swingby Skybridge Explorer

A SPA for [Swingby Skybridge](https://new-explorer.swingby.vercel.app/)

## Environment

```zsh
$ node -v
v12.18.3
$ yarn -vs
v1.22.4
```

- Next.js: `10.0.0`
- React: `17.0.1`
- TypeScript: `4.0.5`

## Dependencies

### For Application

- [@swingby-protocol/pulsar](https://github.com/SwingbyProtocol/pulsar)
  - Yet another component library based on styled-components
- [@swingby-protocol/sdk](https://github.com/SwingbyProtocol/js-sdk/tree/alpha)
  - JavaScript SDK for Skybridge
- [@swingby-protocol/widget](https://github.com/SwingbyProtocol/widget)
  - Widget for Skybridge Swap service
- [@swingby-protocol/ip-check](https://github.com/SwingbyProtocol/ip-check)
  - Small util to check a user's country by IP and whether access to our product should be restricted
- [bignumber.js](https://github.com/MikeMcl/bignumber.js)
  - A JavaScript library for arbitrary-precision decimal and non-decimal arithmetic
- [bnc-onboard](https://github.com/blocknative/onboard)
  - Client library to onboard users to web3 apps
- [chart.js](https://github.com/chartjs/Chart.js)
  - Simple HTML5 Charts using the 'canvas' tag
- [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2)
  - React wrapper for Chart.js
- [framer-motion](https://github.com/framer/motion)
  - Open source, production-ready animation and gesture library for React
- [jest](https://github.com/facebook/jest)
  - Delightful JavaScript Testing.
- [luxon](https://github.com/moment/luxon)
  - A library for working with dates and times in JS
- [next-seo](https://github.com/garmeeh/next-seo)
  - Next SEO is a plug in that makes managing your SEO easier in Next.js projects.
- [styled-components](https://www.styled-components.com/)
  - Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps
- [polished](https://github.com/styled-components/polished)
  - A lightweight toolset for writing styles in JavaScript
- [react-intl](https://github.com/formatjs/formatjs)
  - The monorepo home to all of the FormatJS related libraries, most notably react-intl.
- [redux](https://github.com/reduxjs/redux)
  - Predictable state container for JavaScript apps
- [react-redux](https://github.com/reduxjs/react-redux)
  - Official React bindings for Redux
- [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)
  - Redux DevTools extension.
- [react-spinners](https://github.com/davidhu2000/react-spinners)
  - A collection of loading spinner components for react
- [react-toastify](https://github.com/fkhadra/react-toastify)
  - React notification made easy
- [web3](https://github.com/ethereum/web3.js)
  - Ethereum JavaScript API

### For Development

- [@swingby-protocol/eslint-config](https://github.com/SwingbyProtocol/eslint-config)
  - ESLint config for Swingby's projects
- [@swingby-protocol/prettier-config](https://github.com/SwingbyProtocol/prettier-config)
  - Prettier config for Swingby's projects
- [cypress](https://github.com/cypress-io/cypress)
  - Fast, easy and reliable testing for anything that runs in a browser.

## Package manager

- [yarn](https://yarnpkg.com/)
  - Fast, reliable, and secure dependency management.

## Vercel & Deployed URL

- [Mainnet](https://vercel.com/swingby/new-explorer-mainnet)
  - https://new-explorer-mainnet.vercel.app/


- [Testnet](https://vercel.com/swingby/new-explorer-testnet)
  - https://testnet.skybridge.info/



## How To Use

```bash
$ yarn
$ yarn dev
```

## Translation

This project is using [react-intl](https://github.com/formatjs/formatjs) to handle
localization. Please refer to `src/modules/i18n/files/LANGUAGE.json` file to add or edit sentences.

## SEO

This project is using [next-seo](https://github.com/garmeeh/next-seo) to handle
SEO settings. Please refer to `src/modules/seo/index.tsx` file to add or edit sentences.

## How To Contribute

This project is using [@swingby-protocol/eslint-config](https://github.com/SwingbyProtocol/eslint-config).
When you push your branch to remote ones, please run `yarn lint` to comply to the code convention.

When you add a new library, please make sure its license is not
[GPL](https://en.wikipedia.org/wiki/GNU_General_Public_License). And please use `-D` for @types.

### References

- [Figma](https://www.figma.com/file/FE8YjY4wHOKySVm6g3rnsH/swingby-rebrand)

