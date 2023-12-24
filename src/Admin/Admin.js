import {useContext} from "react";
import {useForm} from "react-hook-form";
import {BlogContext} from "../Providers/Blog-Provider";
import {AuthentiContext} from "../Providers/Authentic-Provider";
import {useParams, useNavigate} from "react-router-dom";


export function NewPostForm({onPostSubmit}){
    const {posts, addPost, updatePost} = useContext(BlogContext);
    const {user} = useContext(AuthentiContext);
    const { register, handleSubmit, formState, errors, reset } = useForm();
    const { id } = useParams();
    const post = posts.find(element => element.id === id);
    const navigate = useNavigate();
 
    // in this case user === admin, only admin can manage the posts (add, remove or edit).
    if(!user) {
        return <p className="textDesign">You must sign in first!</p>
    };
    

    const handleNewSubmission = (data) => {
        const today = new Date().toISOString().slice(0,10);
        if(data.createdAt !== today) {
            alert("Please enter today's date");
            return;
          }

        // since the post id is manually iputed, it is important to verify if a post carrying the new input id already exists.
        // since many functions, such as "remove" or "update" post rely on the specific post's id.
        const idExists = posts.some(post => post.id === data.id);
        if (idExists) {
            alert('ID already exists, enter new ID.')
        };

        if(!idExists){
            addPost({
                id: data.id,
                title: data.title,
                description: data.description,
                body: data.body,
                createdAt: data.createdAt
            });
            reset();
        };
    };

    const handleEditPost = (data) => {
        const updated = {
            id: data.id,
            title: data.title,
            description: data.description,
            body: data.body,
            createdAt: data.createdAt
        };
        updatePost(updated);
        // navigating back to the posts page following the post update allow the admin to check 
        // if the edited post is to s/he's satisfaction, and continue editing other posts.
        navigate('/posts');
    };



    return (
        <div className="py-5 text-center container">
        <h1>Admin</h1>
        <form className="adminForm" method="post" onSubmit={handleSubmit(handleNewSubmission)}>

            {/* throughout the form the input values check if a post exists, this is for the purpose of editing within the admin form. */}
            {/* in effect, the admin form is used for both creating a new post and editing an exisiting one. */}

            <label htmlFor="id" className="textDesign">ID</label>
            {/* the pattern regex validates if the input is numbers. */}
            <input type="text" value={post ? post.id : null} {...register('id', {required:true, pattern: /^\d+$/})} />
            {formState.errors.id && <p className="text-danger">◉ must enter valid ID, numbers only.</p>}
            
            <label htmlFor="title" className="textDesign">Title</label>
            {/* the pattern regex validates if the input is English letters. */}
            <input type="text" defaultValue={post ? post.title : null} {...register('title', {required:true, pattern: /^[A-Za-z]+$/})} readOnly={false} />
            {formState.errors.title && formState.errors.title.type === 'required' && 
            <p className="text-danger">◉ must enter title.</p>}
            {formState.errors.title && formState.errors.title.type === 'pattern' && 
            <p className="text-danger">◉ must only contain English letters.</p>}
            
            <label htmlFor="description" className="textDesign">Description</label>
            {/* setting maxLength outside the register limits the number of characters the user is able to input, description should be short. */}
            <textarea defaultValue={post ? post.description : null} {...register('description')} maxLength={50} readOnly={false} />
            {formState.errors.description && <p className="text-danger">◉ max characters raeched.</p>}
            
            <label htmlFor="body" className="textDesign">Body</label>
            <textarea defaultValue={post ? post.body : null} {...register('body')} readOnly={false} />
            
            <label className="textDesign">Post Date</label>
            <input type="date" {...register('createdAt')} />
 
            <div className="adminBtns">
                <button className='btn btn-info' type="submit">Create Post</button>
                <button className='btn btn-warning' onClick={handleSubmit(handleEditPost)}>Update Post</button>
            </div>
        </form>
        </div>
    )
};


