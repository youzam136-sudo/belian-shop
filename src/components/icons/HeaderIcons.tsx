import type { SVGProps } from "react";

/** 마이페이지(사용자) 아이콘 */
export function MyPageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18.067 18.348"
      {...props}
    >
      <circle cx="4.705" cy="4.705" r="4.705" transform="translate(4.542)" fill="#ac1a1a" />
      <path
        d="M-720.159,858.5l11.907.225,3.042,7.4h-18.067Z"
        transform="translate(723.277 -847.773)"
        fill="#ac1a1a"
      />
    </svg>
  );
}

/** 장바구니 아이콘 */
export function CartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17.738 16.739"
      {...props}
    >
      <path
        d="M16.347,3.458H14.36L12.433.408a.876.876,0,1,0-1.481.936l1.335,2.114H5.451L6.786,1.344A.876.876,0,1,0,5.3.408L3.379,3.458H1.391a1.391,1.391,0,1,0,0,2.783H16.347a1.391,1.391,0,1,0,0-2.783"
        fill="#ac1a1a"
      />
      <path
        d="M7.032,39.438a2.059,2.059,0,0,0,1.981,1.5H16.06a2.06,2.06,0,0,0,1.981-1.5L20.3,31.5H4.774Zm3.428-5.774h4.153a.876.876,0,0,1,0,1.752H10.46a.876.876,0,1,1,0-1.752m0,2.99h4.153a.876.876,0,0,1,0,1.752H10.46a.876.876,0,1,1,0-1.752"
        transform="translate(-3.668 -24.196)"
        fill="#ac1a1a"
      />
    </svg>
  );
}
