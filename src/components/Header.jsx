import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState } from 'react';

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { pathname } = useLocation();

  const inputRef = useRef(null);
  const inputAnimation = useAnimation();
  const navigate = useNavigate();

  const handleToggleSearch = () => {
    inputRef.current.focus();

    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen(prev => !prev);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSearchValue = e => {
    setSearchValue(e.target.value);
  };

  // TODO: 여기서 API 호출
  const handleSearchResultSubmit = e => {
    e.preventDefault();
    navigate(`/search?q=${searchValue}`);
  };

  return (
    <StyledNav>
      <NavItemContainer>
        <MainLogo onClick={handleLogoClick} viewBox="0 0 1024 276.742">
          <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </MainLogo>
        <NavMenuContainer>
          <NavMenu isMatch={pathname === '/movie/popular'}>
            <Link to="/movie/popular">Popular</Link>
          </NavMenu>
          <NavMenu isMatch={pathname === '/movie/upcoming'}>
            <Link to="/movie/upcoming">Upcoming</Link>
          </NavMenu>
          <NavMenu isMatch={pathname === '/movie/now_playing'}>
            <Link to="/movie/now_playing">Now Playing</Link>
          </NavMenu>
          <NavMenu isMatch={pathname === '/movie/top_rated'}>
            <Link to="/movie/top_rated">Top Rated</Link>
          </NavMenu>
        </NavMenuContainer>
      </NavItemContainer>
      <NavItemContainer>
        <SearchContainer>
          <motion.svg
            onClick={handleToggleSearch}
            animate={{ x: searchOpen ? -190 : 0 }}
            transition={{ type: 'linear' }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <SearchForm onSubmit={handleSearchResultSubmit}>
            <SearchInput
              ref={inputRef}
              onChange={handleSearchValue}
              value={searchValue}
              animate={inputAnimation}
              initial={{ scaleX: 0 }}
              transition={{ type: 'linear' }}
            ></SearchInput>
          </SearchForm>
        </SearchContainer>
      </NavItemContainer>
    </StyledNav>
  );
}

const StyledNav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  width: 1190px;
  font-size: 16px;
  padding: 20px 0px;
  color: white;
`;

const NavItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MainLogo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${props => props.theme.RED};
  cursor: pointer;
`;

const NavMenuContainer = styled.ul`
  display: flex;
  align-items: center;
`;

const NavMenu = styled.li`
  margin-right: 20px;
  padding-bottom: 2px;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: ${props => props.theme.BLACK};
  transition: border-bottom 0.2s ease-in-out;
  border-bottom: ${props => (props.isMatch ? '2px solid red' : 'transparent')};
`;

const SearchContainer = styled.span`
  color: black;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const SearchForm = styled.form``;

const SearchInput = styled(motion.input)`
  border: 2px solid ${props => props.theme.BLACK};
  border-radius: 5px;
  color: black;
  font-size: 16px;
  background-color: white;
  z-index: -1;
  padding: 5px 10px;
  padding-left: 30px;
  transform-origin: right;
  position: absolute;
  right: 0px;
  bottom: -3px;
`;

export default Header;
