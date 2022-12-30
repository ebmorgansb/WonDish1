import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { createSecondaryReviewThunk } from "../../store/secondaryReview"

export default function CreateSecondaryDish({primaryId, name, address}) {
    const sessUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()
    // const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('')
    // const [address, setAddress] = useState('');
    const [rating, setRating] = useState('');
    const [errors, setErrors] = useState([]);


    useEffect(()=>{
      const errors = []
      if(!sessUser) errors.push("Must be logged in to Host a spot");
    //   if(name.length > 19) errors.push("Name must be less than 20 characters");
    //   if(!name) errors.push("Name is required");
      if(!description) errors.push("Description is required");
      if(description.length > 499) errors.push("Description must be less than 500 characters");
    //   if(!address) errors.push("Street address is required");
    //   if(address.length > 99) errors.push("Street address must be less than 100 characters");
      if(!image) errors.push("Image is required");
      if(image.length > 254) errors.push("Image link must be less than 255 characters");
      if(category && category.length > 19) errors.push("Category must be less than 20 characters");
      if(!rating) errors.push("Rating is required");


      setErrors(errors)
    },[description, sessUser, category, rating, image])

    const handleSubmit = async (e) => {
        e.preventDefault();


        const payload = {
            name,
            description,
            category,
            image,
            address,
            rating,
            user_id: sessUser.id,
            primaryreview_id: primaryId
        };

        const newSecondaryReview = await dispatch(createSecondaryReviewThunk(payload))
        if (newSecondaryReview) {
          history.push(`/dish/${newSecondaryReview.primaryreview_id}`)
        }
      }

    return (
      <>
      <h2 className="title">Add a Secondary Review</h2>
     <form className="fullSpotFormCreateSpot" onSubmit={handleSubmit}>
     <ul className="errors">
  {errors.map((error) => (
        <li className="oneError" key={`a${error}`}> {error}</li>))}
      </ul>
      <div className="formInputs">
      {/* <div className="oneFormInput">
     <label>
        Name
        <div className="formPadding">
        <input className="actualInput"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        </div>
     </label>
      </div> */}
     <div className="oneFormInput">
     <label>
        Description
        <div className="formPadding">
        <input className="actualInput"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        </div>
        </label>
        </div>
        <div className="oneFormInput">
        <label>
        Category
        <div className="formPadding">
        <input className="actualInput"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        </div>
        </label>
        </div>
        <div className="oneFormInput">
        <label>
        Image
        <div className="formPadding">
        <input className="actualInput"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        </div>
        </label>
        </div>
        {/* <div className="oneFormInput">
        <label>
        Address
        <div className="formPadding">
        <input className="actualInput"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        </div>
        </label>
        </div> */}
        <div className="oneFormInput">
        <label>
        Rating
        <div className="formPadding">
        <input className="actualInput"
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        </div>
        </label>
        </div>
    </div>
        <button className="spotSubmitButton" disabled={errors.length > 0} type='submit'>Submit</button>
      </form>
    </>
    )
}