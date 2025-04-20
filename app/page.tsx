import Particles from "@/components/particles";
import {Navbar} from "@/components/nav";

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black"
    >
      <nav className="my-6 animate-fade-in">
        <Navbar isRoot={true} />
      </nav>
      <div
        className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0"
      />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <div
        className="animate-title duration-1000 flex flex-col items-center gap-8 text-center py-3.5 px-0.5 z-10 cursor-default"
      >
        <div className="font-vinamilk font-semibold">
          <h1
            className="text-8xl text-edge-outline font-display whitespace-nowrap bg-clip-text"
          >
            Giang Tran
          </h1>
          <div className="flex justify-between w-full">
            <span>EST</span>
            <span>1999</span>
          </div>
        </div>
        <span className="whitespace-nowrap text-sm">Developer | Contributor | Lifelong learner | Cat lover</span>
      </div>
      <div
        className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0"
      />
    </div>
  )
}
