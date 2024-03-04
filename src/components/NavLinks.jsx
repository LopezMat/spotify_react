import { NavLink } from "react-router-dom"
import { styleIcon } from "../constants/appConstant"


const NavLinks = ({ data, marginTop, handleClick }) => (
    <>
        <div className={marginTop}>
            {/* on vas mapper sur dataAlbumNav */}
            {data.map((item) => (
                <NavLink
                    key={item.title}
                    to={item.path}
                    end={true}
                    className="flex flex-row p-3 items-center justify-start font-medium text-sm text-white hover:bg-green_06"
                    onClick={() => handleClick && handleClick(false)}
                >
                    <item.icon style={styleIcon} className="mr-2" />
                    {item.title}
                </NavLink>
            ))}
        </div>
    </>
)

export default NavLinks