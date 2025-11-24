
export const revalidate = 60;

export async function getCompareData() {
    const res = await fetch("https://scoreboard.argamon.com:8443/api/costs/comparison?period=7d&symbols=All%20pairs&mode=day&commission=true", {
        next:{revalidate : 60}
    });

    if(!res.ok){
        throw new Error (`Failed to fetch data : ${res.status}`)
    }
    const data = await res.json();
    return data;
}