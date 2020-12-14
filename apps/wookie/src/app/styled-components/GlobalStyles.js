import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    /* http://meyerweb.com/eric/tools/css/reset/ 
        v2.0 | 20110126
        License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    /* Global styles below */

    /* apply a natural box layout model to all elements, but allowing components to change (Stolen from Paul Irish)*/
    
    html {
        box-sizing: border-box;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }

    body {
        font-family: 'Raleway', sans-serif;
        font-size: 16px;
        letter-spacing: 0.5px;
    }
    h1 {
        letter-spacing: -1.5px;
        font-size: 60px;
        font-weight: 300;
    }
    h2 {
        letter-spacing: -0.5px;
        font-size: 36px;
        font-weight: 300;
    }
    h3 {
        letter-spacing: 0;
        font-size: 28px;
    }
    strong {
        font-weight: bold;
    }
    header {
        padding: 40px 20px;
        margin-bottom: 40px;
    }
    section {
        padding: 20px;
    }
`;