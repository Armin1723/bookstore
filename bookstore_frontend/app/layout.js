import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Wrapper from "./Wrapper";

export const metadata = {
  title: "Book App",
  description:
    "A book store app offering CRUD operations to add, update, fetch or delete a book.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-['inter'] min-h-screen w-screen flex flex-col overflow-x-hidden">
        <StoreProvider>
          <NextTopLoader color='#22072c' shadow="0 1px 20px #f197f488, 0 0 10px #f197f4f1"/>
          <Wrapper>{children}</Wrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
