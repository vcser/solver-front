// import { useEffect, useState } from "react";
// import Header from "./components/Header";
// import FundoInput from "./components/FundoInput";
// import Label from "./components/Label";
// import Button from "./components/Button";
// import Spinner from "./components/Spinner";
// import ResultList from "./components/ResultList";
// import { handleAnalysis } from "./utils/handleAnalysis";
// import InfoList from "./components/InfoList";
// import MapPicker from "./components/MapPicker";

// export default function App() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState([]);
//   const [alerta, setAlerta] = useState({ name: "Verde", color: "green" });

//   const onButtonClick = async () => {
//     setLoading(true);
//     setResult([]);
//     const result = await handleAnalysis(data);
//     setResult(result);
//     setLoading(false);
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-green-200">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full my-8">
//         <Header />
//         <FundoInput
//           data={data}
//           setData={setData}
//         />
//         {/* <MapPicker /> */}
//         <InfoList>
//           <Label
//             name="Estado de alerta"
//             value={
//               <span
//                 className={"text-" + alerta.color + "-500" + " font-extrabold"}
//               >
//                 {alerta.name}
//               </span>
//             }
//           />
//         </InfoList>
//         <Button onClick={onButtonClick} />
//         <Spinner visible={loading} />
//         <ResultList result={result} />
//       </div>
//     </div>
//   );
// }

import CoordinatesForm from "./components/CoordinatesForm";

export default function App() {
  return (
    <CoordinatesForm />
  )
}
