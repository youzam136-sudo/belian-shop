import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/mypage.css";
import "../styles/review.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useReveal, revealClass } from "../hooks/useReveal";

import iconOrder from "../assets/my_order.png";
import iconReview from "../assets/my_review.png";
import iconCoupon from "../assets/my_coupon.png";
import iconPoint from "../assets/my_point.png";
import iconQna from "../assets/my_qna.png";

type WritableReview = {
    id: number;
    productName: string;
    description: string;
    dueDate: string;
    dday: string;
};

type WrittenReview = {
    id: number;
    productName: string;
    date: string;
    rating: number;
    tags: string[];
    content: string;
    sellerReply?: string;
};

const writableReviews: WritableReview[] = [
    {
        id: 1,
        productName: "스킨케어 제품",
        description: "손잡이 없이 깔끔하게! 터치 한번으로 간편하게!",
        dueDate: "26.10.14",
        dday: "D-51",
    },
    {
        id: 2,
        productName: "로션 제품",
        description: "촉촉하게 스며드는 데일리 로션!",
        dueDate: "26.10.22",
        dday: "D-59",
    },
];

const writtenReviews: WrittenReview[] = [
    {
        id: 1,
        productName: "스킨케어 제품",
        date: "26.08.04.",
        rating: 5,
        tags: ["용량 적당해요", "발림성 좋아요"],
        content:
            "손잡이 없이 깔끔하게 사용할 수 있어서 좋았어요! 터치 한번으로 간편하게 쓸 수 있는 점이 마음에 들어요.",
        sellerReply:
            "안녕하세요, 고객님! 소중한 후기를 남겨주셔서 감사합니다. 앞으로도 좋은 제품으로 보답하겠습니다.",
    },
];

const PAGE_SIZE = 2;
const totalPages = 3;

const quickMenus = [
    { id: 1, icon: iconOrder, title: "주문 배송", value: "보기" },
    { id: 2, icon: iconReview, title: "리뷰", value: "0" },
    { id: 3, icon: iconCoupon, title: "쿠폰", value: "0" },
    { id: 4, icon: iconPoint, title: "포인트", value: "0" },
    { id: 5, icon: iconQna, title: "문의내역", value: "" },
];

function Stars({ rating }: { rating: number }) {
    return (
        <span className="review-stars">
            {Array.from({ length: 5 }, (_, index) => (
                <span
                    key={index}
                    className={index < rating ? "is-filled" : ""}
                >
                    ★
                </span>
            ))}
        </span>
    );
}

function Pagination({ page, onChange }: { page: number; onChange: (n: number) => void }) {
    return (
        <nav className="review-pagination">
            <button
                type="button"
                onClick={() => onChange(Math.max(1, page - 1))}
                disabled={page === 1}
