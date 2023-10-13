import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    @font-face {
      font-family: SF PRO;
      src: local("SF PRO"),
        url("../assets/fonts/FontsFree-Net-SF-Pro-Rounded-Medium.ttf")
          format("truetype");
    }
    body {
      font-family: SF PRO, serif !important;
    }
`;

export default GlobalStyle;
