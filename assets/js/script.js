document.getElementById("search-btn").addEventListener("click",()=>{
    const searchText = document.getElementById("search-text").value;
    document.getElementById("search-text").value = "";
    if(searchText.length>0){
        searchMobile(searchText)
    }else{
        console.log("something wrong")
    }
});

const searchMobile = (searchText) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(result=> result.json())
    .then(data=>showData(data))
};

const showData = (data) => {
    if(!data.status){
        console.log("mobile not found")
    } else{
        const displayData = document.getElementById("display-result");
        displayData.innerHTML="";
        data.data.map(mobile=>{
            const div = document.createElement("div");
            div.classList = "col col-md-4";
            div.innerHTML = `
                <div class="card text-center">
                    <img src="${mobile.image}" class="card-img-top" alt="${mobile.phone_name}">
                    <div class="card-body">
                        <h5 class="card-title">${mobile.brand}</h5>
                        <p class="card-text">${mobile.phone_name}</p>
                        <button class="btn btn-primary" onclick="moreInfo('${mobile.slug}')" data-bs-toggle="modal" data-bs-target="#exampleModal">More Info</button>
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
    const div = document.createElement("div");
    div.classList = "modal-content";
    div.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            ...
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
    `
    document.getElementById("display-mobile").appendChild(div);
}