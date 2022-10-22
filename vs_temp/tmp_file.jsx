import React from "react"
import ReactDOM from "react-dom"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "./redux-store/actions-creator/productActions"
import { GetUser } from "./app.js"

ReactDOM.render(<App />, document.getElementById("root"))
ReactDOM.render(<Welcome />, document.getElementById("root"));

return(
  <div>
    <p> You clicked 5 {count++} times </p>
    <p> You clicked 5 {count} times </p>
    <p> You clicked 5 {count + 1} times </p>
    <button> You clicked 5 {count + 1} times </button>
    <Welcome>
      Children - 12.25 sdfsdf {count} s48f74s8f sf84fsf8 498489
      fffffffffffffff
      ##fgffffff##
    </Welcome>
    <button onClick={(event, xyz) => setCount(1 + count + 6 + count)} type="heee"> </button>
    <button onClick={() => setCount(count - 1)}> </button>
  </div>)