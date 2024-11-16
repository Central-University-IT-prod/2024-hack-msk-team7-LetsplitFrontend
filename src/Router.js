import {Login} from "./Pages/Login";
import {Landing} from "./Pages/Landing";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Receipts} from "./Pages/Receipts";
import {Me} from "./Pages/Me";
import {CreateEvent} from "./Pages/CreateEvent";
import {CreateReceipt} from "./Pages/CreateReceipt";
import {Receipt} from "./Pages/Receipt";
import {Event} from "./Pages/Event";


function Router() {
  return <BrowserRouter>
      <Routes>
          <Route path="/event/create" element={<CreateEvent/>} />
          <Route path="/receipt/create" element={<CreateReceipt/>} />
          <Route path="/receipts" element={<Receipts/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/me" element={<Me/>} />
          <Route path="/" element={<Receipts/>} />
          <Route path="/receipt/:id" element={<Receipt/>} />
          <Route path="/event/:id" element={<Event/>} />
      </Routes>
  </BrowserRouter>;
}

export default Router;
