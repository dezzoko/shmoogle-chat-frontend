import { FC, ReactNode, useState, useLayoutEffect, useRef } from 'react';

import { StyledTooltip, TooltipBox, TooltipText } from './styled';

interface TooltipProps {
  children: ReactNode;
  text: string;
  delay?: number;
}

const Tooltip: FC<TooltipProps> = (props: TooltipProps) => {
  const { text, children, delay = 500 } = props;

  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number>(0);

  const setIsVisibleTrue = () => {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setIsVisible(true), delay);
  };

  const setIsVisibleFalse = () => {
    window.clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const docWidth = window.innerWidth;
      const docHeight = window.innerHeight;
      const tooltipBounds = tooltipRef.current.getBoundingClientRect();
      if (docWidth - tooltipBounds.right < 0) {
        tooltipRef.current.style.left = `-${tooltipRef.current.offsetWidth}px`;
      }

      if (docHeight - tooltipBounds.bottom < 0) {
        tooltipRef.current.style.top = `-${tooltipRef.current.offsetHeight}px`;
      }
    }
  }, [tooltipRef, isVisible]);

  return (
    <StyledTooltip>
      <TooltipBox isVisible={isVisible} ref={tooltipRef}>
        <TooltipText>{text} </TooltipText>
      </TooltipBox>
      <div onMouseEnter={setIsVisibleTrue} onMouseLeave={setIsVisibleFalse} onClick={setIsVisibleFalse}>
        {children}
      </div>
    </StyledTooltip>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
