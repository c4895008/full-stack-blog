import { Image } from '@imagekit/react';

const ImageKit = ({ src, className, w, h, alt }) => {
    return <Image loading='lazy' transformation={[{width:w,height:h}]}  urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} src={src} className={className} alt={alt} width={w} height={h} />
}
export default ImageKit