import React, { useEffect, useRef, useState } from 'react';
import logoSrc from '../assets/logo.png';

export default function ProcessedLogo({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const logoUrl = logoSrc;

    const [processedUrl, setProcessedUrl] = useState<string | null>(null);

    useEffect(() => {
        // Try to load and process the raw image to remove white background
        const img = new window.Image();
        // Removed crossOrigin to prevent tainting issues with Vite local assets
        img.src = logoUrl;

        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.drawImage(img, 0, 0);

            try {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // Remove pure white (or near white) pixels
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];

                    // If the pixel is very light, make it transparent
                    if (r > 240 && g > 240 && b > 240) {
                        data[i + 3] = 0; // Alpha to 0
                    }
                }

                ctx.putImageData(imageData, 0, 0);
                setProcessedUrl(canvas.toDataURL('image/png'));
            } catch (e) {
                console.error('Failed to process image data', e);
                setProcessedUrl(logoUrl); // Fallback
            }
        };

        img.onerror = () => {
            setProcessedUrl(null);
        };
    }, [logoUrl]);

    return (
        <>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {processedUrl ? (
                <img src={processedUrl} alt="SugarPet Logo" className={className} style={style} />
            ) : (
                <div className={`logo-fallback ${className}`} style={{
                    backgroundColor: 'var(--primary)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold', borderRadius: '50%'
                }}>
                    S
                </div>
            )}
        </>
    );
}
