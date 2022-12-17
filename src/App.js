import { Navigate, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import AddMembers from "./components/AddMembers";
import CreateGroup from "./components/CreateGroup";
import ExpenseMain from "./components/ExpenseMain";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ROUTES } from "./routes";

function App() {
  return (
    <div className="app">
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Navigate to={ROUTES.CREATE_GROUP} />} />
          <Route path={ROUTES.CREATE_GROUP} element={<CreateGroup />} />
          <Route path={ROUTES.ADD_MEMBERS} element={<AddMembers />} />
          <Route path={ROUTES.EXPENSE_MAIN} element={<ExpenseMain />} />
        </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
