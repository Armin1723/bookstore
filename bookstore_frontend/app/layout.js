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
          <Wrapper>{children}</Wrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
