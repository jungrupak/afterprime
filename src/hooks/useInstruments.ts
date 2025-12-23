import { useState, useEffect } from "react";
import axios from "axios";

export interface InstrumentApi {
  symbol: string;
  point: number;
  contractSize:number;
  swapLong:number;
  swapShort:number;
  tickBookDepth:number;
  volumeMin: number;
  volumeStep: number;
  }

export function useInstrument(){
  const [allIsntruments, setAllInstruments] = useState<InstrumentApi[]>([]);
    
  useEffect(()=>{
    const fetchInstruments = async () => {
      try{
        const res = await axios.get("/api/instruments");
        if(!res){
          throw new Error ("Failed to Fetch")
        }
        const data = res.data;
        setAllInstruments(data);

      }catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error occurred";
      }
    }

    fetchInstruments();
  }, []);

  return {allIsntruments}

}