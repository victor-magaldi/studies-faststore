import {
  Card as UICard,
  CardActions as UICardActions,
  CardContent as UICardContent,
  CardImage as UICardImage,
} from '@faststore/ui'
import { graphql, Link } from 'gatsby'
import React, { memo } from 'react'
import { Badge, DiscountBadge } from 'src/components/ui/Badge'
import { Image } from 'src/components/ui/Image'
import Price from 'src/components/ui/Price'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProductLink } from 'src/sdk/product/useProductLink'
import type { ReactNode } from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

type Variant = 'horizontal' | 'vertical'

interface Props {
  product: ProductSummary_ProductFragment
  index: number
  bordered?: boolean
  variant?: Variant
  aspectRatio?: number
  buyButton?: ReactNode
}

function ProductCard({
  product,
  index,
  variant = 'vertical',
  bordered = false,
  aspectRatio = 1,
  buyButton,
  ...otherProps
}: Props) {
  const {
    isVariantOf: { name },
    image: [img],
    offers: {
      lowPrice: spotPrice,
      offers: [{ listPrice, availability }],
    },
  } = product

  const linkProps = useProductLink({ product, selectedOffer: 0, index })
  const outOfStock = availability !== 'https://schema.org/InStock'

  return (
    <UICard
      className="product-card"
      data-card-variant={variant}
      data-card-bordered={bordered}
      data-card-out-of-stock={outOfStock}
      {...otherProps}
    >
      <UICardImage>
        <Image
          src={img.url}
          alt={img.alternateName}
          width={360}
          height={360 / aspectRatio}
          sizes="(max-width: 768px) 25vw, 30vw"
          loading="lazy"
        />
      </UICardImage>
      <UICardContent>
        <div className="product-card__heading">
          <h3 className="product-card__title / title-small">
            <Link {...linkProps} title={name}>
              {name}
            </Link>
          </h3>
          <div className="product-card__prices">
            <Price
              value={listPrice}
              formatter={useFormattedPrice}
              testId="list-price"
              data-value={listPrice}
              variant="listing"
              classes="text-body-small"
              SRText="Original price:"
            />
            <Price
              value={spotPrice}
              formatter={useFormattedPrice}
              testId="price"
              data-value={spotPrice}
              variant="spot"
              classes="text-body"
              SRText="Sale Price:"
            />
          </div>
        </div>

        {outOfStock ? (
          <Badge small variant="neutral">
            Out of stock
          </Badge>
        ) : (
          <DiscountBadge small listPrice={listPrice} spotPrice={spotPrice} />
        )}
      </UICardContent>
      {!!buyButton && <UICardActions>{buyButton}</UICardActions>}
    </UICard>
  )
}

export const fragment = graphql`
  fragment ProductSummary_product on StoreProduct {
    id: productID
    slug
    sku
    brand {
      brandName: name
    }
    name
    gtin

    isVariantOf {
      productGroupID
      name
    }

    image {
      url
      alternateName
    }

    brand {
      name
    }

    offers {
      lowPrice
      offers {
        availability
        price
        listPrice
        quantity
        seller {
          identifier
        }
      }
    }
  }
`

export default memo(ProductCard)
