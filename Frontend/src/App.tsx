//1. seperate buttons, determine UI for buttons from css or self made
//2. make css for first and second file


import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route }
    from "react-router-dom";
import First from "./components/SignUpPage";
import Dashboard from "./components/Dashboard";
import Main from "./components/Main";
  
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/first" element={<First />}/>
        <Route path="/second" element={<Dashboard />}/>
        <Route path="/" element={<Main/>}/>
      </Routes>
    </Router>
  );
}
  
export default App;
  


// const {useState} = React;

// function App() {
//   const [conter, setConter] = useState(0);
//   return (
//     <>
//       <div className="App">
//          <span className='heading'>Welcome</span>
//          <span className='buttonText'>
//             <Button
//                 border="dashed"
//                 color="#c29dff"
//                 height = "50px"
//                 onClick={() => console.log("You clicked on the pink circle!")}
//                 radius = "10%"
//                 width = "100px"
//                 children = "Sign Up"
//               />
//          </span>
//          <p>{conter}</p>
//          <button onClick={() => 
//             setConter(conter+1)
//         }>Increase Counter</button>
         
//       </div>
      
//     </>
//   );
// }

