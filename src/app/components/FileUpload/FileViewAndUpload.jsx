import React, { useState, useEffect, useContext } from 'react';
import { Stack, Divider, Typography, Input, Box, Button } from '@mui/material';
import { FileButton } from './FileButton';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseConfig from './firebaseConfig.js'
import axios from 'axios';
import {ProfileContext} from '../Profile/ProfileContext'



export const FileViewAndUpload = (props) => {
  let { fileUse } = props;
  let [file, setFile] = useState(null);
  let [downloadURL, setDownloadURL] = useState(null);

  const firebaseApp = initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp);

  useEffect(async () => {
    if (!file) return;
    console.log('file: ', file, file.type);
    const fileRef = ref(storage, `resumes/${file.name}`);
    console.log('fileref: ', fileRef)

    uploadBytes(fileRef, file)
      .then((snapshot) => {
        getDownloadURL(fileRef)
          .then((pdfURL) => {
            setDownloadURL(pdfURL)
            axios({
              url: 'http://localhost:3000/data/upload',
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              data: {
                pdfURL,
                fileUse,
                userId: props.userId
              },
            })
              .then(console.log)
              .catch(err => console.error(err))
          })
          .then(console.log)
          .catch(err => console.error(err))
      })
      .catch((err) => console.log(err));
  }, [file]);

  useEffect(async () => {
    axios.get(`/data/getPDF/${fileUse}`)
      .then((data) => {
        setDownloadURL(data.data);
      })
      .catch((err) => console.error(err));
  }, [downloadURL]);

  const fileSelect = async (e) => {
    setFile(e.target.files?.[0])
  };

  let label = fileUse === 'resume_pdf' ? 'Resume' : 'Cover Letter';

  return (

    <Stack>
      <Typography variant='h5'>{label}</Typography>
      <label htmlFor={'file_upload_' + fileUse}>
        <Input
          id={'file_upload_' + fileUse}
          accept='.pdf'
          type='file'
          onChange={fileSelect}
          sx={{ display: 'none' }}
        />
        <FileButton
          component='a'
          label={'Upload ' + label}
          fullWidth={true}
        />
      </label>
      {downloadURL ?
        <>
          <iframe
            src={`${downloadURL}#&embedded=true&toolbar=0&navpanes=0`}
            style={{ width: 250, height: 323, border: 0 }}
          />
          <FileButton
            fullWidth={true}
            component='a'
            url={downloadURL}
            label={'Download ' + label}
          />
        </> :
        <Box sx={{ height: 400, width: 250 }} />
      }
    </Stack >
  )
}

const ResumeAndCoverLetter = (props) => {
  let { orientation = 'vertical', direction = 'row' } = props;

  return (
    <Stack
      {...{direction}}
      justifyContent="space-evenly"
    >
      <FileViewAndUpload fileUse='resume_pdf' />
      <Divider {...{orientation}} />
      <FileViewAndUpload fileUse='cover_letter_pdf' />
    </Stack>
  )
};

export default ResumeAndCoverLetter;
