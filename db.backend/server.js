const cloudinary = require("cloudinary").v2;
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(cors());

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "DreamsGuider"
});

db.connect((err) => {
    if (err) {
        console.log("Not Connected...", err);
    }
    else {
        console.log("Database Connected Successfully...");
    }
});


app.post("/images", (req, res) => {

    db.query("SELECT * FROM images", (err, result) => {

        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }

    });

});


// import { v2 as cloudinary } from 'cloudinary';

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'uso2mgmn', 
        api_key: '966167525129129', 
        api_secret: 'R0Gu3NGoqTYKW59GVK3_66iNMPY' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();

app.listen(5000, () => {
    console.log("Your server is running on http://localhost:5000");
});






























































