import React, { useReducer, useEffect, useRef } from "react";

import reducer from "../reducers/findStockReducer";

const initialState = {
  isLoading: false,
  input: "",
  stock: null,
  errorMessage: "",
};

export default function FindStock() {
  const inputRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event) => {
    dispatch({ type: "handleInput", payload: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch({ type: "isLoading", payload: true });
    try {
      const response = await fetch(`/api/find/${state.input}`);
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "stock", payload: data });
      } else {
        dispatch({ type: "errorMessage", payload: data.message });
      }
    } catch (error) {
      dispatch({
        type: "errorMessage",
        payload: "Something went wrong. Please try again later",
      });
    }
  };

  useEffect(() => {
    inputRef?.current.focus();
  }, []);

  return (
    <div className="findStockContainer">
      <h1>Find a stock by it's name</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          value={state.input}
          onChange={handleChange}
          placeholder="Stock name..."
          type="text"
          required
        />
        <button>{!state.isLoading ? "Search" : "Searching..."}</button>
      </form>
      <p style={{ color: "red" }}>{state.errorMessage}</p>
      {state.stock && (
        <section>
          <h4>Stock name: {state.stock.name}</h4>
          <h4>Stock price: {state.stock.price}</h4>
        </section>
      )}
    </div>
  );
}
