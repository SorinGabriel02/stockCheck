export default function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "handlePrice":
      return {
        ...state,
        errorMessage: "",
        price: action.payload,
      };
    case "handleOrder":
      return {
        ...state,
        errorMessage: "",
        orderBy: action.payload,
      };
    case "stocks": {
      return {
        ...state,
        isLoading: false,
        price: "0",
        orderBy: "1",
        stocks: action.payload,
      };
    }
    case "errorMessage":
      return {
        ...state,
        isLoading: false,
        stocks: [],
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
