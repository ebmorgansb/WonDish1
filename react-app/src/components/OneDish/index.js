import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import {useParams} from 'react-router-dom'
import { clearPrimaryAction, deletePrimaryReviewThunk, getOnePrimaryReviewThunk } from '../../store/primaryReview'
import { getAllSecondaryReviewsThunk } from '../../store/secondaryReview'
import EditDish from '../EditDish'
import Footer from '../Footer'
import { NavLink } from 'react-router-dom'
import EditSecondaryDish from '../EditSecondaryDish'
import { deleteSecondaryReviewThunk } from '../../store/secondaryReview'
import { Modal } from '../../context/modal'
import './index.css'
// import { clearPrimaryAction } from '../../store/primaryReview'
import gitLogo from '../../allImages/github-logo.png';
import inLogo from '../../allImages/in.png';
export default function OneDish () {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [ spinner, setSpinner ] = useState(true);
  const [secondaryDishId, setSecondaryDishId ] = useState();
  const [Description, setDescription] = useState();
  let {dishId} = useParams()
  const history = useHistory()
  dishId = parseInt(dishId)
  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user)
  const userId = user?.id
  console.log('what is user',user)

  const primaryDish = Object.values(useSelector(state => state.primaryReview))[0]
  const secondaryDishes = Object.values(useSelector(state => state.secondaryReview)).slice(0,6)



  useEffect(() => {
    setTimeout(() => setSpinner(false), 100)
  }, []);



  useEffect(() => {
    dispatch(getOnePrimaryReviewThunk(dishId))
    dispatch(getAllSecondaryReviewsThunk(dishId))

    return (() => dispatch(clearPrimaryAction()))
  }, [dispatch, dishId])

  if (!primaryDish) {
    return null
  }

  if (!secondaryDishes) {
    return null
  }

return (
  <>
  {!spinner &&
  <div className='totalOneDish'>
    <div className='primeDish'>
    <img
      className='primeImage'
      src={primaryDish?.image}
      alt="image description for screen readers"
      onError={e => { e.currentTarget.src ="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"; }}
    />

      <div className='primeInfoAndButtons'>
        <div className='primeInfo'>
          <h1 className='oneDishTitle'>The Winning Dish:</h1>
        <h2 className='oneDishTitle'>{primaryDish?.name.charAt(0).toUpperCase() + primaryDish.name.slice(1)}</h2>
        <div className='primeText'>Description: {primaryDish?.description}</div>
        <div className='primeText'>Address: {primaryDish?.address}</div>
        <div className='primeText'>Rating: {primaryDish?.rating}</div>
        </div>
        {user != null && userId == primaryDish?.user_id &&
      <button className='oneDishButton' onClick={() => setShowModal(true)}>Edit your Dish</button>
        }
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditDish setShowModal={setShowModal} />
        </Modal>
      )}
      {secondaryDishes.length == 0 && userId == primaryDish?.user_id &&
        <NavLink to={`/`}>
          <button className='oneDishButton' onClick={() => {
            dispatch(deletePrimaryReviewThunk(dishId))
          }
            }>Delete Review</button>
        </NavLink>
        }
      </div>
    </div>
    <div className='addReviewsAndTitle'>
                  {secondaryDishes.length == 0 ? <h2 className='pushFooter'>More reviews coming soon!</h2> :
      <h2 className='addReview'>Additional Reviews</h2>
                  }
      <div className='additionalReviews'>
      {secondaryDishes.map(secondaryDish =>
        <div className='secondaryDish'>
          <div className='secondDishDiv'>
          <img
      className='secondDishImg'
      src={secondaryDish.image}
      alt="image description for screen readers"
      onError={e => { e.currentTarget.src ="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"; }}
    />
      </div>
          <div>
            <div className='secondReviewText'>
              <div>Description:</div>
              <div>{secondaryDish.description}</div>
              <div>Address:</div>
              <div>{secondaryDish.address}</div>
              <div>Rating:</div>
              <div>{secondaryDish.rating}</div>
            </div>
            <div className='editAndDeleteSecond'>
              { userId == secondaryDish.user_id &&
              <button className='oneDishButton1' onClick={() => {
                setSecondaryDishId(secondaryDish.id)
                setDescription(secondaryDish.description)
                setShowModal2(true)
              }
              }
                >Edit your Dish</button>
              }
              {showModal2 && (
              <Modal onClose={() => setShowModal2(false)}>
                <EditSecondaryDish description={Description} secondaryDish={secondaryDish} secondaryDishId={secondaryDishId} setShowModal2={setShowModal2} />
              </Modal>
              )}
              {userId == secondaryDish.user_id &&
              <button className='oneDishButton1' onClick={() => {
                dispatch(deleteSecondaryReviewThunk(secondaryDish.id)) }}>Delete Review</button>
            }
              </div>
          </div>
        </div>
      )}
    </div>
    </div>
    <Footer/>
    </div>

    }
    </>

)


}