import Item from '../../components/intersection/Item';
import { useIntersectionObserver } from '../../hooks/intersection/useIntersectionObserver';
import { useState } from 'react';

function useInView() {
  const [isInView, setIsInView] = useState(null);

  const handleInView = (entries: any, observe: any) => {
    entries.forEach((entry: any) => {
      setIsInView(entry.isIntersecting);
    });
  };

  const targetRef = useIntersectionObserver(handleInView);

  return [targetRef, isInView];
}

export default function App() {
  const [colorToken, setColorToken] = useState('_100');
  const [isGreenBoxAround, setIsGreenBoxAround] = useState(false);
  const [blueBoxRef, isBlueBoxInView] = useInView();

  // Yellow
  const yellowBoxRef = useIntersectionObserver(handleYellowBoxIntersection, {
    threshold: [0, 0.5, 1]
  });

  function handleYellowBoxIntersection(entries: any, observer: any) {
    entries.forEach((entry: any) => {
      const ratio = entry.intersectionRatio;

      let token = '';
      if (ratio >= 0) {
        token = '_100';
      }

      if (ratio >= 0.5) {
        token = '_400';
      }

      if (ratio === 1) {
        token = '_700';
      }

      setColorToken(token);
    });
  }

  // Green
  const greenBoxRef = useIntersectionObserver(handleGreenBoxIntersection, {
    rootMargin: '0px 0px 100px 0px'
  });
  function handleGreenBoxIntersection(entries: any, observer: any) {
    entries.forEach((entry: any) => {
      setIsGreenBoxAround(entry.isIntersecting);
    });
  }

  // blue

  return (
    <div className='App'>
      <div
        style={{
          maxHeight: '350px',
          overflowY: 'scroll',
          border: '1px solid'
        }}>
        <Item props='salmon' />
        <Item props='salmon' />
        <Item props={`yellow${colorToken}`} ref={yellowBoxRef} />
        <Item props={`green_700`} ref={greenBoxRef} />
        <Item props={`blue_700`} ref={blueBoxRef} />
        <Item props='salmon' />
        <Item props='salmon' />
      </div>
      <p>{isGreenBoxAround ? 'InGreenArea' : 'OutGreen'}</p>
      <p>{isBlueBoxInView ? 'InBlueArea' : 'OutBlue'}</p>
    </div>
  );
}
