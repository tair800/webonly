import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const StyledWrapper = styled.div`
  position: relative;
  width: 190px;
  height: 254px;
  transition: 200ms;
  margin: 0 auto;

  &:active {
    width: 180px;
    height: 245px;
  }
`;

const Canvas = styled.div`
  perspective: 800px;
  inset: 0;
  z-index: 200;
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "tr-1 tr-2 tr-3"
    "tr-4 tr-5 tr-6"
    "tr-7 tr-8 tr-9";
`;

const Tracker = styled.div`
  position: absolute;
  z-index: 200;
  width: 100%;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const Card = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  transition: 700ms;
  background: linear-gradient(45deg, #1a1a1a, #262626);
  border: 2px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  box-shadow:
    0 0 20px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(0, 0, 0, 0.2);

  &:hover {
    filter: brightness(1.1);
  }

  &:hover .card-glare {
    opacity: 1;
  }

  &:hover .corner-elements span {
    border-color: rgba(92, 103, 255, 0.8);
    box-shadow: 0 0 10px rgba(92, 103, 255, 0.5);
  }
`;

const CardContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Prompt = styled.p`
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 2px;
  transition: 300ms ease-in-out;
  position: absolute;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const Logo = styled.div`
  transition: 300ms ease-in-out;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.3));
  }
`;

const ProductCard3DSubtitle = styled.div`
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
  font-size: 12px;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.6);
  padding: 0 10px;
  line-height: 1.4;
  opacity: 1;
  transform: translateY(0);
`;

const Highlight = styled.span`
  color: #00a2ff;
  margin-left: 5px;
  background: linear-gradient(90deg, #5c67ff, #ad51ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

const GlowingElements = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const Glow = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle at center,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 255, 170, 0) 70%);
  filter: blur(15px);
  opacity: 0;
  transition: opacity 0.3s ease;

  &.glow-1 {
    top: -20px;
    left: -20px;
  }

  &.glow-2 {
    top: 50%;
    right: -30px;
    transform: translateY(-50%);
  }

  &.glow-3 {
    bottom: -20px;
    left: 30%;
  }
`;

const CardGlare = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(125deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.05) 45%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.05) 55%,
      rgba(255, 255, 255, 0) 100%);
  opacity: 0;
  transition: opacity 300ms;
`;

const CyberLines = styled.div`
  span {
    position: absolute;
    background: linear-gradient(90deg,
        transparent,
        rgba(92, 103, 255, 0.2),
        transparent);

    &:nth-child(1) {
      top: 20%;
      left: 0;
      width: 100%;
      height: 1px;
      transform: scaleX(0);
      transform-origin: left;
      animation: lineGrow 3s linear infinite;
    }

    &:nth-child(2) {
      top: 40%;
      right: 0;
      width: 100%;
      height: 1px;
      transform: scaleX(0);
      transform-origin: right;
      animation: lineGrow 3s linear infinite 1s;
    }

    &:nth-child(3) {
      top: 60%;
      left: 0;
      width: 100%;
      height: 1px;
      transform: scaleX(0);
      transform-origin: left;
      animation: lineGrow 3s linear infinite 2s;
    }

    &:nth-child(4) {
      top: 80%;
      right: 0;
      width: 100%;
      height: 1px;
      transform: scaleX(0);
      transform-origin: right;
      animation: lineGrow 3s linear infinite 1.5s;
    }
  }
`;

const CardParticles = styled.div`
  span {
    position: absolute;
    width: 3px;
    height: 3px;
    background: #ffffff;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;

    &:nth-child(1) {
      --x: 1;
      --y: -1;
      top: 40%;
      left: 20%;
    }

    &:nth-child(2) {
      --x: -1;
      --y: -1;
      top: 60%;
      right: 20%;
    }

    &:nth-child(3) {
      --x: 0.5;
      --y: 1;
      top: 20%;
      left: 40%;
    }

    &:nth-child(4) {
      --x: -0.5;
      --y: 1;
      top: 80%;
      right: 40%;
    }

    &:nth-child(5) {
      --x: 1;
      --y: 0.5;
      top: 30%;
      left: 60%;
    }

    &:nth-child(6) {
      --x: -1;
      --y: 0.5;
      top: 70%;
      right: 60%;
    }
  }
`;

const CornerElements = styled.div`
  span {
    position: absolute;
    width: 15px;
    height: 15px;
    border: 2px solid rgba(92, 103, 255, 0.3);
    transition: all 0.3s ease;

    &:nth-child(1) {
      top: 10px;
      left: 10px;
      border-right: 0;
      border-bottom: 0;
    }

    &:nth-child(2) {
      top: 10px;
      right: 10px;
      border-left: 0;
      border-bottom: 0;
    }

    &:nth-child(3) {
      bottom: 10px;
      left: 10px;
      border-right: 0;
      border-top: 0;
    }

    &:nth-child(4) {
      bottom: 10px;
      right: 10px;
      border-left: 0;
      border-top: 0;
    }
  }
`;

const ScanLine = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom,
      transparent,
      rgba(92, 103, 255, 0.1),
      transparent);
  transform: translateY(-100%);
  animation: scanMove 2s linear infinite;
`;

// Keyframes
const lineGrow = keyframes`
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  50% {
    transform: scaleX(1);
    opacity: 1;
  }
  100% {
    transform: scaleX(0);
    opacity: 0;
  }
`;

const scanMove = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`;

const particleFloat = keyframes`
  0% {
    transform: translate(0, 0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(calc(var(--x, 0) * 30px), calc(var(--y, 0) * 30px));
    opacity: 0;
  }
`;

// Tracker hover effects
const createTrackerStyles = (area, rotateX, rotateY) => styled(Tracker)`
  grid-area: ${area};
  
  &:hover ~ ${Card} {
    transition: 125ms ease-in-out;
    transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(0deg);
  }



  &:hover ~ ${Card} ${GlowingElements} div {
    opacity: 1;
  }

  &:hover ~ ${Card} ${CardParticles} span {
    animation: ${particleFloat} 2s infinite;
  }





  &:hover ~ ${Card}::before {
    opacity: 1;
  }
`;

const Tr1 = createTrackerStyles('tr-1', 20, -10);
const Tr2 = createTrackerStyles('tr-2', 20, 0);
const Tr3 = createTrackerStyles('tr-3', 20, 10);
const Tr4 = createTrackerStyles('tr-4', 0, -10);
const Tr5 = createTrackerStyles('tr-5', 0, 0);
const Tr6 = createTrackerStyles('tr-6', 0, 10);
const Tr7 = createTrackerStyles('tr-7', -20, -10);
const Tr8 = createTrackerStyles('tr-8', -20, 0);
const Tr9 = createTrackerStyles('tr-9', -20, 10);

const Noselect = styled.div`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const ProductCard3D = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <Noselect>
        <StyledWrapper
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Canvas>
            <Tr1 />
            <Tr2 />
            <Tr3 />
            <Tr4 />
            <Tr5 />
            <Tr6 />
            <Tr7 />
            <Tr8 />
            <Tr9 />
            <Card>
              <CardContent>
                <CardGlare className="card-glare" />
                <CyberLines className="cyber-lines">
                  <span /><span /><span /><span />
                </CyberLines>
                {/* Non-hover: Name in center, Hover: Logo in center */}
                {!isHovered ? (
                  <Prompt id="prompt">{product.name}</Prompt>
                ) : (
                  <Logo className="logo">
                    <img src={product.icon} alt={product.alt} />
                  </Logo>
                )}
                <GlowingElements className="glowing-elements">
                  <Glow className="glow-1" />
                  <Glow className="glow-2" />
                  <Glow className="glow-3" />
                </GlowingElements>
                {/* Non-hover: Subtext at bottom, Hover: Name at bottom */}
                <ProductCard3DSubtitle className="product-card-3d-subtitle">
                  <span>{isHovered ? product.name : product.subtext}</span>
                </ProductCard3DSubtitle>
                <CardParticles className="card-particles">
                  <span /><span /><span /> <span /><span /><span />
                </CardParticles>
                <CornerElements className="corner-elements">
                  <span /><span /><span /><span />
                </CornerElements>
                <ScanLine className="scan-line" />
              </CardContent>
            </Card>
          </Canvas>
        </StyledWrapper>
      </Noselect>
    </Link>
  );
};

export default ProductCard3D; 