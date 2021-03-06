import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { eraseComment } from "../../store/comments";

const ReadOnlyRow = ({ comment, handleEditClick }) => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const handleDeleteClick = async (e) => {
        e.preventDefault();
        console.log('Comment', comment);
        dispatch(eraseComment(comment))
    }

    return (
        <>
            <tr>
                {comment.userId === user.id &&
                    <td>
                        <button
                            className="read-only-button"
                            type="button"
                            onClick={(e) => handleEditClick(e, user)}
                        >
                            Edit
                        </button>
                        <button
                            className="delete-cmt-button"
                            type="button"
                            onClick={handleDeleteClick}
                        >
                            Delete
                        </button>
                    </td>
            }
            </tr>
        </>
    );
};

export default ReadOnlyRow;
