import * as React from "react";
const VitSvg = (props:any) => (
  <svg
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M63.788 9.473 33.724 63.165c-.62 1.108-2.215 1.115-2.845.012L.219 9.477c-.687-1.2.341-2.657 1.706-2.413l30.097 5.373q.29.051.58-.001L62.07 7.07c1.36-.248 2.394 1.197 1.72 2.402"
      fill="url(#a)"
      style={{
        fill: "url(#a)",
        strokeWidth: 0.16329,
      }}
    />
    <path
      d="M46.358.016 24.11 4.37a.816.816 0 0 0-.659.752l-1.368 23.085a.817.817 0 0 0 .999.844l6.194-1.428a.816.816 0 0 1 .984.958l-1.84 9a.817.817 0 0 0 1.038.945l3.826-1.161a.817.817 0 0 1 1.037.946l-2.924 14.137c-.183.884.994 1.367 1.486.608l.328-.506L51.34 16.416a.816.816 0 0 0-.885-1.167l-6.376 1.23a.816.816 0 0 1-.94-1.028L47.3 1.043a.816.816 0 0 0-.942-1.027"
      fill="url(#b)"
      style={{
        fill: "url(#b)",
        strokeWidth: 0.16329,
      }}
    />
    <defs>
      <linearGradient
        id="a"
        x1={6}
        y1={33}
        x2={235}
        y2={344}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(.1634 0 0 .16319 -1.51 -.241)"
      >
        <stop stopColor="#41d1ff" />
        <stop offset={1} stopColor="#bd34fe" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={194.651}
        y1={8.818}
        x2={236.076}
        y2={292.989}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(.1634 0 0 .16319 -1.51 -.241)"
      >
        <stop stopColor="#ffea83" />
        <stop offset={0.083} stopColor="#ffdd35" />
        <stop offset={1} stopColor="#ffa800" />
      </linearGradient>
    </defs>
  </svg>
);
export default VitSvg;
