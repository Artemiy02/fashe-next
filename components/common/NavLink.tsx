import { useRouter } from 'next/router';

const ActiveLink = ({ children, href }) => {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.pathname === href ? 'red' : 'black'
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
};

export default ActiveLink;
