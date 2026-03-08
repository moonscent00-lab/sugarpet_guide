import { useState, useEffect } from 'react';

const LOGO_PLACEHOLDER = '/sugarpet-logo.png'; // Will process the logo in assets

export interface ProductImage {
    id: string;
    url: string; // Base64 or direct URL
}

export function useImages() {
    const [images, setImages] = useState<Record<string, string>>({});
    const [keyIngredients, setKeyIngredients] = useState<Record<string, string>>({});

    useEffect(() => {
        // Load from local storage on mount
        const storedImages = localStorage.getItem('sugarpet_images');
        const storedText = localStorage.getItem('sugarpet_text');

        if (storedImages) {
            try {
                setImages(JSON.parse(storedImages));
            } catch (e) {
                console.error('Failed to parse images', e);
            }
        }

        if (storedText) {
            try {
                setKeyIngredients(JSON.parse(storedText));
            } catch (e) {
                console.error('Failed to parse text', e);
            }
        }
    }, []);

    const saveImage = (productId: string, imageUrl: string) => {
        const newImages = { ...images, [productId]: imageUrl };
        setImages(newImages);
        localStorage.setItem('sugarpet_images', JSON.stringify(newImages));
    };

    const getImage = (productId: string, defaultUrl?: string) => {
        return images[productId] || defaultUrl || LOGO_PLACEHOLDER;
    };

    const saveKeyIngredients = (productId: string, text: string) => {
        const newData = { ...keyIngredients, [productId]: text };
        setKeyIngredients(newData);
        localStorage.setItem('sugarpet_text', JSON.stringify(newData));
    };

    const getKeyIngredients = (productId: string) => {
        return keyIngredients[productId];
    };

    return { images, saveImage, getImage, keyIngredients, saveKeyIngredients, getKeyIngredients };
}
