window.addEventListener("load", ()=>{
    if (!localStorage.getItem("UserId")) {
        window.location.replace("./Login.html");
        
    }
});

import {
    getDownloadURL,
    ref,
    storage,
    uploadBytesResumable,
    doc,
    setDoc,
    db,
    addDoc,
    collection,
    getDocs,
  } from "./FireBase.js";

// public or private
  window.addEventListener("load", async ()=>{
    const Uid = localStorage.getItem("UserId");
    const getBlog = await getDocs(collection(db,"Blogs"));
    const Array = [];
    getBlog.forEach((doc) => {
      if (doc.data().IsPrivate) {
        if (doc.data().uid == Uid) {
          const Obj ={
            id: doc.id,
            ...doc.data(),
          };
          Array.push(Obj);
          
        }
        
      }else{
        const Obj ={
          id: doc.id,
          ...doc.data(),
        };
        Array.push(Obj);

      }
      
   
    });

    ShowBlog(Array);

  });


const title = document.getElementById("title");
const content = document.getElementById("content");
const image = document.getElementById("image");
const uid = localStorage.getItem("UserId");
const createBlog = document.getElementById("createBlog");
const parent = document.getElementById("parent");
const flexSwitchCheckChecked = document.getElementById(
  "flexSwitchCheckChecked"
);


// Create Blogs
const CreateBlog = async () => {

    const ImagePath = await UploadImg(image.files[0]);
    const BlogContent = {
        Title: title.value,
        Content: content.value,
        ImageUrl: ImagePath,
        Uid: uid,
        IsPrivate: flexSwitchCheckChecked.checked,
    }
    await addDoc(collection(db,"Blogs"),BlogContent);
    var myModalEl = document.getElementById("createBlog");
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
    
  alert("Blog Successfully Created!")
 
  console.log(title.value);
  console.log(ImageUrl);

  ShowBlog(Array);
  
  
};

// show Blogs
const ShowBlog = (Array)=>{

  Array.map((event)=>{
    parent.innerHTML += ` <div class="col-lg-6 col-md-12 col-sm-12 my-2">
          <div class="card">
            <h5 class="card-header">
              <img
                src="${event.ImageUrl}"
                width="100%"
                height="300px"
                alt=""
              />
            </h5>
            <div class="card-body">
              <h5 class="card-title"> ${event.Title} </h5>
              <p class="card-text">
              ${event.Content}
              </p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>`;
  })

};

// Upload File function
const UploadImg = (file)=>{
    return new Promise ((resolve, reject)=>{
        const metadata = {
            contentType: "image/jpeg",
          };

          // Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, "images/" + file.name);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(
  "state_changed",
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log("Upload is " + progress + "% done");
    switch (snapshot.state) {
      case "paused":
        console.log("Upload is paused");
        break;
      case "running":
        console.log("Upload is running");
        break;
    }
  },
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case "storage/unauthorized":
        // User doesn't have permission to access the object
        break;
      case "storage/canceled":
        // User canceled the upload
        break;

      // ...

      case "storage/unknown":
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
    reject(error);
  },
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log("File available at", downloadURL);
      resolve(downloadURL);
    });
  }
);
});
};

window.CreateBlog = CreateBlog;


