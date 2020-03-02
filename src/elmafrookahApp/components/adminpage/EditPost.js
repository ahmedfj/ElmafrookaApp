import React, { useState, useEffect } from "react";
import { showPost, updatePost } from "../../api";
import { withRouter } from "react-router-dom";
import "./EditPost.css";
import RichTextEditor from 'react-rte';
import { SketchPicker } from 'react-color'
import Texteditor from "./Texteditor";

const EditPost = props => {
  const user = props.user;
  const postId = props.postId;
  const [formData, setFormData] = useState({
    imge: "",
    title: "",
    videolink: "",
    shortdescription: "",
    description: "",
    description_imgs:[],
    typeofpost: "",
    writername:"",
    rating:"",
    publishpost: false,
    isoncarousel: false
  });

  const [descriptionData,setDescriptionData] = useState('') 
  useEffect(() => {
    
    showPost(user, postId)
      .then(response => {
        
        const post = response.data.post;
        setFormData({
          ...post
        });
        setDescriptionData(post.description)
          console.log(post);
          
      })
      .catch(error => console.log(error));

  }, []);

  
  const handleEditorChange = (value) =>{

   formData.description = value
  console.log(formData.description);
  
   
  }



  const handleChange = event => {
    //get the name of input
    const name = event.target.name;
    // get the value of input
    const value = event.target.value;
    const newForm = Object.assign(formData);
    newForm[name] = value;
    setFormData({
      ...newForm
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const updatedPost = formData;
    updatePost(user, updatedPost, postId)
      .then(() => props.history.push(`/post/${postId}`))
      .catch(error => console.log(error));
  };
  const reviewsAndProfilesOptions = (
    <div className="info-data">
       <div className="input-cont">
            <label>إسم الكاتب</label>
            <br />
            <input
              required
              className="form-control"
              name="writername"
              type="text"
              placeholder="الإسم"
              style={{
                width: "20em",
                borderRadius: "4px",
                border: "1px solid #d6d6d6",
                height: "35px"
              }}
              onChange={handleChange}
              value={formData.writername}
            />
          </div>
          {formData.typeofpost === "مراجعات" ? <div className="input-cont">
            <label>التقييم</label>
            <select
              required
              name="rating"
              className="custom-select my-1 mr-sm-2"
              onChange={handleChange}
              value={formData.rating}
              id="inlineFormCustomSelectPref"
            >
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option> 3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div> : ""}

          </div>
            );
  return (
    <div className="editinfo-cont">
      <div className="editinfo">
        <form onSubmit={handleSubmit}>
          <div className="top-info-data">
            <div className="input-cont">
              <label>القسم</label>
              <br />
              <select
                required
                name="typeofpost"
                className="custom-select my-1 mr-sm-2"
                onChange={handleChange}
                value={formData.typeofpost}
                id="inlineFormCustomSelectPref"
              >
                <option value=""> آختر</option>
                <option>بروفايل</option>
                <option> مقابلات</option>
                <option>فيتشر</option>
                <option>مراجعات</option>
              </select>
            </div>
            <div className="input-cont">
              <label>العنوان</label>
              <br />
              <input
                required
                maxLength="114"
                name="title"
                onChange={handleChange}
                value={formData.title}
              />
            </div>
          </div>
          {formData.typeofpost === "مراجعات" || formData.typeofpost === "بروفايل" ? reviewsAndProfilesOptions : ""}
          <hr />
          <div className="bottom-info-data">
            <div className="input-cont">
              <label>وصف قصير</label>
              <br />
              <textarea
                required
                name="shortdescription"
                maxLength="164"
                onChange={handleChange}
                style={{ width: "20em", height: "7em" }}
                value={formData.shortdescription}
              />
            </div>
            <div className="input-cont">
            <Texteditor imgsArr={formData.description_imgs} description={descriptionData} handleEditorChange={handleEditorChange}/>
            </div>
          </div>
          <hr />
          <button className="btn btn-primary" type="submit">
            تحديث
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(EditPost);
