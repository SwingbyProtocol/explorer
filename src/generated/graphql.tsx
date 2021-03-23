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
  /** A number without precision limits. */
  Decimal: string;
  /** A timestamp. */
  DateTime: string;
};



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
  receivingAddress: Scalars['String'];
  receivingAmount: Scalars['Decimal'];
  receivingTxHash?: Maybe<Scalars['String']>;
  receivingCurrency: TransactionCurrency;
  feeCurrency: TransactionCurrency;
  feeTotal: Scalars['Decimal'];
};

export enum TransactionType {
  Swap = 'SWAP',
  Deposit = 'DEPOSIT',
  Withdrawal = 'WITHDRAWAL'
}

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

export enum Bridge {
  BtcErc = 'btc_erc',
  BtcBep = 'btc_bep'
}

export enum TransactionCurrency {
  Btc = 'BTC',
  Wbtc = 'WBTC',
  SbBtc = 'sbBTC'
}

export type TransactionsConnection = {
  __typename?: 'TransactionsConnection';
  totalCount: Scalars['Int'];
  edges: Array<TransactionsConnectionEdges>;
  pageInfo: ForwardPaginationPageInfo;
};

export type TransactionsQueryWhere = {
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<Array<TransactionType>>;
  status?: Maybe<Array<TransactionStatus>>;
  /** Return transactions that occurred at this timestamp or later. */
  since?: Maybe<Scalars['DateTime']>;
  /** Return transactions that occurred at this timestamp or earlier. */
  until?: Maybe<Scalars['DateTime']>;
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

export type TransactionsConnectionEdges = {
  __typename?: 'TransactionsConnectionEdges';
  node: Transaction;
  cursor: Scalars['String'];
};

export type ForwardPaginationPageInfo = {
  __typename?: 'ForwardPaginationPageInfo';
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
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
  where?: Maybe<TransactionsQueryWhere>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryNodesArgs = {
  bridge?: Maybe<Array<Bridge>>;
};

export type TransactionsHistoryQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<TransactionsQueryWhere>;
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
        & Pick<Transaction, 'id' | 'status' | 'at' | 'depositAddress' | 'depositCurrency' | 'depositTxHash' | 'depositAmount' | 'receivingAddress' | 'receivingCurrency' | 'receivingAmount' | 'receivingTxHash' | 'feeTotal' | 'feeCurrency'>
      ) }
    )>, pageInfo: (
      { __typename?: 'ForwardPaginationPageInfo' }
      & Pick<ForwardPaginationPageInfo, 'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'>
    ) }
  ) }
);

export interface ITransactionHistory {
  depositAddress: string;
  depositAmount: string;
  depositTxHash?: string;
  depositCurrency: string;
  receivingAddress: string;
  receivingAmount: string;
  receivingTxHash?: string;
  receivingCurrency: string;
  feeCurrency: string;
  feeTotal: string;
  id: string;
  at: string;
  status: TransactionStatus;
}


export const TransactionsHistoryDocument = gql`
    query TransactionsHistory($first: Int, $after: String, $last: Int, $before: String, $where: TransactionsQueryWhere) {
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
