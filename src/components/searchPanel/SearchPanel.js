import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MyInput from '../inputComponent/MyInput'
import { useInput } from '../hooks'

const SearchPanel = () => {
    const dispatch = useDispatch()
    const { inputValue, onInput } = useInput()
    const { itemList } = useSelector(state => state)

    const sortedPost = useCallback(() => {
        if(inputValue) {
            return itemList.filter(item => item.title.toLowerCase().includes(inputValue.toLowerCase()))
        }

        return itemList
    }, [itemList, inputValue])

    useEffect(() => {
        dispatch({type: "FILTER", filteredArray: sortedPost()})
    }, [inputValue, itemList, dispatch, sortedPost])

    return (
        <div style={{display: "flex"}}>
            <MyInput
                className="styled-input"
                value={inputValue}
                onInput={onInput}
                placeholder="search..."
                />
        </div>
    )
}

export default SearchPanel