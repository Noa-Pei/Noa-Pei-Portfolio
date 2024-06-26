import {useContext} from "react";
import {useForm} from "react-hook-form";
import {BlogContext} from "../Providers/Blog-Provider";
import {AuthentiContext} from "../Providers/Authentic-Provider";
import {useNavigate} from "react-router-dom";

export function NewPostForm({onPostSubmit}){
    const {addPost, updatePost, selectedPost, setSelectedPost} = useContext(BlogContext);
    const {user} = useContext(AuthentiContext);
    const { register, handleSubmit, formState, reset } = useForm();
    const navigate = useNavigate();

    // in this case user === admin, only admin can manage the posts (add, remove or edit).
    if(!user) {
        return <p className="textDesign">You must sign in first!</p>
    };
    
    const handleNewSubmission = (data) => {
        if (selectedPost) {
            updatePost(selectedPost, data);
            setSelectedPost(null);
            // navigating back to the posts page following the post update allow the admin to check 
            // if the edited post is to s/he's satisfaction, and continue editing other posts.
            navigate('/posts');
        } else {
            addPost({
                title: data.title,
                description: data.description,
                body: data.body,
                posted_by: user.u_id
            })
            reset();
        }
    }

    return (
        <div className="py-5 text-center container">
        <h1>Admin</h1>
        <form className="adminForm" method="post" onSubmit={handleSubmit(handleNewSubmission)}>

            {/* throughout the form the input values check if a post exists, this is for the purpose of editing within the admin form. */}
            {/* in effect, the admin form is used for both creating a new post and editing an exisiting one. */}
            
            <label htmlFor="title" className="textDesign">Title</label>
            {/* the pattern regex validates if the input is English letters and/or spaces and/or special characters. */}
            <input type="text" defaultValue={selectedPost ? selectedPost.title : null} 
            {...register('title', {required:true, pattern: /^[A-Za-z ]+[A-Za-z0-9_!@#$%^&*()+\-=[\]{};:"\\|,.<>/?' ]+$/})} 
            readOnly={false} />
            {formState.errors.title && formState.errors.title.type === 'required' && 
            <p className="text-danger">◉ Must enter title.</p>}
            {formState.errors.title && formState.errors.title.type === 'pattern' && 
            <p className="text-danger">◉ Letters must be English.</p>}
            
            <label htmlFor="description" className="textDesign">Description</label>
            {/* setting maxLength outside the register limits the number of characters the user is able to input, description should be short. */}
            <textarea defaultValue={selectedPost ? selectedPost.description : null} {...register('description', {required:true})} maxLength={200} readOnly={false} />
            {formState.errors.description && formState.errors.description.type === 'required' && 
            <p className="text-danger">◉ Must provide a description.</p>}
            {formState.errors.description && formState.errors.description.type === 'maxLength' &&
            <p className="text-danger">◉ Max characters raeched.</p>}
            
            <label htmlFor="body" className="textDesign">Body</label>
            <textarea className="text-area" defaultValue={selectedPost ? selectedPost.body : null} {...register('body')} wrap="soft" readOnly={false} />
 
            <div className="adminBtns">
            {selectedPost ? <button className='btn btn-warning' type="submit">Update Post</button> : <button className='btn btn-info' type="submit">Create Post</button>}

            </div>
        </form>
        </div>
    )
};





