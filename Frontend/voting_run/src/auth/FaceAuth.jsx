import React, { useRef, useState, useEffect } from 'react';

const FaceAuth = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [imageData, setImageData] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraOpen(true);
            }
        } catch (error) {
            console.error("Error accessing webcam: ", error);
        }
    };

    const captureImage = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL('image/png');
        setImageData(data);
        setIsCameraOpen(false);
        // Stop all video tracks
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    };

    useEffect(() => {
        if (isCameraOpen) {
            openCamera();
        }
    }, [isCameraOpen]);

    return (
        <div>
            <button onClick={() => setIsCameraOpen(true)} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition mb-4">
                Open Camera
            </button>
            {isCameraOpen && (
                <div>
                    <video ref={videoRef} autoPlay style={{ width: '100%', borderRadius: '10px' }} />
                    <button onClick={captureImage} className="mt-2 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
                        Capture Image
                    </button>
                    <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
                </div>
            )}
            {imageData && <img src={imageData} alt="Captured" style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }} />}
        </div>
    );
};

export default FaceAuth;