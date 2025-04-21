import Particles from "@/components/particles";
import {Navbar} from "@/components/nav";

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black"
    >
      <nav className="my-8 animate-fade-in">
        <Navbar isRoot={true} />
      </nav>
      <div
        className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0  dark:via-zinc-300/50 via-zinc-600/50 to-zinc-300/0"
      />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <div
        className="font-semibold z-10 duration-1000 cursor-default text-edge-outline animate-title font-display text-8xl whitespace-nowrap bg-clip-text font-vinamilk"
      >
        <h1>
          Giang Tran
        </h1>
        <div className="flex justify-between w-full text-base">
          <span>EST</span>
          <span>1999</span>
        </div>
      </div>
      <div
        className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 dark:via-zinc-300/50 via-zinc-600/50 to-zinc-300/0"
      />
      <span className="whitespace-nowrap text-sm animate-fade-in mt-8">Developer | Contributor | Lifelong learner | Cat lover</span>
    </div>
  )
}
