import { FC, ReactNode, useState, useLayoutEffect, useRef } from 'react';

import { StyledTooltip, TooltipBox } from './styled';

interface TooltipProps {
  children: ReactNode;
  text: string;
  delay?: number;
}

const Tooltip: FC<TooltipProps> = (props: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const { text, children, delay = 500 } = props;
  let timeout: number;

  const setIsVisibleTrue = () => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => setIsVisible(true), delay);
  };

  const setIsVisibleFalse = () => {
    window.clearTimeout(timeout);
    setIsVisible(false);
  };

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const docWidth = document.documentElement.offsetWidth;
      const docHeight = document.documentElement.offsetHeight;
      const tooltipBounds = tooltipRef.current.getBoundingClientRect();
      if (docWidth - tooltipBounds.right < 10) {
        tooltipRef.current.style.left = `-${tooltipRef.current.offsetWidth}px`;
      }

      if (docHeight - tooltipBounds.bottom < 10) {
        tooltipRef.current.style.top = `-${tooltipRef.current.offsetHeight}px`;
      }
    }
  }, [tooltipRef, tooltipRef.current?.getBoundingClientRect()]);

  return (
    <StyledTooltip>
      <TooltipBox isVisible={isVisible} ref={tooltipRef}>
        <pre>{text} </pre>
      </TooltipBox>
      <div onMouseEnter={setIsVisibleTrue} onMouseLeave={setIsVisibleFalse} onClick={setIsVisibleFalse}>
        {children}
      </div>
    </StyledTooltip>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
