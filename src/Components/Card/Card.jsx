import React from 'react';
import "./Card.css"
const Card = ({data}) => {
    const url = data.urls;
    const regular_img = url.regular;

    const handleDownload = async () => {
        try {
            const response = await fetch(regular_img, {
                mode: 'cors'
            });
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'image.jpg'; // specify the filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl); // clean up the Blob URL
        } catch (error) {
            console.error('Error downloading the image', error);
        }
    };

    return (
        <>
            <div className="image-box">
                <img src={regular_img} alt=" " />
                <button onClick={handleDownload}>Download Now</button>
            </div>
        </>
    );
};

export default Card;
