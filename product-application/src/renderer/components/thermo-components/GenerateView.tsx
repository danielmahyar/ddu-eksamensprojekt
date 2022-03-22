import TeX from '@matejmazur/react-katex';

const GenerateView = ({ formula }: any) => {
  return (
    <section className="w-full">
      <TeX>{formula}</TeX>
    </section>
  );
};

export default GenerateView;
