import { combineReducers } from 'redux';

import { explorer } from './explorer';
import { pool } from './pool';
import { settings } from './settings';

export const rootReducer = combineReducers({ explorer, pool, settings });
