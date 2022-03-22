const CommentResults = ({ calcVals }: any) => {
  return (
    <div className="w-full bg-discord-dark flex flex-col justify-center rounded-lg px-4 py-3 text-white overflow-x-scroll scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-discord-dark">
      <h1 className="text-white text-xl font-bold mb-2">Kommentarer</h1>

      {calcVals.enthalpy !== null && calcVals.enthalpy < 0 && (
        <p className="font-semibold">
          Reaktionen er exoterm, da entalpien er negativ. Det vil sige, at
          reaktionen optager varme.
        </p>
      )}
      {calcVals.enthalpy !== null && calcVals.enthalpy > 0 && (
        <p className="font-semibold">
          Reaktionen er endoterm, da entalpien er positiv. Det vil sige, at
          reaktionen afgiver varme.
        </p>
      )}

      {calcVals.gibs !== null && calcVals.gibs < 0 && (
        <p className="font-semibold">
          Reaktionen er spontan, da Gibbs Energien er negativ.
        </p>
      )}
      {calcVals.gibs !== null && calcVals.gibs > 0 && (
        <p className="font-semibold">
          Reaktionen er ikke spontan, da Gibbs Energien er positiv.
        </p>
      )}
    </div>
  );
};

export default CommentResults;
