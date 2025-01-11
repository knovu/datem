import { Image, ImageProps } from '@chakra-ui/react';
import LogoPNG from '../../assets/logo.png';

export type LogoProps = Omit<ImageProps, 'src' | 'alt'>;

const Logo = (props: LogoProps) => {
    return <Image src={LogoPNG} alt={'Logo'} {...props} />;
};

export default Logo;
