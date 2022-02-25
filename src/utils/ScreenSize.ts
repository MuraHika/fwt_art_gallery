import { useMediaQuery } from 'react-responsive';

function ResizeScreen() {

  const isDesktop = useMediaQuery({
    query: '(min-width: 768px)',
  });
  const isTabltet = useMediaQuery({ query: '(min-width: 321px) and (max-width: 767px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 320px)' });
  return { isDesktop: isDesktop, isTabltet: isTabltet, isMobile: isMobile };
}

export default ResizeScreen;