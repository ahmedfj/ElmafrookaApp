import React, { useState } from "react";
import { createPost } from "../../api";
import { withRouter, Link } from "react-router-dom";
import "./CreatePost.css";
import RichTextEditor from 'react-rte';
import { SketchPicker } from 'react-color'

const CreateNews = props => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    description_color:"",
    shortdescription: "",
    publishpost: false,
    publishpostmainpage: false,
    typeofpost: "",
    vidorimg: "",
    writername: "",
    rating:"",
    isoncarousel: false
  });

  const [colorPickerBg,setColorPickerBg] = useState(undefined)
  const [choosenColor,setChoosenColor] = useState(undefined)
  const[showColors,setShowColors] = useState(false)
const handleChangeColor = (color) =>{
setColorPickerBg(color)
setChoosenColor(color.hex);
formData.description_color = color.hex

}

const [textValue,setTextValue] = useState(RichTextEditor.createEmptyValue()) 

 const handleEditorChange = (value) =>{
  value.toString('html')
   setTextValue(value)
   formData.description = textValue._cache.html
  console.log(formData.description);
  
 
}
const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: ['INLINE_STYLE_BUTTONS', 'HISTORY_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'}
  ]
};
  const handleChange = event => {
    //get the name of input
    const name = event.target.name;
    // get input value
    const value = event.target.value;

    const newForm = Object.assign(formData);
    newForm[name] = value;

    setFormData({
      ...newForm
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newPost = formData;
    const user = props.user;

    createPost(user, newPost)
      .then((post) => props.history.push(`/post/${post.data.post._id}`))
      .then(() => console.log("Created"))
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
                height: "35px",
                textAlign:"justify"
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
            )
  return (
    <div className="create-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="info-data">
          <div className="input-cont">
            <label>القسم</label>
            <select
              required
              name="typeofpost"
              className="custom-select my-1 mr-sm-2"
              onChange={handleChange}
              value={formData.typeofpost}
              id="inlineFormCustomSelectPref"
            >
              <option value=""> آختر</option>
              <option>تقارير</option>
              <option> مقابلات</option>
              <option>فيتشر</option>
              <option>مراجعات</option>
            </select>
          </div>

          <div className="input-cont">
            <label>النوع</label>
            <select
              required
              name="vidorimg"
              className="custom-select my-1 mr-sm-2"
              onChange={handleChange}
              value={formData.vidorimg}
            >
              <option value="">اختر</option>
              <option>فديو</option>
              <option>صورة</option>
            </select>
          </div>
          <div className="input-cont">
            <label>العنوان</label>
            <br />
            <input
            required
              className="form-control"
              name="title"
              type="text"
              maxLength="114"
              placeholder="العنوان"
              style={{
                width: "20em",
                borderRadius: "4px",
                border: "1px solid #d6d6d6",
                height: "35px",
                textAlign:"justify"
              }}
              onChange={handleChange}
              value={formData.title}
            />
          </div>
        </div>
     {formData.typeofpost === "مراجعات" || formData.typeofpost === "بروفايل" ? reviewsAndProfilesOptions : ""}
        <div className="info-data">
          <div className="input-cont">
            <label>وصف قصير</label>
            <br />
            <textarea
            required
              name="shortdescription"
              onChange={handleChange}
              placeholder="وصف قصير"
              maxLength="164"
              style={{
                width: "17em",
                resize: "none",
                textAlign: "justify",
                border: "1px solid #ced4da",
                height: "117px",
                padding: "4px 6px",
                borderRadius: "5px"
              }}
              value={formData.shortdescription}
            />
          </div>

          <div className="input-cont">
            <label>الوصف</label>
            <p onClick={() => setShowColors(!showColors)} className="color-btn-create">Color</p>
            <div style={{color:`${choosenColor}`}}>
            <RichTextEditor
        value={textValue}
        onChange={handleEditorChange}
        placeholder="الوصف"
        toolbarConfig={toolbarConfig}
        rootStyle={{toolbarStyle:{color:"red"}}}
      />
      </div>
      <div onMouseLeave={() => setShowColors(false)}>
               {showColors ?<SketchPicker
                   color={colorPickerBg}
                   onChange={handleChangeColor}
                   disableAlpha={true}
                /> : "" } 
              </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary crBtn">
          إنشاء 
        </button>
      </form>
      <Link className="headLink backlink" to="/dashboard">
        ◁ العودة
      </Link>
    </div>
  );
};

export default withRouter(CreateNews);
