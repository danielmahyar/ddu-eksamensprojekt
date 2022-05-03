import { MathJax } from 'better-react-mathjax';

const GenerateView = ({ formula }: any) => {
  return (
    <section className="w-full">
      <MathJax>{`\\(${formula}\\)`}</MathJax>
    </section>
  );
};

export default GenerateView;
