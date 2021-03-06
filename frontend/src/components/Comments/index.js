import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getComments } from "../../store/comments";
import SingleComment from "../SingleComment";
import './Comments.css';

function Comments({ image }) {
    const dispatch = useDispatch();
    const commentsObj = useSelector(state => state.comments);
    const comments = Object.values(commentsObj).reverse();
    const user = useSelector((state) => state.session.user);
    const [commentData, setCommentData] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        const validationErrors = [];
        if (!commentData.length) validationErrors.push('Comments must contain at least one character');
        setValidationErrors(validationErrors)
        return validationErrors;
    }, [commentData])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { userId: user.id, imageId: image.id, commentData };
        dispatch(addComment(data))
        setCommentData('')
    };

    useEffect(() => {
        dispatch(getComments(image.id))
    }, [dispatch, image.id]);

    return (
        <div className="comments-div">
            <div className="errors-list">
                <ul>
                    {validationErrors.map(error => <li key={error}>{error}</li>)}
                </ul>
            </div>
            <h3 className="comments-title">Comments</h3>
            <div className="comment-box">
                {comments?.map((comment) => (
                    <span key={comment.id} className='single-comment-row'>
                        <SingleComment comment={comment} />
                    </span>
                ))}
            </div>
            <form className="form-comment">
                <textarea
                    name="new-comment"
                    className="new-comment-box"
                    value={commentData}
                    onChange={(e) => setCommentData(e.target.value)}
                    placeholder="Leave a comment"
                    required>
                </textarea>
                <button
                    className="comment-button"
                    type="submit"
                    onClick={handleSubmit}
                >Submit Comment
                </button>
            </form>
        </div>
    )
}

export default Comments;
