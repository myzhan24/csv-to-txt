import CSVReader from 'react-csv-reader';
import csv from 'csv-parser';
import React, { useState } from 'react';

const CsvToTxtConverter = () => {


    const [csvString, setCsvString] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [visibilityArr, setVisibilityArr] = useState([]);

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

    function onFileLoaded(data, fileInfo) {
        setCsvString(data);
        if (data && data[0]) {
            setVisibilityArr(data[0].map(() => {
                return true;
            }));
        }
    }

    function convertCsvToTxt(data = [], visibilityArr = []) {
        let ret = '';
        data.forEach((row) => {
            row.forEach((item, i) => {
                if (visibilityArr[i]) {
                    ret += `${item} `
                }
            });
            ret += '\n';
        })
        return ret;
    }

    function convertVisibilityArrToCheckboxes(visibilityArr) {
        return visibilityArr.map((visible, i) => {
            return (<input type="checkbox" id={i} checked={visible} onChange={(event) => {
                const arr = visibilityArr.map(v => v);
                arr[i] = event.target.checked;
                setVisibilityArr(arr);
            }}/>)
        });
    }

    return (<>
            <h1>Upload .csv</h1>
            <CSVReader onFileLoaded={(data, fileInfo) => {
                onFileLoaded(data, fileInfo);
            }}/>

            <h1>Toggle Column Visible</h1>
            <div>
                {convertVisibilityArrToCheckboxes(visibilityArr)}
            </div>

            <h1>TXT</h1>
            <textarea value={convertCsvToTxt(csvString, visibilityArr)} readOnly={true} style={{width:'800px', height: '1000px'}}>
            </textarea>
        </>
    );
};

export default CsvToTxtConverter;
