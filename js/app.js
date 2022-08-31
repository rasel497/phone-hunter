const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.textContent = '';
    // using slice show 10 phones in display
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }


    //display no phone foound
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
                 <img src="${phone.image}" class="card-img-top" alt="...">
                 <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">In this article, we will know the HTML Paragraph, & its basic implementation through the examples.</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" herf="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>                  
               
                    </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    })

    //stop spinner or loader toggle 
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}


// part-02 show website search phone by btn id in eventHandler
document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(10);

})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});


// toggle spinners
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();

})

// show deatils button
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    displayPhonesDetails(data.data);
}

// modal display
const displayPhonesDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    // console.log(phone.mainFeatures.sensors[1]); // just try
    phoneDetails.innerHTML = `
    </p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release its comming soon'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Blutooth system'}</P>
    <p>USB: ${phone.others ? phone.others.USB : 'No usb system'}</p>
    <p>ChipSet: ${phone.mainFeatures.chipSet}</P>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No stroage found'}</P>
    <p>Sensors: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensore'}</P>

    `;
}


// loadPhones('apple');