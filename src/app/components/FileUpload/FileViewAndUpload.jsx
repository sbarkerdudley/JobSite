/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  Stack, Divider, Typography, Input, Box,
} from '@mui/material';
import { initializeApp } from 'firebase/app';
import {
  getStorage, ref, uploadBytes, getDownloadURL,
} from 'firebase/storage';
import axios from 'axios';
import firebaseConfig from './firebaseConfig';
import { FileButton } from './FileButton';

export const FileViewAndUpload = (props) => {
  const { fileUse } = props;
  const [file, setFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);

  const firebaseApp = initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp);

  useEffect(() => {
    async () => {
      if (!file) return;
      const fileRef = ref(storage, `resumes/${file.name}`);

      uploadBytes(fileRef, file)
        .then((snapshot) => {
          getDownloadURL(fileRef)
            .then((pdfURL) => {
              setDownloadURL(pdfURL);
              axios({
                url: 'http://localhost:3000/data/upload',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                data: {
                  pdfURL,
                  fileUse,
                  userId: props.userId,
                },
              })
                .catch((err) => console.error(err));
            });
        });
    };
  }, [file, props.userId, fileUse, storage]);

  useEffect(() => {
    async () => {
      axios.get(`/data/getPDF/${fileUse}`)
        .then((data) => {
          setDownloadURL(data.data);
        })
    };
  }, [downloadURL, fileUse]);

  const fileSelect = async (e) => {
    setFile(e.target.files?.[0]);
  };

  const label = fileUse === 'resume_pdf' ? 'Resume' : 'Cover Letter';

  return (

    <Stack>
      <Typography variant="h5">{label}</Typography>
      <Input
        id={`file_upload_${fileUse}`}
        accept=".pdf"
        type="file"
        onChange={fileSelect}
        sx={{ display: 'none' }}
      />
      <FileButton
        component="a"
        label={`Upload ${label}`}
        fullWidth
      />
      {downloadURL
        ? (
          <>
            <iframe
              src={`${downloadURL}#&embedded=true&toolbar=0&navpanes=0`}
              style={{
                width: 250, height: 323, border: 0, aspectRatio: '85 / 11',
              }}
            />
            <FileButton
              fullWidth
              component="a"
              url={downloadURL}
              label={`Download ${label}`}
            />
          </>
        )
        : <Box sx={{ height: 400, width: 250 }} />}
    </Stack>
  );
};

const ResumeAndCoverLetter = (props) => {
  const { orientation = 'vertical', direction = 'row' } = props;

  return (
    <Stack
      {...{ direction }}
      justifyContent="space-evenly"
    >
      <FileViewAndUpload fileUse="resume_pdf" />
      <Divider {...{ orientation }} />
      <FileViewAndUpload fileUse="cover_letter_pdf" />
    </Stack>
  );
};

export default ResumeAndCoverLetter;
