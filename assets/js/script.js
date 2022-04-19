document.getElementById("search-btn").addEventListener("click",()=>{
    const searchText = document.getElementById("search-text").value;
    document.getElementById("search-text").value = "";
    if(searchText.length>0){
        document.getElementById("error").style.display="none";
        searchMobile(searchText)
    }else{
        document.getElementById("error").style.display="block";
    }
});

const searchMobile = (searchText) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(result=> result.json())
    .then(data=>showData(data))
};

const showData = (data) => {
    if(!data.status){
        console.log("mobile not found");
    } else{
        document.getElementById("text").style.display = "none";
        const displayData = document.getElementById("display-result");
        displayData.innerHTML="";
        data.data.map(mobile=>{
            const div = document.createElement("div");
            div.classList = "col col-md-4";
            div.innerHTML = `
                <div class="card text-center">
                    <div class="mt-2"><img src="${mobile.image}" class="card-img-top" alt="${mobile.phone_name}"></div>
                    <div class="card-body">
                        <h5 class="card-title">${mobile.brand}</h5>
                        <p class="card-text">${mobile.phone_name}</p>
                        <button class="btn btn-primary" onclick="moreInfo('${mobile.slug}')" data-bs-toggle="modal" data-bs-target="#MobileModal">Details >></button>
                    </div>
                </div>
            `;
            displayData.appendChild(div);
        })
    }
};

const moreInfo = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(result => displayMobile(result))
};

const displayMobile = (mobile) =>{
    console.log(mobile)
    if(!mobile.status){
        console.log("no data found");
    } else {
        const displayMobile = document.getElementById("display-mobile");
        displayMobile.innerHTML = `
            <div class="modal-header">
                <h5 class="modal-title" id="mobileModalLabel">${mobile.data.name}</h5>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        `
    }
};

//footer year showing
document.getElementById("year").innerText = new Date().getFullYear();