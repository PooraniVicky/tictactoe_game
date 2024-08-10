import React, { useState } from 'react'

function ToyBoxWithoutReducer() {
    const [toys, setToys] = useState(["block", "cars", "dolls"]);
    const addToy = (toy) =>{
        setToys([...toys, toy]);
    }
    const removeToy = (toy)=>{
        setToys(toys.filter(t => t !== toy));
    }
    
  return (
    <div>
        <h1>Toy Box</h1>
        {toys.map((toy, index)=>
        <h4 key={index}>{toy}</h4>
        )}
        <button onClick={()=> addToy("puzzle")}>Add Puzzle</button>
        <button onClick={()=> removeToy("cars")}>Remove car</button>
    </div>
  )
}

export default ToyBoxWithoutReducer