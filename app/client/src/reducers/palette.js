import { paletteActionTypes } from '../actions/palette';

const initialState = {
  loading: false,
  palette: null,
  error: null
};

export const extractPaletteReducer = (state = initialState, action) => {
  switch (action.type) {
    case paletteActionTypes.EXTRACT_PALETTE:
      return {
        loading: true,
        palette: null,
        error: null
      };

    case paletteActionTypes.EXTRACT_PALETTE_SUCCESS:
      return {
        loading: false,
        palette: action.palette,
        error: null
      };

    case paletteActionTypes.EXTRACT_PALETTE_ERROR:
      return {
        loading: false,
        palette: null,
        error: action.error
      };

    default:
      return state;
  }
};
