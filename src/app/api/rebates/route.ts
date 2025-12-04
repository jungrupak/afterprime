import axios from "axios";

export async function GET(){
    try{
        const baseUrl = process.env.REBATE_BASE_URL;
        if(!baseUrl){
            throw new Error("Rebate base url endpoint is missing");
        }
        const res = await axios.get(baseUrl);
        return Response.json(res.data);

    }catch(err){
        return Response.json(
            { error: String(err) }, 
            { status: 500 }
        );
    }
}