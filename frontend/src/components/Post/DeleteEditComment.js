import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, updateComment } from "../../actions/post.actions";

const DeleteEditComment = ({ comment, postId }) => {
	const dispatch = useDispatch();
	const [edit, setEdit] = useState(false);
	const [text, setText] = useState("");
	const userData = useSelector((state) => state.userReducer);
	const handleDelete = () => {
		dispatch(deleteComment(postId, comment.id));
	};
	const handleEdit = (e) => {
		e.preventDefault();
		if (text) {
			dispatch(updateComment(postId, comment.id, text));
			setEdit(!edit);
		}
	};
	return (
		<>
			<span className="delete-comment" onClick={handleDelete}>
				Supprimer
			</span>
			{userData.id === comment.userId && (
				<span
					onClick={() => {
						setEdit(!edit);
					}}
				>
					Modifier
				</span>
			)}
			{userData.id === comment.userId && edit && (
				<form action="" onSubmit={handleEdit} className="edit-comment-form">
					<label htmlFor="text" onClick={() => setEdit(!edit)}>
						Annuler
					</label>
					<br />
					<input
						type="text"
						name="text"
						id="text"
						onChange={(e) => setText(e.target.value)}
						defaultValue={comment.content}
					/>
					<br />
					<input type="submit" value="Valider" />
				</form>
			)}
		</>
	);
};

export default DeleteEditComment;
