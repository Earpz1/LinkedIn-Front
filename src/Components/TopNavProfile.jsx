import { Button, NavDropdown } from 'react-bootstrap'
import { HiHome, HiUserCircle } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchProfile } from '../redux/actions'

const TopNavProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [profileLoaded, setProfileLoaded] = useState(false)

  useEffect(() => {
    dispatch(fetchProfile())

    setTimeout(() => {
      setProfileLoaded(true)
    }, 1500)
  }, [])

  const currentUserData = useSelector((state) => state.user.currentUser)

  return (
    <>
      <div className="d-flex justify-content-center">
        <HiUserCircle size={20} />
      </div>
      <NavDropdown title="Me" id="basic-nav-dropdown">
        <div className="dropdown-item">
          <div className="d-flex flex-column firstnavitem">
            <div className="d-flex mb-2">
              {profileLoaded && (
                <div>
                  <img
                    src={currentUserData.image}
                    className="drop-down-avatar"
                  />
                </div>
              )}
              {profileLoaded && (
                <div>
                  <p className="m-0 mt-2">
                    {currentUserData.name} {currentUserData.surname}
                  </p>
                </div>
              )}
            </div>
            <Button
              className="rounded-pill"
              onClick={() => {
                navigate('/Profile')
              }}
            >
              View Profile
            </Button>
          </div>
        </div>
        <NavDropdown.Divider />
      </NavDropdown>
    </>
  )
}
export default TopNavProfile
