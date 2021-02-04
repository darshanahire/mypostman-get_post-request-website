console.log("This Project 6")

let paramCount = 1
// initially parameter box is hidden
document.getElementById("parameterBox").style = "display:none"

// initially responce result is also hidden
document.getElementById("dispalyContain").style = "display:none"

// this hide the parameter box when contain type is json
let JSONid = document.getElementById("JSONid")
JSONid.addEventListener("click", () => {
    document.getElementById("JSONBox").style = "display:block"
    document.getElementById("parameterBox").style = "display:none"
})

// this hide the jsonbox when contain type is custum parameters
let CPid = document.getElementById("CPid")
CPid.addEventListener("click", () => {
    document.getElementById("JSONBox").style = "display:none"
    document.getElementById("parameterBox").style = "display:block"
})

// this code add and delete parameter parameters in dom
let plusbtn = document.getElementById("plusbtn")
plusbtn.addEventListener("click", () => {
    let addparams = document.getElementById("addparams")
    let str = `<div class="row mb-1">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${paramCount + 1} :</label>
                    <div class="col">
                        <input  type="text" class="form-control" placeholder="Enter Parameter key ${paramCount + 1}" id="key${paramCount + 1}">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Enter Parameter Value ${paramCount + 1}" id="value${paramCount + 1}">
                    </div>
                <button type="button" class="col-sm-1 btn btn-primary deletebtn">-</button>
                </div>`;
    paramCount++
    addparams.innerHTML += str

    // this detete parameter in dom 
    deletebtn = document.getElementsByClassName("deletebtn")
    for (item of deletebtn) {
        item.addEventListener("click", (e) => {
            e.target.parentElement.remove()
            paramCount--
        })
    }
})


// main code is here
let submit = document.getElementById("submit")
// collecting all the form input 
submit.addEventListener("click", () => {
    let url = document.getElementById("url").value
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='containType']:checked").value

    // console.log(requestType);
    // console.log(contentType);

    // collecting costum kes and values
    if (contentType == "Costum-Parameters") {
        var data = {};
        for (let i = 0; i < (paramCount + 1); i++) {
            if (document.getElementById('key' + (i + 1)) != undefined) {
                let key = document.getElementById('key' + (i + 1)).value;
                let value = document.getElementById('value' + (i + 1)).value;
                data[key] = value
                console.log(key);
                console.log(value);
            }
        }
        data = JSON.stringify(data);
        //console.log(data);
    }
    else {
        // collecting direct string from textarea
        data = document.getElementById("responceTextarea").value
    }
    // console.log(data);

    // Feching GET Request
    if (requestType == "GET") {
        document.getElementById("dispalyContain").style = "display:block"
        document.getElementById('dispalytextarea').innerHTML = "Feching your Request...please wait..."
        fetch(url, {
            method: "GET"
        }).then(response => response.text()).then((text) => {
            // let result = document.getElementById("dispalytextarea")
            // result.innerHTML = text
            document.getElementById('dispalytextarea').innerHTML = text;
            Prism.highlightAll();
        })
    }
    // Feching POST Request
    else {
        document.getElementById("dispalyContain").style = "display:block"
        document.getElementById('dispalytextarea').innerHTML = "Feching your Request...please wait..."
        fetch(url, {
            method: "POST",
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.text()).then((text) => {
            // let result = document.getElementById("dispalytextarea")
            // result.innerHTML = text
            document.getElementById('dispalytextarea').innerHTML = text;
            Prism.highlightAll();
        })

    }

})




