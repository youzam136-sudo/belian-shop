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
    {
        id: "lotion",
        label: "로션",
        title: "로션",
        description: "로션 제품에 대한 설명입니다",
    },
    {
        id: "cream",
        label: "크림",
        title: "크림",
        description: "크림 제품에 대한 설명입니다",
    },
    {
        id: "etc",
        label: "기타",
        title: "기타",
        description: "기타 제품에 대한 설명입니다",
    },
    {
        id: "serum",
        label: "세럼",
        title: "세럼",
        description: "세럼 제품에 대한 설명입니다",
    },
    {
        id: "cleanser",
        label: "클렌저",
        title: "클렌저",
        description: "클렌저 제품에 대한 설명입니다",
    },
    {
        id: "mask",
        label: "마스크팩",
        title: "마스크팩",
        description: "마스크팩 제품에 대한 설명입니다",
    },
    {
        id: "suncare",
        label: "선케어",
        title: "선케어",
        description: "선케어 제품에 대한 설명입니다",
    },
];

// 기존 스킨 카테고리 상품 (기존 그대로)
const skinProducts: ShopProduct[] = Array.from(
    { length: 8 },
    (_, index) => ({
        id: index + 1,
        name: "스킨케어 제품",
        description:
            "손잡이 없이 깔끔하게! 터치 한번으로 간편하게!",
        price: 4300,
        badge: "NEW",
        category: "skin",
    }),
);

// 로션 / 크림 / 기타: 스킨과 동일한 NEW 배지 스타일
const newBadgeProducts: ShopProduct[] = [
    ...Array.from({ length: 8 }, (_, index) => ({
        id: 500 + index + 1,
        name: "로션 제품",
        description:
            "촉촉하게 스며드는 데일리 로션!",
        price: 5200,
        badge: "NEW",
        category: "lotion",
    })),
    ...Array.from({ length: 8 }, (_, index) => ({
        id: 600 + index + 1,
        name: "크림 제품",
        description:
            "깊은 영양과 보습을 채워주는 크림!",
        price: 6800,
        badge: "NEW",
        category: "cream",
    })),
    ...Array.from({ length: 8 }, (_, index) => ({
        id: 700 + index + 1,
        name: "기타 제품",
        description:
            "매일 부담 없이 사용할 수 있는 데일리 케어!",
        price: 4900,
        badge: "NEW",
        category: "etc",
    })),
];

// 세럼 / 클렌저: 원형 "50%" 배지 + 원가 취소선 스타일
const badgeVariantProducts: ShopProduct[] = [
    ...Array.from({ length: 8 }, (_, index) => ({
        id: 100 + index + 1,
        name: "스킨이름",
        description: "스킨제품 설명",
        price: 68000,
        originalPrice: 120000,
        discountPercent: 50,
        variant: "badge" as const,
        category: "serum",
    })),
    ...Array.from({ length: 8 }, (_, index) => ({
        id: 200 + index + 1,
        name: "스킨이름",
        description: "스킨제품 설명",
        price: 68000,
        originalPrice: 120000,
        discountPercent: 50,
        variant: "badge" as const,
        category: "cleanser",
    })),
];

// 마스크팩 / 선케어: 장바구니 아이콘 + 주황색 할인율 스타일
const cartVariantProducts: ShopProduct[] = [
    ...Array.from({ length: 8 }, (_, index) => ({
        id: 300 + index + 1,
        name: "제품제목",
        description: "제품제목과에 대한 설명입니다...",
        price: 59000,
        discountPercent: 16,
        variant: "cart" as const,
        category: "mask",
    })),
    ...Array.from({ length: 8 }, (_, index) => ({
        id: 400 + index + 1,
        name: "제품제목",
        description: "제품제목과에 대한 설명입니다...",
        price: 59000,
        discountPercent: 16,
        variant: "cart" as const,
        category: "suncare",
    })),
];

export const products: ShopProduct[] = [
    ...skinProducts,
    ...newBadgeProducts,
    ...badgeVariantProducts,
    ...cartVariantProducts,
];

// 상세페이지에서 보여줄 용량별 가격 (50ml / 115ml)
export function getProductSizes(product: ShopProduct): ProductSize[] {
    return [
        { label: "50ml", price: product.price },
        { label: "115ml", price: Math.round((product.price * 4.88) / 100) * 100 },
    ];
}
