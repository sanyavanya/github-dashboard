import React from 'react';
import "./Paginator.css"

const Paginator = ({pagesAmount, page, onPageChange}) => {
	let paginator = [];
	if (pagesAmount > 1) {
		paginator = [<span key="leftbracket">[ </span>];
		
		for (let i = 1; i <= pagesAmount; i++) {
			let linkStyle = 'pageLink';
			if (i === page) linkStyle += ' current';
			let newPageLink = [
	            <li key ={i} className={linkStyle} onClick={onPageChange} style={{display: "inline"}}>
	              {i}
	            </li>
	          ];
	        let separator = [<span key={`separator ${i}`}>, </span>];
	        if (i < pagesAmount) newPageLink = newPageLink.concat(separator);
			paginator = paginator.concat(newPageLink);
	    }

	        paginator = paginator.concat(<span key="rightbracket"> ]</span>);
    }





	return (
		<div id='paginator'>{paginator}</div>
	)
}

export default Paginator;