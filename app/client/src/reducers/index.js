import { combineReducers } from 'redux';

import { extractPaletteReducer } from './palette';

export default combineReducers({
  palette: extractPaletteReducer
});
