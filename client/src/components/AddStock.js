import React, { useReducer, useEffect, useRef } from "react";

import reducer from "../reducers/addStockReducer";

const initialState = {
  isLoading: false,
  name: "",
  price: "0",
  savedStock: null,
  errorMessage: "",
};

export default function AddStock() {
  const nameRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: name, payload: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch({ type: "isLoading", payload: true });
    try {
      const response = await fetch(`/api/new`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: state.name,
          price: state.price,
        }),
      });
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
    nameRef?.current.focus();
  }, []);

  return (
    <div>
      <h1>Add a new stock to the database.</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={nameRef}
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Stock name..."
          type="text"
          required
        />
        <input
          name="price"
          value={state.price}
          onChange={handleChange}
          placeholder="Stock name..."
          type="number"
          min="0"
          required
        />
        <button>{!state.isLoading ? "Save" : "Saving..."}</button>
      </form>
      {state.errorMessage && (
        <p style={{ color: "red" }}>{state.errorMessage}</p>
      )}
      {state.stock && (
        <p>
          Sock "{state.stock.name.toUpperCase()}" with a price of{" "}
          {state.stock.price} was successfully created.
        </p>
      )}
    </div>
  );
}
