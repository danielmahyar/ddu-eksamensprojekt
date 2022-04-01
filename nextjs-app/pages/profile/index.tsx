import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import AuthCheck from '../../components/authentication/AuthCheck'
import { auth, storage } from '../../lib/setup/firebase'

const SpecificProfile = () => {
  const [downloadURL, setDownload] = useState<string>("")
  const gsReference = ref(storage, 'gs://ddu-eksamensprojekt-71224.appspot.com/products/calculator/windows/AmfoLabs Calculator Setup 4.5.0.exe');

  useEffect(() => {
    getDownloadURL(gsReference).then((storageDownloadURL) => {
      setDownload(storageDownloadURL)
    })
  }, [])

  const downloadFile = () => {
    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', downloadURL);
    xhr.send();
  }


  return (
    <AuthCheck>
      <p>Hello User</p>
      {downloadURL && (
        <a href={downloadURL}> My LinkedIn </a>
      )}
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </AuthCheck >
  )
}

export default SpecificProfile

