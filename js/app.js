const loadphones = async () => {
    const url = `https://openapi.programming-hero.com/api/phones?search=phone`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

}

loadphones();