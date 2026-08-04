import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Atlas from "./components/Atlas";
import Loop from "./components/Loop";
import Palace from "./components/Palace";
import Engine from "./components/Engine";
import Manifesto from "./components/Manifesto";
import Enroll from "./components/Enroll";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Atlas />
        <Loop />
        <Palace />
        <Engine />
        <Manifesto />
        <Enroll />
      </main>
    </>
  );
}
