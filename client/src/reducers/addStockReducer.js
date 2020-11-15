export default function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "name":
      return {
        ...state,
        errorMessage: "",
        stock: null,
        name: action.payload,
      };
    case "price":
      return {
        ...state,
        errorMessage: "",
        stock: null,
        price: action.payload,
      };
    case "stock": {
      return {
        ...state,
        isLoading: false,
        name: "",
        price: "0",
        stock: action.payload,
      };
    }
    case "errorMessage":
      return {
        ...state,
        isLoading: false,
        savedStock: null,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
