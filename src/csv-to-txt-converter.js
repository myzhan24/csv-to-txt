import CSVReader from 'react-csv-reader';
import csv from 'csv-parser';
import React, { useState } from 'react';

const CsvToTxtConverter = () => {


    const [csvString, setCsvString] = useState();
    const [selectedFile, setSelectedFile] = useState();

    // On file select (from the pop up)
    const onFileChange = event => {
        // Update the state
        setSelectedFile(event.target.files[0]);
    };

    // On file upload (click the upload button)
    const onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            selectedFile,
            selectedFile.name
        );

        // Details of the uploaded file
        console.log(selectedFile);

        // Request made to the backend api
        // Send formData object
        // axios.post("api/uploadfile", formData);
    };

    function convertCsvToTxt(data = []) {
        let ret = '';
        data.forEach((row)=>{
            row.forEach((item)=>{
                ret += `${item} `
            });
            ret += '\n';
        })
        return ret;
    }

    return (<>
            <h1>CSV</h1>
            <CSVReader onFileLoaded={(data, fileInfo) => {
                console.dir(data, fileInfo)
                setCsvString(data);
            }} />

            <h1>TXT</h1>
            <pre>
                {convertCsvToTxt(csvString)}
            </pre>
        </>
    );
};

export default CsvToTxtConverter;
