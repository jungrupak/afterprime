import Lists from "@/components/ui/Lists";
//props type that accepted by this component
import type { ProsConsObjects } from "@/types/prosCons";

interface ProsConsProps {
  data: ProsConsObjects;
}

export function ProsNCons({ data }: ProsConsProps) {
  return (
    <>
      {/* Pros */}
      <div className="mb-16">
        <h3 className="font-bold text-[18px] mb-8">{data.pros.label}</h3>
        <Lists listItems={data.pros.points} bulletVarient="arrow-blue" />
      </div>
      {/* Ends */}

      {/* Cons */}
      <div>
        <h3 className="font-bold text-[18px] mb-8">{data.cons.label}</h3>
        <Lists listItems={data.cons.points} bulletVarient="arrow-red" />
      </div>
      {/* Cons Ends */}
    </>
  );
}
