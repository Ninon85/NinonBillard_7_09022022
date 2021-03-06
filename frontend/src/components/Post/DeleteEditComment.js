import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, updateComment } from "../../actions/post.actions";

const DeleteEditComment = ({ comment, postId }) => {
	const dispatch = useDispatch();
	const [edit, setEdit] = useState(false);
	const [text, setText] = useState("");
	const userData = useSelector((state) => state.userReducer);
	// const error = useSelector((state) => state.errorReducer.error);
	// console.log(error);
	// // {error && <p>{error}</p>};

	const handleDelete = () => {
		dispatch(deleteComment(postId, comment.id));
	};
	const handleEdit = (e) => {
		e.preventDefault();
		if (text && text.trim().length !== 0) {
			dispatch(updateComment(postId, comment.id, text));
			setEdit(!edit);
			// .then(() => {
			// 	if (error) {
			// 		alert(error);
			// 	}
			// });
		} else {
			return alert(
				"Vous devez saisir quelque chose ou bien annuler la modification."
			);
		}
	};
	return (
		<>
			<div className="edit-comment">
				<span
					tabIndex={0}
					onKeyPress={handleDelete}
					className="delete-comment"
					onClick={handleDelete}
				>
					Supprimer
				</span>
				{userData.id === comment.userId && (
					<span
						tabIndex={0}
						onKeyPress={() => {
							setEdit(!edit);
						}}
						onClick={() => {
							setEdit(!edit);
						}}
					>
						Modifier
					</span>
				)}
			</div>
			{userData.id === comment.userId && edit && (
				<form action="" onSubmit={handleEdit} className="edit-comment-form">
					{/* <label htmlFor="text" onClick={() => setEdit(!edit)}>
						Annuler
					</label> */}
					<button onClick={() => setEdit(!edit)}>Annuler</button>
					<input
						type="text"
						name="text"
						id="text"
						onChange={(e) => setText(e.target.value)}
						defaultValue={comment.content}
					/>

					<input type="submit" value="Valider" />
				</form>
			)}
		</>
	);
};

export default DeleteEditComment;
