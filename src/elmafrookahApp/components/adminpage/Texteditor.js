import React from "react";
import "./CreatePost.css";

import { storage } from "../../../firebase-storage/firebaseConfig";
import ReactQuill from "react-quill"; // ES6

import "react-quill/dist/quill.snow.css"; // ES6

// Accessing the Quill backing instance using React ref functions

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { imgArr:[] };
    this.quillRef = null;
    this.reactQuillRef = null;
    this.imageHandler = this.imageHandler.bind(this);
    this.attachQuillRefs = this.attachQuillRefs.bind(this);
    this.updateImages = this.updateImages.bind(this);
  }

  imageHandler() {
    const input = document.createElement("input");
    let setId = 0
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    
    const range = this.quillRef.getSelection(true);

    input.onchange = async () => {
       
      const file = input.files[0];
      if(this.props.imgsArr.length > 0){
        setId = setId +1
      }
      
      //   const formData = new FormData();
      // console.log(file);
      const uploadTask = storage.ref(`images/editor-${file.name}-${setId}`).put(file);
      // Firbase storage

      uploadTask.on(
        "state_changed",
        snapshot => {
          //progress
        },
        err => {
          console.log(err);
        },
        () => {
          console.log("completed");
          storage
            .ref("images")
            .child(`editor-${file.name}-${setId}`)
            .getDownloadURL()
            .then(url => {
              //Save the new image in DB
              // console.log("uploded to storage");
            //   this.state.imgArr.push({ url: url, ind: range.index });
              
                this.props.imgsArr.push({ url: url, ind: range.index });
                console.log(this.props.imgsArr);
             
             
              // Insert uploaded image
              this.quillRef.insertEmbed(range.index, "image", url);
              // Move cursor to right side of image (easier to continue typing)
              this.quillRef.setSelection(range.index + 1);
            });
        }
      );
    
    };
  }

  componentDidMount() {
    this.attachQuillRefs();
    // console.log(this.props.imgsArr);
    
  }

  componentDidUpdate() {
    this.attachQuillRefs();
    
  }

  updateImages = updatedUrl => {
    console.log(updatedUrl);
     const filteredImgs =   this.props.imgsArr.filter(img => img.url === updatedUrl);
    //  let updatedImgs =   this.props.imgsArr.filter(img => img.url !== updatedUrl);
    //  console.log(filteredImgs,updatedImgs);
 
       
        const destImg = storage.refFromURL(`${filteredImgs[0].url}`);
        destImg
          .delete()
          .then(() => {
            // File deleted successfully
            // this.setState({imgArr:updatedImgs})
            let imgIndex =  this.props.imgsArr.indexOf(updatedUrl)
              this.props.imgsArr.splice(imgIndex, 1)
                           
            //   console.log(this.props.imgsArr);
            // console.log("File deleted successfully from storage");
          })
          .catch(error => {
            console.log(error);
            // console.log(this.props.imgsArr);
          });
    
     
    
  };

  attachQuillRefs() {
      //Make it global
    const selfImg = this;
    
    // Ensure React-Quill reference is available:
    if (typeof this.reactQuillRef.getEditor !== "function") return;
    // Skip if Quill reference is defined:
    if (this.quillRef != null) return;

    const quillRef = this.reactQuillRef.getEditor();
    if (quillRef != null) this.quillRef = quillRef;

    let updatedArr;

    function update(delta, oldContents, source) {
      let range = quillRef.getSelection(true);
      // let contents = quillRef.getContents();

      // console.log(range);

      // console.log("contents", contents);

      // console.log("change", delta);
      // console.log("oldContents", oldContents);
    
   
        oldContents.ops.forEach(element => {
            if (element.insert.hasOwnProperty("image")) {
                 selfImg.props.imgsArr.forEach(elm => {
             if (range.index === elm.ind && elm.url === element.insert.image) {
              //Send found url
             updatedArr = elm.url;
            //  console.log(updatedArr);
             
             selfImg.updateImages(updatedArr);
      
          }  
         });
             
          } 
        });
       
         
        
      

      // console.log(selfImg.props.imgsArr);
    }

    quillRef.on("text-change", update);
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      ["link"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
    ]
  };

  formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "background"
  ];

  handleClick = () => {
    this.imageHandler();
  };

  render() {
    return (
      <div className="text-editor-cont">
        <ReactQuill
          ref={el => {
            this.reactQuillRef = el;
          }}
          theme={"snow"}
          value={this.props.description}
          onChange={this.props.handleEditorChange}
          modules={this.modules}
          formats={this.formats}
        />
        <div className="add-img-container">
        <p className="btn btn-outlinr-primary btn-sm img-btn" onClick={this.handleClick}>إضافة صورة</p>
        </div>
      </div>
    );
  }
}

export default TextEditor;