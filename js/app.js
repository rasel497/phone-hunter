const loadphones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);

}

const displayPhones = phones => {
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.textContent = ''; // specific phone by  search
    // using slice show 20 phones in display
    phones = phones.slice(0, 5);
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text"> ${phone.slug}</p>
            </div>
            `;
        phoneContainer.appendChild(phoneDiv);
    })
}

// search ph by btn
document.getElementById('btn-search').addEventListener('click', function () {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    loadphones(searchText);
})

loadphones();