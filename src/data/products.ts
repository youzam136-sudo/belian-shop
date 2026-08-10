export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image?: string;
    badge?: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: "스킨케어 제품",
        description: "손잡이 없이 깔끔하게! 터치 한번으로 간편하게!",
        price: 4300,
        badge: "NEW",
    },
    {
        id: 2,
        name: "스킨케어 제품",
        description: "피부에 촉촉한 수분감을 채워주는 제품",
        price: 5200,
        badge: "NEW",
    },
    {
        id: 3,
        name: "스킨케어 제품",
        description: "매일 부담 없이 사용할 수 있는 데일리 케어",
        price: 6800,
    },
    {
        id: 4,
        name: "스킨케어 제품",
        description: "부드러운 사용감의 데일리 스킨케어 제품",
        price: 7500,
        badge: "BEST",
    },
    {
        id: 5,
        name: "스킨케어 제품",
        description: "건조한 피부에 수분과 보습을 더해주는 제품",
        price: 8900,
    },
    {
        id: 6,
        name: "스킨케어 제품",
        description: "편안하고 산뜻하게 사용할 수 있는 제품",
        price: 9400,
    },
    {
        id: 7,
        name: "스킨케어 제품",
        description: "피부 본연의 밸런스를 위한 데일리 케어",
        price: 10500,
        badge: "NEW",
    },
    {
        id: 8,
        name: "스킨케어 제품",
        description: "풍부한 보습감으로 마무리되는 스킨케어 제품",
        price: 12000,
    },
];