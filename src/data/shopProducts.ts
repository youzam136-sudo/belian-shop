export type Category = {
    id: string;
    label: string;
    title: string;
    description: string;
};

export type CardVariant = "badge" | "cart";

export type ProductSize = {
    label: string;
    price: number;
};

export type ShopProduct = {
    id: number;
    name: string;
    description: string;
    price: number;
    badge?: string;
    category: string;
    variant?: CardVariant;
    originalPrice?: number;
    discountPercent?: number;
};

export const categories: Category[] = [
    {
        id: "skin",
        label: "스킨",
        title: "스킨",
        description: "스킨 제품에 대한 설명입니다",
    },
];

const skinProducts: ShopProduct[] = [
    {
        id: 1,
        name: "Wineberry Firming Collagen Jelly",
        description: "와인베리 퍼밍 콜라겐 젤리",
        price: 30000,
        badge: "NEW",
        category: "skin",
    },
];

export const products: ShopProduct[] = [
    ...skinProducts,
];

// 상세페이지에서 보여줄 용량별 가격 (50ml / 115ml)
export function getProductSizes(product: ShopProduct): ProductSize[] {
    return [
        { label: "50ml", price: product.price },
        { label: "115ml", price: Math.round((product.price * 4.88) / 100) * 100 },
    ];
}
