import React, { useState } from 'react';
import styles from './App.module.css';
import FileUpload from "./fileupload/FIleUpload.tsx";
import DataTable from "./dataTable/DataTable.tsx";

const App: React.FC = () => {
    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const handleUpload = () => {
        setRefreshTable(!refreshTable); // Toggle to trigger data fetch
    };

    return (
        <div className={styles.container}>
            <h1>VesterAI Pitch Deck Parser</h1>
            <FileUpload onUpload={handleUpload} />
            <DataTable key={refreshTable.toString()} /> {/* Re-render table on upload */}
        </div>
    );
};

export default App;