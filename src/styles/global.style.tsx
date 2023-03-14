import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    body,
    html {
        margin: 0;
        padding: 0;
        font-family: 'Open sans', sans-serif;
        color: ${(props) => props.theme.colors.text};
        background-color: ${(props) => props.theme.colors.background};
    }
    
    body {
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    /* Typography */

    h1 {
        font-size: 2.5rem
    }

    h2 {
        font-size: 2rem;
        line-height: 1.25;
        margin-top: 3rem;
    }

    h3 {
        font-size: 1.5rem;
        margin-top: 2.5rem;
        margin-bottom: 1.5rem;
    }

    h4 {
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
    }

    p {
        margin-top: 0px;
        margin-bottom: 12px;
        font-size: 16px;
        line-height: 1.5em;
        word-wrap: break-word;
    }

    ul {
        padding-inline-start: 17px;
        margin-top: 0px;
    }

    li {
        margin-top: 6px;
        margin-bottom: 6px;
        font-size: 16px;
        line-height: 22px;
        word-wrap: break-word;
    }

    a {
        text-decoration: none;

        &:link {
            color: ${({ theme }) => theme.colors.primary};
        }

        &:hover {
            color: ${({ theme }) => theme.colors.accent};
        }
        
        &:visited {
            color: ${({ theme }) => theme.colors.primary};
        }
    }

    span {
        display: inline-block;
    }

    pre {
        background: rgba(14, 33, 39, 0.05);
        white-space: pre-wrap;
        border-radius: 3px;
        padding: 12px;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
        background-color: #eaeef2;
        white-space: pre-wrap;
        word-wrap: break-word;
        font-size: 90%;
        line-height: 1.5em;
        padding: 2px 4px;
    }

    pre code {
        color: #273d56;
    }

    table {
        margin-top: 20px;
    }

    th,
    td {
        padding-right: 10px;
        padding-bottom: 5px;
        vertical-align: top;
    }

    #root{
        margin: 0 auto;
    }

    .ava-popup .mapboxgl-popup-content {
        background-color: ${(props) => props.theme.colors.primary};
        padding: 5px 10px;
        color: white;
        font-size: 14px;
        border-radius: 50px;
        min-width: max-content;
    }

    .ava-popup .mapboxgl-popup-tip {
        border-top-color: transparent;
    }
`;
