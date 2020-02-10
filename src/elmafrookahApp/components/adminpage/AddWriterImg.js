import React, { useState, useEffect } from "react";

import "./ShowPost.css";
import logoicon from "../../../images/logo/logo.png";

import { storage } from "../../../firebase-storage/firebaseConfig";
 
import { showPost, destroyPostWriterImge, createImgOrVid } from "../../api";
// import { withRouter } from "react-router-dom";

const AddWriterImg = props => {
  const user = props.user;
  const postId = props.postId;
  const [post, setPosts] = useState({});

  const [createImg, setCreateImg] = useState(false);

  const [imgName, setImgName] = useState("");
  const [imgFile, setFile] = useState("");
  const [fileNotAllowed, setFileTypeErrorMessage] = useState(false);
  const [fileSizeAllowed, setFileSizeErrorMessage] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [loadSpiner, setLoadSpiner] = useState(false);

  const imge = post.writerimge
    ? `${post.writerimge}`
    : logoicon
    ? logoicon
    : !post.writerimge || !logoicon
    ? setLoadSpiner(true)
    : setLoadSpiner(false);

  const showpost = (userr, postid) => {
    showPost(userr, postid)
      .then(res => {
        setPosts(res.data.post);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    showpost(user, postId);
  }, []);

  // Destory image
  const destroyImg = () => {
    setLoadSpiner(true);
    setIsRemoved(true);
    const destImg = storage.refFromURL(`${post.writerimge}`);
    destImg
      .delete()
      .then(() => {
        // File deleted successfully
        console.log("Image deleted");
        setIsRemoved(true);
      })
      .catch(error => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };
  useEffect(() => {
    if (isRemoved) {
      destroyPostWriterImge(user, postId)
        .then(() => {
          console.log("removed from db");
          setIsRemoved(false);
          showpost(user, postId);
          setLoadSpiner(false);
        })
        .catch(error => console.log(error));
    }
  }, [isRemoved]);
  //uploads images handler
  const handleUpload = event => {
    // const name = event.target.name;
    const value = event.target.value;

    setImgName(value);
    const imageFile = event.target.files[0];

    //Check file type must be png || jpeg || jpg
    if (imageFile) {
      if (
        imageFile.type !== "image/jpeg" &&
        imageFile.type !== "image/png" &&
        imageFile.type !== "image/jpg"
      ) {
        console.log("Only (jpeg,png,jpg) images are allowed");
        setFileTypeErrorMessage(true);
      } else {
        setFileTypeErrorMessage(false);
      }
      if (imageFile.size > 5 * 1024 * 1024) {
        console.log(imageFile.size.width);
        setFileSizeErrorMessage(true);
      } else {
        setFileSizeErrorMessage(false);
      }
    }

    if (!imageFile) {
      setFile("");
    } else {
      setFile(imageFile);
    }
  };
  //Save image on submit
  const handleImgSubmit = event => {
    event.preventDefault();
    const postid = props.postId;
    const user = props.user;
    const uploadTask = storage
      .ref(`images/writer${postid}${imgFile.name}`)
      .put(imgFile);
    // Firbase storage

    uploadTask.on(
      "state_changed",
      snapshot => {
        //progress
        setLoadSpiner(true);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("completed");
        storage
          .ref("images")
          .child("writer" + postid + imgFile.name)
          .getDownloadURL()
          .then(url => {
            //Save the new image in DB
            console.log("uploded to storage");
            createImgOrVid(user,"", url, "", "", postId)
              .then(() => console.log("saved in db"))
              .then(() => {
                setCreateImg(false);
                showpost(user, postId);
                setFile("");
                setImgName("");
              })
              .catch(error => console.log(error));
            //  setIsCreated(true)
            setLoadSpiner(false);
          });
      }
    );
  };

  //Image form
  const uploadAnImg = (
    <form id="imgform" onSubmit={handleImgSubmit} encType="multipart/form-data">
      <div style={{ textAlign: "start" }} className="custom-file">
        <input
          name="image"
          type="file"
          className="custom-file-input"
          id="customFileLangHTML"
          onChange={handleUpload}
          value={imgName}
        />
        <label
          className="custom-file-label"
          htmlFor="customFileLangHTML"
          data-browse="بحث"
        >
          {imgName === "" ? "" : imgFile.name}
        </label>
      </div>
      <aside>
        {fileNotAllowed ? (
          <p style={{ color: "red" }}>Only images are allowed</p>
        ) : (
          ""
        )}
        {fileSizeAllowed ? (
          <p style={{ color: "red" }}>5mb حجم الملف آكثر من </p>
        ) : (
          ""
        )}
      </aside>

      <button className="btn btn-primary btn-sm" type="submit">
        {!loadSpiner ? (
          <span>حفظ الصورة</span>
        ) : (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        )}
      </button>
    </form>
  );

  return (
    <div className="images-container">
      {!loadSpiner ? (
 <img  className="postImg" src={imge} 
  alt="postImage"/>
   ) : (
        <span
          className="spinner-border text-primary"
          role="status"
          aria-hidden="true"
        ></span>
      )}
      {!post.writerimge ? (
        !createImg ? (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setCreateImg(true)}
          >
           صورة الكاتب
          </button>
        ) : (
          ""
        )
      ) : (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => destroyImg(post._id)}
        >
          {loadSpiner ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <span>حذف الصورة</span>
          )}
        </button>
      )}
      {createImg ? uploadAnImg : ""}
    </div>
  );
};

export default AddWriterImg;
