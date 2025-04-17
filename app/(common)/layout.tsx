import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTopButton from "@/components/scroll-to-top";

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <div className="flex w-full">
        <div className="relative flex w-full flex-col">
          <Header/>
          <main className="flex-auto">
            <div className="sm:px-8 mt-16">
              <div className="mx-auto w-full max-w-7xl lg:px-8">
                <div className="relative px-4 sm:px-8 lg:px-12">
                  <div className="mx-auto max-w-2xl lg:max-w-5xl">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer/>
          <ScrollToTopButton/>
        </div>
      </div>
    </div>
  );
}
