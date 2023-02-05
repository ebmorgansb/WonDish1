import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import TopReviews from '.'
import './index.css'
import { useLocation } from 'react-router-dom'

export default function TopReviewsPage () {

    const [ spinner, setSpinner ] = useState(true);
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
      setTimeout(() => setSpinner(false), 500)
    }, []);

return (
    <>
    {spinner ?
        <div class="center">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
        :
        <TopReviews/>
      }
      </>
    )



  }