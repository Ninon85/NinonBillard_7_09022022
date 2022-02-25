import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

const DeleteCard = ({ id }) => {
	const dispatch = useDispatch();
	const deleteArticle = () => {
		dispatch(deletePost(id));
	};

	return (
		<div
			onClick={() => {
				if (window.confirm("Voulez vous vraiment supprimer ce post ?")) {
					deleteArticle();
				}
			}}
		>
			<i className="fa fa-trash" title="Supprimer le post"></i>
		</div>
	);
};

export default DeleteCard;
