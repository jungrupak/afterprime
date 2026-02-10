
export async function getGlobalOptionFields(filedname:string){
    const baseUrl = process.env.NEXT_PUBLIC_WP_BASE_URL;  
    try{
        if(!baseUrl)return;
        const res = await fetch(`${baseUrl}/wp-json/custom/v1/options?field=${filedname}`, {
            next:{revalidate:2100},
        });
        if(!res.ok){
            return "failed to load option block data";
        }
        const fieldData = await res.json();
        return fieldData;
    }catch(err){
        console.error("Failded to fetch data:", err)
    }

}