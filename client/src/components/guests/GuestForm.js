import React,{useState,useContext,useEffect} from 'react'
import GuestContext from '../../context/guestContext/guestContext';

const GuestForm = () => {
  const {addGuest,editTable,updateGuest,clearEdit} = useContext(GuestContext)
  useEffect(() => {
    if(editTable !== null ){
      setGuest(editTable)
    } else {
      setGuest({
        name:'',
        phone:'',
        dietary:'Non-Veg'
       })
    }
  } ,[editTable])
  const [guest,setGuest] = useState({
    name:'',
    phone:'',
    dietary:'Non-Veg'
  })
  if(editTable !== null){
    console.log(editTable)
  }

  const {name, phone, dietary} = guest 

  const handleChange = e => {
    setGuest({
      ...guest,
      [e.target.name]: e.target.value
    })
  }
  const onsubmit = e=> {
    e.preventDefault()
    if(editTable !== null){
      updateGuest(guest)
      clearEdit()
    } else{
      addGuest(guest)
      setGuest({
       name:'',
       phone:'',
       dietary:'Non-Veg'
      })
    }
  
  }
  return (
    <div className="invite-section">
      <h1>{editTable !== null ? ' Edit Guest' : 'Invite Someone'}</h1>
      <form onSubmit={onsubmit} >
        <input type="text" placeholder="Name" name="name"  value={name} onChange={handleChange} />
        <input type="text" placeholder="Phone" name="phone"  value={phone} onChange={handleChange} />
        <p className="options-label">Dietary</p>
        <div className="options">
          <label className="container">Non-veg
        <input type="radio" name="dietary" value='Non-Veg' checked={dietary === 'Non-Veg'} onChange={handleChange} />
            <span className="checkmark"></span>
          </label>
          <label className="container">Vegan
        <input type="radio" name="dietary"  value='Vegan' checked={dietary === 'Vegan'} onChange={handleChange} />
            <span className="checkmark"></span>
          </label>
          <label className="container">Pescetarian
        <input type="radio" name="dietary" value='Pescetarian' checked={dietary === 'Pescetarian'} onChange={handleChange} />
            <span className="checkmark"></span>
          </label>
        </div>
        <input type="submit" value= {editTable !== null ? ' Update Guest' : 'Add Guest'}  className="btn" />
        {editTable !== null ? <input onClick={clearEdit} value="cancel" type="button" className="btn clear" /> : null  }
      </form>
    </div>
  )
}

export default GuestForm
