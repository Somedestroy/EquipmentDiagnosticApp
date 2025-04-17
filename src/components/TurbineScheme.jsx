import K220Schematic from "../assets/K220Scheme.png"; // 

const TurbineScheme = () => {

  return (
    <div className="relative w-full h-full">
      <img
        src={K220Schematic}
        alt="Схема турбины К-220-44-3000"
        className="w-full h-auto object-contain"
      />
    </div>
  );
};

export default TurbineScheme;
