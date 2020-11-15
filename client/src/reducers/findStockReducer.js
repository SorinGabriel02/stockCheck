export default function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "stock": {
      return {
        ...state,
        isLoading: false,
        input: "",
        stock: action.payload,
      };
    }
    case "handleInput":
      return {
        ...state,
        errorMessage: "",
        input: action.payload,
      };
    case "errorMessage":
      return {
        ...state,
        isLoading: false,
        stock: null,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
