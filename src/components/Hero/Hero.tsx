import car from './car_banner.jpg';
import './Hero.scss'

// @ts-ignore
const Hero = ({imageSrc}) => {
  return (
  <div className={'hero-container'}>
    <div className={'hero-container_content'}>
      <img className={'hero-container_image'} src={imageSrc} alt={''} />
      <h2>
        Tailored to your needs
      </h2>
      <p>
        Discover our new car insurance
      </p>
    </div>
  </div>
  )
}

export default Hero