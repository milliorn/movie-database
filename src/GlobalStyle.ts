import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @font-face {
    font-display: swap;
    font-family: 'Abel';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/abel/v18/MwQ5bhbm2POE2V9BPQ.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    :root {
        --darkGrey: #1c1c1c;
        --fontBig: 1.5rem;
        --fontMed: 1.2rem;
        --fontSmall: 1rem;
        --fontSuperBig: 2.5rem;
        --lightGrey: #eee;
        --maxWidth: 1280px;
        --medGrey: #353535;
        --white: #fff;
    }

    * {
        box-sizing: border-box;
        font-family: 'Abel', sans-serif;
    }

    body {
        margin: 0;
        padding: 0;
        background: var(--darkGrey);

        h1 {
            color: var(--white);
            font-size: 2rem;
            font-weight: 600;
        }

        h3 {
            font-size: 1.1rem;
            font-weight: 600;
        }

        p {
            color: var(--white);
            font-size: 1rem;
        }
    }
`;
