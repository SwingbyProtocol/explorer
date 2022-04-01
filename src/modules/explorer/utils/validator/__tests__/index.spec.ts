import { isAddress, isBitcoinAddress, isEtherAddress } from '..';

const bitcoinAddress = 'tb1q0fzppaflhcju7emf9sh5n5st3c47mwuczwxmt7';
const wrongBitcoinAddress = 'tb1q0fzppaflhcju7emf9sh5n5st3c47mwuczwxmt';

const bep2Address = 'tbnb18y6ak4nvd7u89dsyu205jhwaguluxt9l7fklsz';

const erc20Address = '0xb680c8F33f058163185AB6121F7582BAb57Ef8a7';
const wrongErc20Address = '0xb680c8F33f058163185AB6121F7582BAb57Ef8a7123';

it('isBitcoinAddress', () => {
  expect(isBitcoinAddress(bitcoinAddress)).toStrictEqual(true);
  expect(isBitcoinAddress(wrongBitcoinAddress)).toStrictEqual(false);
  expect(isBitcoinAddress('DummyAddress')).toStrictEqual(false);
  expect(isBitcoinAddress(bep2Address)).toStrictEqual(false);
});

it('isEtherAddress', () => {
  expect(isEtherAddress(erc20Address)).toStrictEqual(true);
  expect(isEtherAddress(wrongErc20Address)).toStrictEqual(false);
  expect(isEtherAddress(wrongBitcoinAddress)).toStrictEqual(false);
});

it('isAddress', () => {
  expect(isAddress(bep2Address)).toStrictEqual(true);
  expect(isAddress(bitcoinAddress)).toStrictEqual(true);
  expect(isAddress(erc20Address)).toStrictEqual(true);
  expect(isAddress(wrongBitcoinAddress)).toStrictEqual(false);
});
