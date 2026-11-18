const image = document.getElementById("image");
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const file = image.files[0];

    const reader = new FileReader();

    reader.onload = function () {
        fetch("http://localhost:5000/api/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                image: reader.result,
                imageName: file.name
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            console.log(data);
        });
    };
    reader.readAsDataURL(file);
});



































































