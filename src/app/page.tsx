import Contact from '@/components/Contact';

export default function Home() {
  return (
    <section className="flex flex-col justify-center px-8 py-16 md:py-32 lg:px-10 lg:py-32">
      <h1 className="text-xl font-medium dark:text-white">Kelvin Ampofo</h1>
      <span className="dark:text-neutral-400">Software Engineer</span>
      <section className="mt-6">
        <p>
          <em>Crafting interfaces</em> with a focus on design, human-computer
          interaction and architecture. Currently working in Fintech.
        </p>
        <br />
        <p>
          Developing skill through immersive, hands-on exploration in art and
          technology.
        </p>
      </section>
      <hr className="my-12 h-px border-0 bg-black dark:bg-neutral-800" />
      <Contact />
    </section>
  );
}
