/** Google Sheets Apps Script API 엔드포인트 */
export const API_URL =
    'https://script.google.com/macros/s/AKfycbxbpyUQbDiXz8JRXRqV7pTQx8VGUsJtPPwpi2ZnpxmVaMNoWwgWXsMnp538jFV3IG2IjQ/exec';

export interface Product {
    id: string;
    brand: string;
    name: string;
    description: string;
    kcalPerKg: number;
    kibbleSize?: string;
    keyIngredients?: string;
    petType: 'dog' | 'cat';
    tags?: string[];
    imageUrl?: string;
}
