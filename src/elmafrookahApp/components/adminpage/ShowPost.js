import React, { useState, useEffect } from "react";
import ReactHtmlParser from 'react-html-parser';

import { storage } from "../../../firebase-storage/firebaseConfig";
import {
  showPost,
  destroyPostImge,
  destroyPost,
  destroyPostVideo,
  destroyPostOnCarousel,
  createImgOrVid,
  updateToPublishPost,
  updatePublishPostToMainPage,
  destroyPostMainPage,
  publishPostToCarusel
} from "../../api";


import { Link, withRouter } from "react-router-dom";
import "./ShowPost.css";
import logoicon from "../../../images/logo/logo.png";
import ReactPlayer from "react-player";
import carouselIcon from "../../../images/carouselicon.png";

import AddCarousel from "./AddCarouselImg";
import RatingStars from "../RatingStars";
import AddWriterImg from "./AddWriterImg";

const ShowPost = props => {
  const [videolink, setVideoLink] = useState("");

  const user = props.user;
  const postId = props.postId;
  const [post, setPosts] = useState({});
  const [createImg, setCreateImg] = useState(false);

  //Formating the createdAt date
  const date = new Date(`${post.createdAt}`);
  const fullDate = date.toLocaleTimeString() + " | " + date.toDateString();
  //Formating the updatedAt date
  const updatedDate = new Date(`${post.updatedAt}`);
  const fullUpdatedDate =
    updatedDate.toLocaleTimeString() + " | " + updatedDate.toDateString();

  //images states
  const [imgName, setImgName] = useState("");
  // const [imgUrl,setImgUrl] = useState('')
  const [imgFile, setFile] = useState("");
  const [fileNotAllowed, setFileTypeErrorMessage] = useState(false);
  const [fileSizeAllowed, setFileSizeErrorMessage] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [loadSpiner, setLoadSpiner] = useState(false);
  const imge = post.imge
    ? `${post.imge}`
    : logoicon
    ? logoicon
    : !post.imge || !logoicon
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
    const postId = props.postId;

    setLoadSpiner(true);
    setIsRemoved(true);
    const destImg = storage.refFromURL(`${post.imge}`);
    destImg
      .delete()
      .then(() => {
        // File deleted successfully
        console.log("Image deleted from storage");
        setIsRemoved(true);
      })
      .catch(error => {
        //  an error occurred!
        console.log(postId);

        console.log(error);
      });
  };
  useEffect(() => {
    if (isRemoved) {
      destroyPostImge(user, postId)
        .then(() => {
          console.log("removed from db");
          setIsRemoved(false);
          showpost(user, postId);
          setLoadSpiner(false);
        })
        .catch(error => console.log(error));
    }
  }, [isRemoved]);

  // Destory current post
  const destroypost = postid => {
    setLoadSpiner(true);
    destroyPost(user, postid)
      .then(() => alert("deleted"))
      .then(() => props.history.push("/dashboard"))
      .catch(error => console.log(error));
    // If post got an image delete it from firbase storage
    if (post.imge) {
      const destImg = storage.refFromURL(`${post.imge}`);
      destImg
        .delete()
        .then(() => {
          // File deleted successfully
          console.log("File deleted successfully from storage");
        })
        .catch(error => {
          console.log(error);
        });
        
    }else if(post.carouselimge){
      const destCrImg = storage.refFromURL(`${post.carouselimge}`);
      destCrImg
        .delete()
        .then(() => {
          // File deleted successfully
          console.log("File deleted successfully from storage");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

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
        alert("Only (jpeg,png,jpg) images are allowed");
        setFileTypeErrorMessage(true);
      } else {
        setFileTypeErrorMessage(false);
      }
      if (imageFile.size > 10 * 1024 * 1024) {
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

  //uploads images handler
  const handelVideoLink = event => {
    const value = event.target.value;
    setVideoLink(value);
  };

  //Save image on submit
  const handleImgSubmit = event => {
    event.preventDefault();
    const user = props.user;
    const uploadTask = storage
      .ref(`images/${postId}${imgFile.name}`)
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
          .child(postId + imgFile.name)
          .getDownloadURL()
          .then(url => {
            //Save the new image in DB
            console.log("uploded to storage");
            createImgOrVid(user, "","", url, "", postId)
              .then(() => console.log("saved in db"))
              .then(() => {
                setCreateImg(false);
                showpost(user, postId);
                setFile("");
                setImgName("");
              })
              .catch(error => console.log(error));
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
          <p style={{ color: "red" }}>
            Only (jpeg,png,jpg) images are allowed!
          </p>
        ) : (
          ""
        )}
        {fileSizeAllowed ? (
          <p style={{ color: "red" }}>10mb حجم الملف آكثر من!</p>
        ) : (
          ""
        )}
      </aside>

      <button className="btn btn-primary btn-sm" type="submit">
        حفظ الصورة
      </button>
    </form>
  );

  const handelVidSubmit = event => {
    event.preventDefault();
    const postid = props.postId;
    const user = props.user;
    createImgOrVid(user,null, null, null, videolink, postid)
      .then(() => console.log("saved in db"))
      .then(() => {
        showpost(user, postId);
        setVideoLink("");
      })
      .catch(error => console.log(error));
  };

  const destroyVideo = postid => {
    const user = props.user;
    destroyPostVideo(user, postid)
      .then(() => console.log("removed a video"))
      .catch(err => console.log(err));
  };
  //Video form
  const uploadVideo = (
    <form id="imgform" onSubmit={handelVidSubmit}>
      {!post.videolink ? (
        <div style={{ textAlign: "right" }} className="custom-file">
          <label>رابط الفديو</label>
          <input
            name="videolink"
            type="text"
            className="form-control"
            onChange={handelVideoLink}
            value={videolink}
          />
        </div>
      ) : (
        ""
      )}
      <br />
      {post.videolink ? (
        <button
          style={{ borderRadius: "7px" }}
          className="btn btn-danger btn-sm"
          onClick={() => destroyVideo(post._id)}
        >
          {!loadSpiner ? (
            <span>حذف الفديو</span>
          ) : (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </button>
      ) : (
        <button
          style={{ borderRadius: "7px" }}
          className="btn btn-primary btn-sm"
          type="submit"
        >
          {!loadSpiner ? (
            <span>إضافة</span>
          ) : (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </button>
      )}
    </form>
  );
  // Publish Post function
  const publishPost = postId => {
    const user = props.user;
    updateToPublishPost(user, postId)
      .then(() => console.log("post is live!"))
      .then(() => showpost(user, postId))
      .catch(error => console.log(error));
  };
  const publishToMainPage = postId => {
    const user = props.user;
    updatePublishPostToMainPage(user, postId)
      .then(() => console.log("post is live On Main Page!"))
      .then(() => showpost(user, postId))
      .catch(error => console.log(error));
  };

  const publishToCarouselBox = postId => {
    const user = props.user;
    publishPostToCarusel(user, postId)
      .then(() => console.log("post is On Carousel!"))
      .then(() => showpost(user, postId))
      .catch(error => console.log(error));
  };

  const destroyfromMainPage = postId => {
    const user = props.user;
    destroyPostMainPage(user, postId)
      .then(() => console.log("post is removed from main page!"))
      .then(() => showpost(user, postId))
      .catch(error => console.log(error));
  };
  const destroyCarouselBoxPost = postId => {
    const user = props.user;
    destroyPostOnCarousel(user, postId)
      .then(() => console.log("post is removed from Carousel!"))
      .then(() => showpost(user, postId))
      .catch(error => console.log(error));
  };

  //For Profile & Reviews only
  const showWriterInfo =(
    <React.Fragment>
      <div className="writer-name">
       <span>: الكاتب</span>
      <p>{post.writername}</p> 
      </div>
    {post.typeofpost === "بروفايل" ? "" : <RatingStars rating={post.rating}/>}  
    </React.Fragment>
  )
  // Show the post type of image
  const showPostTypeImg = (
    <React.Fragment>
      <div className="post">
      <div className="post-title">
              <p>العنوان</p>
          <p style={{fontSize:"20px"}}>{post.title}</p>
        </div>
        {post.typeofpost === "بروفايل" || post.typeofpost === "مراجعات" ? <div style={{width:"100%"}}>
   <div className="rating-name"> 
 {showWriterInfo}
 
  </div>
   </div>:""}

   {post.typeofpost === "بروفايل" || post.typeofpost === "مراجعات" ?  <AddWriterImg user={user} postId={postId}/> : ""}
      
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
          {!post.imge ? (
            !createImg ? (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setCreateImg(true)}
              >
                إضافة صورة
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
        <AddCarousel user={user} postId={postId}/>
        <div className="short-description-cont">
             <p>الوصف القصير</p>
        <p style={{ fontSize: "20px" }}>{post.shortdescription}</p>
        </div>
        <div className="long-description-cont">
             <p>الوصف</p> 
              {ReactHtmlParser(post.description)} 
        </div>
      </div>
      <div className="info-cont">
        <p>Created At: {fullDate}</p>
        <p>Updated At: {fullUpdatedDate}</p>
        <div className="infolinks">
          <button
            className="btn btn-danger btn-sm"
            onClick={() => destroypost(post._id)}
          >
            حذف
          </button>
          <Link
            className="btn btn-primary btn-sm"
            to={`/post/edit/${post._id}`}
          >
            تعديل
          </Link>
        </div>
        {post.publishpost === false ? (
          <button
            className="btn btn-primary btn-sm"
            style={{ margin: "20px 0 0 0" }}
            onClick={() => publishPost(post._id)}
          >
            إضافة
          </button>
        ) : (
          <button
            disabled
            className="btn btn-primary btn-sm"
            style={{ margin: "20px 0 0 0", backgroundColor: "gray" }}
            onClick={() => publishPost(post._id)}
          >
            إضافة
          </button>
        )}
        {post.publishpostmainpage === false ? (
          <button
            className="btn btn-primary btn-sm"
            style={{ margin: "20px 0 0 0" }}
            onClick={() => publishToMainPage(post._id)}
          >
            إضافة الى الصفحة الرئيسية
          </button>
        ) : (
          <button
            className="btn btn-danger btn-sm"
            style={{ margin: "20px 0 0 0" }}
            onClick={() => destroyfromMainPage(post._id)}
          >
            حذف من الصفحة الرئيسية
          </button>
        )}
        {post.isoncarousel ? (
          <button
            className="btn btn-danger btn-sm"
            style={{ margin: "20px 0 0 0" }}
            onClick={() => destroyCarouselBoxPost(post._id)}
          >
            X
            <img
              src={carouselIcon}
              style={{ width: "18%", marginLeft: "5px" }}
              alt="carousel-icon"
            />
          </button>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            style={{ margin: "20px 0 0 0" }}
            onClick={() => publishToCarouselBox(post._id)}
          >
            <img
              src={carouselIcon}
              style={{ width: "18%", marginLeft: "5px" }}
              alt="carousel-icon"
            />
          </button>
        )}
      </div>
    </React.Fragment>
  );
   // Show the post type of video
  const showPostTypeVid = (
    <React.Fragment>
      <div className="post">
        <div className="post-title">
              <p>العنوان</p>
          <h3>{post.title}</h3>
        </div>
        
 {post.typeofpost === "بروفايل" || post.typeofpost === "مراجعات" ? <div style={{width:"100%"}}>
   <div className="rating-name"> 
 {showWriterInfo}
 
  </div>
   </div>:""}

   {post.typeofpost === "بروفايل" || post.typeofpost === "مراجعات" ?  <AddWriterImg user={user} postId={postId}/> : ""}
      

        {!post.videolink ? (
          <img className="postImg" src={logoicon} alt="postImage" />
        ) : (
          <ReactPlayer
            className="orl"
            url={post.videolink}
            controls
            width="480px"
            height="290px"
          />
        )}

        {uploadVideo}
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
          {!post.imge ? (
            !createImg ? (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setCreateImg(true)}
              >
                إضافة صورة
              </button>
            ) : (
              ""
            )
          ) : (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => destroyImg(post._id)}
            >
              حذف الصورة
            </button>
          )}
          {createImg ? uploadAnImg : ""}
        </div>
        <AddCarousel user={user} postId={postId} />
        <div className="short-description-cont">
             <p>الوصف القصير</p>
        <p style={{ fontSize: "20px" }}>{post.shortdescription}</p>
        </div>
        <div className="long-description-cont">
             <p>الوصف</p>
             <div style={{color:post.description_color}}>
              {ReactHtmlParser(post.description)} 
             </div>
        
        </div>
      </div>
      <div className="info-cont">
        <p>Created At: {fullDate}</p>
        <p>Updated At: {fullUpdatedDate}</p>
        <div className="infolinks">
          <button
            className="btn btn-danger btn-sm"
            onClick={() => destroypost(post._id)}
          >
            حذف
          </button>
          <Link
            className="btn btn-primary btn-sm"
            to={`/post/edit/${post._id}`}
          >
            تعديل
          </Link>
        </div>
        {post.publishpost === false ? (
          <button
            className="btn btn-primary btn-sm"
            style={{ margin: "20px 0 0 0" }}
            onClick={() => publishPost(post._id)}
          >
            إضافة
          </button>
        ) : (
          <button
            disabled
            style={{ margin: "20px 0 0 0", backgroundColor: "gray" }}
            className="btn btn-primary btn-sm"
            onClick={() => publishPost(post._id)}
          >
            إضافة
          </button>
        )}
        {post.publishpostmainpage === false ? (
          <button
            className="btn btn-primary btn-sm"
            style={{ margin: "20px 0 0 0" }}
            onClick={() => publishToMainPage(post._id)}
          >
            إضافة الى الصفحة الرئيسية
          </button>
        ) : (
          <button
            className="btn btn-danger btn-sm"
            style={{ margin: "20px 0 0 0" }}
            onClick={() => destroyfromMainPage(post._id)}
          >
            حذف من الصفحة الرئيسية
          </button>
        )}
        {post.isoncarousel ? (
          <button
            className="btn btn-danger btn-sm"
            style={{ margin: "20px 0 0 0" }}
            onClick={() => destroyCarouselBoxPost(post._id)}
          >
            X{" "}
            <img
              src={carouselIcon}
              style={{ width: "18%", marginLeft: "5px" }}
              alt="carousel-icon"
            />
          </button>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            style={{ margin: "20px 0 0 0" }}
            onClick={() => publishToCarouselBox(post._id)}
          >
            <img
              src={carouselIcon}
              style={{ width: "18%", marginLeft: "5px" }}
              alt="carousel-icon"
            />
          </button>
        )}
      </div>
    </React.Fragment>
  );

  return (
    <div className="showPost-cont">
      {post.vidorimg === "صورة"
        ? showPostTypeImg
        : post.vidorimg === "فديو"
        ? showPostTypeVid
        : showPostTypeImg}
    </div>
  );
};

export default withRouter(ShowPost);
