import { isBitcoinAddress, isBinanceAddress, isEtherAddress, isAddress } from '..';

it('isBitcoinAddress', () => {
  expect(isBitcoinAddress('tb1q0fzppaflhcju7emf9sh5n5st3c47mwuczwxmt7')).toStrictEqual(true);
  expect(isBitcoinAddress('tb1q0fzppaflhcju7emf9sh5n5st3c47mwuczwxmt')).toStrictEqual(false);
  expect(isBitcoinAddress('DummyAddress')).toStrictEqual(false);
  expect(isBitcoinAddress('tbnb18y6ak4nvd7u89dsyu205jhwaguluxt9l7fklsz')).toStrictEqual(false);
});

it('isBinanceAddress', () => {
  expect(isBinanceAddress('tbnb1lpq6tp2p72js9jjfk7ux8g2qjpm5udzpy4h7k5')).toStrictEqual(true);
  expect(isBinanceAddress('tbnb18y6ak4nvd7u89dsyu205jhwaguluxt9l7fklsz')).toStrictEqual(true);
  expect(isBinanceAddress('dummyAddress')).toStrictEqual(false);
  expect(isBinanceAddress('tb1q0fzppaflhcju7emf9sh5n5st3c47mwuczwxmt')).toStrictEqual(false);
});
it('isEtherAddress', () => {
  expect(isEtherAddress('0xb680c8F33f058163185AB6121F7582BAb57Ef8a7')).toStrictEqual(true);
  expect(isEtherAddress('0xb680c8F33f058163185AB6121F7582BAb57Ef8a71')).toStrictEqual(false);
  expect(isEtherAddress('tb1q0fzppaflhcju7emf9sh5n5st3c47mwuczwxmt')).toStrictEqual(false);
});

it('isAddress', () => {
  expect(isAddress('tbnb18y6ak4nvd7u89dsyu205jhwaguluxt9l7fklsz')).toStrictEqual(true);
  expect(isAddress('tb1q0fzppaflhcju7emf9sh5n5st3c47mwuczwxmt7')).toStrictEqual(true);
  expect(isAddress('0xb680c8F33f058163185AB6121F7582BAb57Ef8a7')).toStrictEqual(true);
  expect(isAddress('m47N1Thc213QqfYCz3PZkjoJpNv5b14kBd')).toStrictEqual(false);
  expect(isAddress('147N1Thc213QqfYCz3PZkjoJpNv5b14kBd')).toStrictEqual(false);
});
