import React from 'react';

const SearchField = ({ onInputChange, input }) => {
	return (
		<div>
			<input placeholder='search on GitHub' className='br3 f4 pa2 w-70' type='text' value = {input} onChange={onInputChange}/>
		</div>
	)
}

export default SearchField;