import ApiClient from '../utils/api_client';

export const paletteActionTypes = Object.freeze({
  EXTRACT_PALETTE: 'GET_PALLETTE',
  EXTRACT_PALETTE_SUCCESS: 'EXTRACT_PALETTE_SUCCESS',
  EXTRACT_PALETTE_ERROR: 'EXTRACT_PALETTE_ERROR'
});

export const extractPalette = data => {
  return async dispatch => {
    dispatch({ type: paletteActionTypes.EXTRACT_PALETTE });

    try {
      const { palette } = (await ApiClient.post('/palette', data)).data;

      dispatch({
        type: paletteActionTypes.EXTRACT_PALETTE_SUCCESS,
        palette
      });
    } catch (err) {
      const error = err.response.data.message;

      dispatch({
        type: paletteActionTypes.EXTRACT_PALETTE_ERROR,
        error
      });
    }
  };
};
