import React from 'react'
import UIHero, {
  HeroContent,
  HeroImage,
  HeroLink,
} from 'src/components/ui/Hero'
import Image from 'src/components/ui/Image/Image'
import { LinkButton } from 'src/components/ui/Button'
import Icon from 'src/components/ui/Icon'

import Section from '../Section'

type Variant = 'default' | 'small'

interface HeroProps {
  title: string
  subtitle: string
  variant?: Variant
  linkText?: string
  link?: string
  icon?: JSX.Element
  imageSrc: string
  imageAlt: string
}

const Hero = ({
  title,
  subtitle,
  variant = 'default',
  linkText,
  link,
  icon,
  imageAlt,
  imageSrc,
}: HeroProps) => {
  return (
    <Section>
      <UIHero data-hero-variant={variant}>
        <HeroContent aria-labelledby="hero-heading">
          <div className="hero-content-wrapper / grid-content">
            <div className="hero-content-info">
              <h1
                id="hero-heading"
                className={
                  variant === 'default' ? 'title-hero' : 'title-hero-small'
                }
              >
                {title}
              </h1>

              <p className="text-body-big">{subtitle}</p>
              {!!link && (
                <HeroLink>
                  <LinkButton to={link} inverse>
                    {linkText} <Icon name="ArrowRight" width={24} height={24} />
                  </LinkButton>
                </HeroLink>
              )}
            </div>
            {!!icon && <div className="hero-content-icon">{icon}</div>}
          </div>
        </HeroContent>
        <HeroImage>
          <Image
            preload
            loading="eager"
            src={imageSrc}
            alt={imageAlt}
            width={360}
            height={240}
            sizes="(max-width: 768px) 70vw, 50vw"
          />
        </HeroImage>
      </UIHero>
    </Section>
  )
}

export default Hero
