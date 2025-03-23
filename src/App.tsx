import React, { useState } from 'react';
import styles from './App.module.css';
import FileUpload from "./fileupload/FIleUpload.tsx";
import DataTable from "./dataTable/DataTable.tsx";

const App: React.FC = () => {
    const [shouldFetchData, setShouldFetchData] = useState<boolean>(false);

    const handleUpload = () => {
        setShouldFetchData(true);
    };

    return (
        <div className={styles.container}>
            <h1>Vester Ai Doc Reader</h1>
            <FileUpload onUpload={handleUpload} />
            <DataTable shouldFetchData={shouldFetchData} />
        </div>
    );
};

export default App;