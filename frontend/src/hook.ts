import cheerio from 'cheerio';
import { useState, useEffect } from "react";
import axios from 'axios';
export default function useFetchTeachers() {
    const [html, setHtml] = useState('');
    const [data, setData] = useState<object[]>([]);
    useEffect(() => {
        const fetchHtml = async (url: string) => {
            try {
                const response = await axios.get(url, {
                    responseType: 'text'
                });
                setHtml(response.data);
                console.log(response.data);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.log("Fetch error: ", err.message);
                } else {
                    console.log("Unknown error");
                }
            }
        }
        fetchHtml("https://electronics.lnu.edu.ua/en/about/staff/");
        const $ = cheerio.load(html);
        const links = $('tr a').toArray()
            .map(el => $(el).attr("href"))
            .filter(url => url.includes("electronics.lnu.edu.ua"));
        const img_regex = /url\(["']?(https?:\/\/[^"']+)["']?\)/;

        for (const link of links) {
            fetchHtml(link);
            const img = $('.photo').attr("style").match(img_regex).pop();
            const name = $('h1.page-title').text();
            const email = $('a:contains("lnu.edu.ua")').first().text();
            const position = $("span:contains(Посада)").next().contents()  
            .filter(function() {  
              return this.nodeType === 3; 
            })
            .text(); 
            const result = {
                name,
                position,
                email,
                img
            }
            data.push(result);
        }
    }, [])

    return {data};
}