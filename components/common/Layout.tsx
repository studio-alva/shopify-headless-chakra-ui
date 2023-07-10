import { ReactNode } from "react";
import Header from "components/common/Header/Header";
import Footer from "components/common/Footer/Footer";
import Head from "@components/common/Head";
import React from "react";
import { Box, Container } from "@chakra-ui/react";
import Info from "@components/info/Info";

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({ children }) => (
  <>
    <nav>
      <Container maxW="container.xl" py={"32px"}>
        <Head />
        <Header />
      </Container>
    </nav>
    <main>
      <Container maxW="container.xl" py={"32px"}>
        {children}
      </Container>
    </main>
    <footer>
      <Info />
      <Footer />
    </footer>
  </>
);

export default Layout;
