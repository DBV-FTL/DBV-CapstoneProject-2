import React,{useState} from 'react'
import './AddNewItem.css'
import { useNavigate } from 'react-router-dom'
import apiClient from "../../services/apiClient"


function AddNewItem({appState, updateMenu}) { 
    const [formInput, setFormInput] = useState({name:'', image_url:'', cost:'', rating:''})
    const navigate = useNavigate()

    function handleChange(e) {
        const name= e.target.name
        const value= e.target.value

        setFormInput({...formInput, [name]:value})
    }
    

    async function handleSubmit(e) {
        e.preventDefault()
        await apiClient.addNewItem(formInput)
        updateMenu({...appState, menuItems:[...appState.menuItems, formInput]})
        setFormInput({name:'', image_url:'', cost:'', rating:''})
        navigate('/')
    }

    return (
        <div>
            <form>
                <label> Name </label>
                <input value={formInput.name} onChange={(e) => handleChange(e)} name='name' placeholder='name' required/>
                <label> Image </label>
                <input value={formInput.image_url} onChange={(e) => handleChange(e)} name='image_url' placeholder='image' required/>
                <label> Cost </label>
                <input  value={formInput.cost} type='number' onChange={(e) => handleChange(e)} name='cost' placeholder='cost' required/>
                <label> Rating </label>
                <input  value={formInput.rating} type='number' onChange={(e) => handleChange(e)} name='rating' placeholder='rating' required/>
                <button onClick={(e) => handleSubmit(e)} className='submit-form'> Submit </button>
            </form>
        </div>
    )
}

export default AddNewItem
