import React, { useEffect, useState } from 'react';
import PopupModal from '../PopUpModal/PopupModal';
import styles from './index.module.css';

interface SlideData {
    filename: string;
    slide_title: string;
    slide_content: string;
    slide_metadata: Record<string, unknown>;
}

const DataTable: React.FC = () => {
    const [slides, setSlides] = useState<SlideData[]>([]);
    const [modalMessage, setModalMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/data');
            if (!response.ok) {
                throw new Error('Failed to fetch data. Please try again later.');
            }
            const result = await response.json();

            if (!Array.isArray(result)) {
                throw new Error('Invalid data format: expected an array of slides.');
            }

            setSlides(result);
        } catch (error) {
            setModalMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const closeModal = () => {
        setModalMessage(null);
    };

    return (
        <div>
            {isLoading ? (
                <div className={styles.loading}>Loading...</div>
            ) : (
                <table className={styles.dataTable}>
                    <thead>
                    <tr>
                        <th>Filename</th>
                        <th>Slide Title</th>
                        <th>Content</th>
                        <th>Metadata</th>
                    </tr>
                    </thead>
                    <tbody>
                    {slides.length > 0 ? (
                        slides.map((slide, index) => (
                            <tr key={index}>
                                <td>{slide.filename}</td>
                                <td>{slide.slide_title}</td>
                                <td>{slide.slide_content}</td>
                                <td>{JSON.stringify(slide.slide_metadata)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className={styles.noData}>
                                No data available. Please upload a file first.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}
            {modalMessage && <PopupModal message={modalMessage} onClose={closeModal} />}
        </div>
    );
};

export default DataTable;