import React, { useState } from 'react';
import PopupModal from '../PopUpModal/PopupModal';
import styles from './index.module.css';

interface FileUploadProps {
    onUpload: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            setModalMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setIsLoading(true);

            const uploadResponse = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json();
                throw new Error(errorData.error || 'Something went wrong. Please try again.');
            }

            setModalMessage('Your file was uploaded and processed successfully!');
            onUpload();
        } catch (error) {
            setModalMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setModalMessage(null);
    };

    return (
        <div className={styles.fileUpload}>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".pdf,.pptx" onChange={handleFileChange} required />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
            {isLoading && (
                <div className={styles.spinner}>
                    <div className={styles.loader}></div>
                </div>
            )}
            {modalMessage && <PopupModal message={modalMessage} onClose={closeModal} />}
        </div>
    );
};

export default FileUpload;