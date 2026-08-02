import './Header.scss'

export default function ProfileMenu() {

    return (
        <div className="profile-container">
            <div className="profile-container__profileImg">
                <img src="images/profile.png" />
            </div>
            <div className='profile-container__arrow-down'>
                <img src="images/arrow-down.png" />
            </div>
        </div>
    )
}