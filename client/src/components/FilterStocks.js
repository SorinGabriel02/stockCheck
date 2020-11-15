import React, { useReducer, useEffect, useRef } from "react";

import reducer from "../reducers/filterStocksReducer";
import "./FilterStocks.css";

const initialState = {
  isLoading: false,
  price: "0",
  orderBy: "1",
  stocks: [],
  errorMessage: "",
};

export default function FilterStocks() {
  const priceRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handlePrice = (event) => {
    dispatch({ type: "handlePrice", payload: event.target.value });
  };

  const handleOrder = (event) => {
    dispatch({ type: "handleOrder", payload: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch({ type: "isLoading", payload: true });
    try {
      const response = await fetch(
        `/api/filter/${state.price}/${state.orderBy}`
      );
      const data = await response.json();
      if (response.ok) {
        if (!data.length) {
          return dispatch({
            type: "errorMessage",
            payload: `No stocks are currently higher than ${state.price}`,
          });
        }
        dispatch({ type: "stocks", payload: data });
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

  const stockList = state?.stocks?.map((stock, index) => (
    <li key={stock.name + index}>
      <p>Stock Name: {stock.name}</p>
      <p>Price: {stock.price}</p>
    </li>
  ));

  useEffect(() => {
    priceRef?.current.focus();
  }, []);

  return (
    <div className="filterStocksContainer">
      <h1>Filter Stocks</h1>
      <h3>
        Find out which stocks are higher than or equal than a certain price
      </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="price">Price is bigger or equal than</label>
        <input
          name="price"
          ref={priceRef}
          value={state.price}
          onChange={handlePrice}
          placeholder="Price..."
          type="number"
          required
          min="0"
        />
        <label>
          <input
            onChange={handleOrder}
            type="radio"
            value="1"
            name="order"
            checked={Boolean(state.orderBy === "1")}
          />
          Ascending Order
        </label>
        <label>
          <input
            onChange={handleOrder}
            type="radio"
            value="0"
            name="order"
            checked={Boolean(state.orderBy === "0")}
          />
          Descending Order
        </label>
        <button>{!state.isLoading ? "Search" : "Searching..."}</button>
      </form>
      {state.errorMessage && (
        <p style={{ color: "red" }}>{state.errorMessage}</p>
      )}
      <ul className="stocks">{stockList}</ul>
    </div>
  );
}
