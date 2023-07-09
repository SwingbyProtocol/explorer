import { combineReducers } from 'redux';

import { explorer } from './explorer';
import { liquidity } from './liquidity';
import { pool } from './pool';
import { settings } from './settings';

export const rootReducer = combineReducers({ explorer, liquidity, pool, settings });
