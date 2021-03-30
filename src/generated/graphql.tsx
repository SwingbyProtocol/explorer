import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A timestamp. */
  DateTime: string;
  /** A number without precision limits. */
  Decimal: string;
};

export enum Bridge {
  BtcErc = 'btc_erc',
  BtcBep20 = 'btc_bep20'
}

export type BridgeEnumFilter = {
  equals?: Maybe<Bridge>;
  in?: Maybe<Array<Maybe<Bridge>>>;
  not?: Maybe<BridgeEnumFilter>;
  notIn?: Maybe<Array<Maybe<Bridge>>>;
};


export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<DateTimeFilter>;
  notIn?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
};


export type DecimalFilter = {
  equals?: Maybe<Scalars['Decimal']>;
  gt?: Maybe<Scalars['Decimal']>;
  gte?: Maybe<Scalars['Decimal']>;
  in?: Maybe<Array<Maybe<Scalars['Decimal']>>>;
  lt?: Maybe<Scalars['Decimal']>;
  lte?: Maybe<Scalars['Decimal']>;
  not?: Maybe<DecimalFilter>;
  notIn?: Maybe<Array<Maybe<Scalars['Decimal']>>>;
};

export type ForwardPaginationPageInfo = {
  __typename?: 'ForwardPaginationPageInfo';
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type Node = {
  __typename?: 'Node';
  id: Scalars['ID'];
  bridge: Bridge;
  status: NodeStatus;
  ip: Scalars['String'];
  version: Scalars['String'];
  moniker: Scalars['String'];
  restUri: Scalars['String'];
  p2pUri: Scalars['String'];
  address1: Scalars['String'];
  address2: Scalars['String'];
  lastSeenAt: Scalars['DateTime'];
  bondAddress: Scalars['String'];
  bondAmount: Scalars['Decimal'];
  bondExpiresAt: Scalars['DateTime'];
};

export enum NodeStatus {
  ChurnedIn = 'CHURNED_IN',
  MayChurnIn = 'MAY_CHURN_IN',
  MayChurnOutBondTooLow = 'MAY_CHURN_OUT__BOND_TOO_LOW',
  MayChurnOutBondExpiring = 'MAY_CHURN_OUT__BOND_EXPIRING',
  InactiveBondTooLow = 'INACTIVE__BOND_TOO_LOW',
  InactiveBondExpired = 'INACTIVE__BOND_EXPIRED'
}

export type Query = {
  __typename?: 'Query';
  transaction: Transaction;
  transactions: TransactionsConnection;
  nodes: Array<Node>;
};


export type QueryTransactionArgs = {
  id: Scalars['ID'];
};


export type QueryTransactionsArgs = {
  where?: Maybe<TransactionWhereInput>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryNodesArgs = {
  bridge?: Maybe<Array<Bridge>>;
};

export type StringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  mode?: Maybe<StringFilterMode>;
  not?: Maybe<StringFilter>;
  notIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  startsWith?: Maybe<Scalars['String']>;
};

export enum StringFilterMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['ID'];
  at: Scalars['DateTime'];
  type: TransactionType;
  status: TransactionStatus;
  bridge: Bridge;
  depositAddress: Scalars['String'];
  depositAmount: Scalars['Decimal'];
  depositTxHash?: Maybe<Scalars['String']>;
  depositCurrency: TransactionCurrency;
  sendingAddress?: Maybe<Scalars['String']>;
  receivingAddress: Scalars['String'];
  receivingAmount: Scalars['Decimal'];
  receivingTxHash?: Maybe<Scalars['String']>;
  receivingCurrency: TransactionCurrency;
  feeCurrency: TransactionCurrency;
  feeTotal: Scalars['Decimal'];
};

export enum TransactionCurrency {
  Btc = 'BTC',
  WbtcErc20 = 'WBTC__ERC20',
  SbBtcErc20 = 'sbBTC__ERC20',
  BtcbBep20 = 'BTCB__BEP20',
  SbBtcBep20 = 'sbBTC__BEP20'
}

export type TransactionCurrencyEnumFilter = {
  equals?: Maybe<TransactionCurrency>;
  in?: Maybe<Array<Maybe<TransactionCurrency>>>;
  not?: Maybe<TransactionCurrencyEnumFilter>;
  notIn?: Maybe<Array<Maybe<TransactionCurrency>>>;
};

export enum TransactionStatus {
  Waiting = 'WAITING',
  Pending = 'PENDING',
  Signing = 'SIGNING',
  Sending = 'SENDING',
  Completed = 'COMPLETED',
  SigningRefund = 'SIGNING_REFUND',
  SendingRefund = 'SENDING_REFUND',
  Refunded = 'REFUNDED',
  Expired = 'EXPIRED'
}

export type TransactionStatusEnumFilter = {
  equals?: Maybe<TransactionStatus>;
  in?: Maybe<Array<Maybe<TransactionStatus>>>;
  not?: Maybe<TransactionStatusEnumFilter>;
  notIn?: Maybe<Array<Maybe<TransactionStatus>>>;
};

export enum TransactionType {
  Swap = 'SWAP',
  Deposit = 'DEPOSIT',
  Withdrawal = 'WITHDRAWAL'
}

export type TransactionTypeEnumFilter = {
  equals?: Maybe<TransactionType>;
  in?: Maybe<Array<Maybe<TransactionType>>>;
  not?: Maybe<TransactionTypeEnumFilter>;
  notIn?: Maybe<Array<Maybe<TransactionType>>>;
};

export type TransactionWhereInput = {
  AND?: Maybe<Array<Maybe<TransactionWhereInput>>>;
  NOT?: Maybe<Array<Maybe<TransactionWhereInput>>>;
  OR?: Maybe<Array<Maybe<TransactionWhereInput>>>;
  id?: Maybe<StringFilter>;
  type?: Maybe<TransactionTypeEnumFilter>;
  status?: Maybe<TransactionStatusEnumFilter>;
  bridge?: Maybe<BridgeEnumFilter>;
  depositAddress?: Maybe<StringFilter>;
  depositTxHash?: Maybe<StringFilter>;
  depositCurrency?: Maybe<TransactionCurrencyEnumFilter>;
  depositAmount?: Maybe<DecimalFilter>;
  sendingAddress?: Maybe<StringFilter>;
  receivingAddress?: Maybe<StringFilter>;
  receivingTxHash?: Maybe<StringFilter>;
  receivingCurrency?: Maybe<TransactionCurrencyEnumFilter>;
  receivingAmount?: Maybe<DecimalFilter>;
  feeCurrency?: Maybe<TransactionCurrencyEnumFilter>;
  feeTotal?: Maybe<DecimalFilter>;
  at?: Maybe<DateTimeFilter>;
};

export type TransactionsConnection = {
  __typename?: 'TransactionsConnection';
  totalCount: Scalars['Int'];
  edges: Array<TransactionsConnectionEdges>;
  pageInfo: ForwardPaginationPageInfo;
};

export type TransactionsConnectionEdges = {
  __typename?: 'TransactionsConnectionEdges';
  node: Transaction;
  cursor: Scalars['String'];
};

export type TransactionDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TransactionDetailsQuery = (
  { __typename?: 'Query' }
  & { transaction: (
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'status' | 'at' | 'sendingAddress' | 'depositAddress' | 'depositCurrency' | 'depositAmount' | 'depositTxHash' | 'receivingAddress' | 'receivingCurrency' | 'receivingAmount' | 'receivingTxHash' | 'feeTotal' | 'feeCurrency'>
  ) }
);

export type TransactionsHistoryQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<TransactionWhereInput>;
}>;


export type TransactionsHistoryQuery = (
  { __typename?: 'Query' }
  & { transactions: (
    { __typename?: 'TransactionsConnection' }
    & Pick<TransactionsConnection, 'totalCount'>
    & { edges: Array<(
      { __typename?: 'TransactionsConnectionEdges' }
      & Pick<TransactionsConnectionEdges, 'cursor'>
      & { node: (
        { __typename?: 'Transaction' }
        & Pick<Transaction, 'id' | 'status' | 'at' | 'sendingAddress' | 'depositAddress' | 'depositCurrency' | 'depositAmount' | 'depositTxHash' | 'receivingAddress' | 'receivingCurrency' | 'receivingAmount' | 'receivingTxHash' | 'feeTotal' | 'feeCurrency'>
      ) }
    )>, pageInfo: (
      { __typename?: 'ForwardPaginationPageInfo' }
      & Pick<ForwardPaginationPageInfo, 'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'>
    ) }
  ) }
);


export const TransactionDetailsDocument = gql`
    query TransactionDetails($id: ID!) {
  transaction(id: $id) {
    id
    status
    at
    sendingAddress
    depositAddress
    depositCurrency
    depositAmount
    depositTxHash
    receivingAddress
    receivingCurrency
    receivingAmount
    receivingTxHash
    feeTotal
    feeCurrency
  }
}
    `;

/**
 * __useTransactionDetailsQuery__
 *
 * To run a query within a React component, call `useTransactionDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTransactionDetailsQuery(baseOptions: Apollo.QueryHookOptions<TransactionDetailsQuery, TransactionDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionDetailsQuery, TransactionDetailsQueryVariables>(TransactionDetailsDocument, options);
      }
export function useTransactionDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionDetailsQuery, TransactionDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionDetailsQuery, TransactionDetailsQueryVariables>(TransactionDetailsDocument, options);
        }
export type TransactionDetailsQueryHookResult = ReturnType<typeof useTransactionDetailsQuery>;
export type TransactionDetailsLazyQueryHookResult = ReturnType<typeof useTransactionDetailsLazyQuery>;
export type TransactionDetailsQueryResult = Apollo.QueryResult<TransactionDetailsQuery, TransactionDetailsQueryVariables>;
export const TransactionsHistoryDocument = gql`
    query TransactionsHistory($first: Int, $after: String, $last: Int, $before: String, $where: TransactionWhereInput) {
  transactions(
    first: $first
    after: $after
    last: $last
    before: $before
    where: $where
  ) {
    totalCount
    edges {
      node {
        id
        status
        at
        sendingAddress
        depositAddress
        depositCurrency
        depositAmount
        depositTxHash
        receivingAddress
        receivingCurrency
        receivingAmount
        receivingTxHash
        feeTotal
        feeCurrency
      }
      cursor
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
    `;

/**
 * __useTransactionsHistoryQuery__
 *
 * To run a query within a React component, call `useTransactionsHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsHistoryQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useTransactionsHistoryQuery(baseOptions?: Apollo.QueryHookOptions<TransactionsHistoryQuery, TransactionsHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionsHistoryQuery, TransactionsHistoryQueryVariables>(TransactionsHistoryDocument, options);
      }
export function useTransactionsHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsHistoryQuery, TransactionsHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionsHistoryQuery, TransactionsHistoryQueryVariables>(TransactionsHistoryDocument, options);
        }
export type TransactionsHistoryQueryHookResult = ReturnType<typeof useTransactionsHistoryQuery>;
export type TransactionsHistoryLazyQueryHookResult = ReturnType<typeof useTransactionsHistoryLazyQuery>;
export type TransactionsHistoryQueryResult = Apollo.QueryResult<TransactionsHistoryQuery, TransactionsHistoryQueryVariables>;