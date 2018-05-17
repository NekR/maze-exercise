import { init } from '@rematch/core';
import * as stores from './stores'

const store = init({ models: stores });

export default store;
