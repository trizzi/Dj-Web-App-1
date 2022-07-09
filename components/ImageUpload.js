import { useState } from 'react';
import { API_URL } from '@/config/index.js';
import styles from '@/styles/Form.module.css';

export default function ImageUpload({
  evtId,
  imageUploaded,
}) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', image);
    formData.append('ref', 'events');
    formData.append('refid', evtId);
    formData.append('field', 'image');

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    console.log('testing', e.target.files[0]);
    setImage(e.target.files[0]);
  };
  return (
    <div>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <input
          type='submit'
          value='upload'
          className='btn'
        />
      </form>
    </div>
  );
}
