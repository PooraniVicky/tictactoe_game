import React, { useReducer } from 'react'

function reducer (toys, action){
    switch(action.type){
        case 'add_toy':
            return[...toys, action.payload]
        case 'remove_toy':
            return toys.filter(toy => toy !== action.payload);
        default:
            return toys;
        }
}
function ToyBoxWithReducer() {
    const [toys, dispatch] = useReducer(reducer, ['blocks', "cars", "dolls"])
  return (
    <div>
        <h1>Toy Box With Reducer</h1>
        {toys.map((toy, index)=>
        <h3 key={index}>{toy}</h3>
        )}
        <button onClick={()=> dispatch({type: 'add_toy', payload: "puzzle"})}>Add Puzzle</button>
        <button onClick={()=> dispatch({type: 'remove_toy', payload: "blocks"})}>Remove Blocks</button>

    </div>
  )
}

export default ToyBoxWithReducer