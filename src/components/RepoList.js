import React from 'react';
import "./RepoList.css"


const RepoList = ({ items, heading }) => {
	return (
		<div className="repoList">
				{items}
		</div>
	)
}

export default RepoList;