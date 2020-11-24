import { combineReducers } from 'redux';

import { explorer } from './explorer';
import { pool } from './pool';

export const rootReducer = combineReducers({ explorer, pool });
