import "./App.scss";
import { PDFViewer } from "./components/PDF/PDFViewer";
import MainScreen from "./views/main-screen/main-screen";
import { sendTemplate } from "../src/api/api";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';

function App() {
  const [sample_id, setSample_id] = useState(0);
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const getTemplate = async (obj) => {
    setLoading(true);
    const response = await sendTemplate(obj);
    response && setSample_id(response["ajax-response-with-data"]);
    response && setPath(response["file_path"]);
    if (response["ajax-response"] === "Шаблон акта успешно получен") {
      setShowAddButton(true);
    }
    setLoading(false);
  };
  return (
    <div className="App">
        {!loading && sample_id !== 0 && path && <PDFViewer path={path} />}
        {loading &&
          <Box sx={{ justifyContent: 'center', width: '50%' }}>
            <CircularProgress />
          </Box>
        }
        <MainScreen sendTemplate={getTemplate} sample_id={sample_id} showAddButton={showAddButton} />
    </div>
  );
}

export default App;
